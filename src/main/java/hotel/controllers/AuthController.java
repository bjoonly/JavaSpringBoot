package hotel.controllers;

import hotel.configuration.security.JwtTokenUtil;
import hotel.configuration.security.captcha.CaptchaSettings;
import hotel.configuration.security.captcha.GoogleResponse;
import hotel.constants.Roles;
import hotel.dto.auth.LoginDto;
import hotel.dto.auth.RegisterDto;
import hotel.dto.auth.UserView;
import hotel.entities.UserEntity;
import hotel.mapper.UserMapper;
import hotel.repositories.RoleRepository;
import hotel.repositories.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestOperations;

import javax.validation.Valid;
import java.util.Arrays;

@Tag(name = "Auth")
@RestController
@RequestMapping(path = "api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserMapper userMapper;

    //@Value("${recaptcha.secretkey}")
    // private String recaptchaSecretKey;
    protected static final String RECAPTCHA_URL_TEMPLATE = "https://www.google.com/recaptcha/api/siteverify?secret=%s&response=%s";
    private final CaptchaSettings captchaSettings;

    @Autowired
    private final RestOperations restTemplate;

    @PostMapping("/login")
    public ResponseEntity<UserView> login(@RequestBody @Valid LoginDto dto) {
        try {
            UserView userView = loginUser(dto.getEmail(), dto.getPassword());
            return ResponseEntity.ok()
                    .body(userView);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDto dto) {
        try {
            String url = String.format(RECAPTCHA_URL_TEMPLATE, captchaSettings.getSecretkey(), dto.getReCaptchaToken());
            final GoogleResponse googleResponse = restTemplate.getForObject(url, GoogleResponse.class);
            if (googleResponse != null && !googleResponse.isSuccess()) {
                throw new Exception("ReCaptcha was not successfully validated.");
            }

            UserEntity userExist = userRepository.findByUsername(dto.getEmail());
            if (userExist != null)
                return ResponseEntity.badRequest().body("User with this email already exists.");

            PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            UserEntity dbUser = new UserEntity();
            dbUser.setUsername(dto.getEmail());
            dbUser.setFullName(dto.getFullName());
            dbUser.setPassword(encoder.encode(dto.getPassword()));
            dbUser.setRoles(Arrays.asList(
                    roleRepository.findByName(Roles.User)
            ));
            this.userRepository.save((dbUser));
            UserView userView = loginUser(dto.getEmail(), dto.getPassword());

            return ResponseEntity.ok()
                    .body(userView);

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (RestClientException ex) {
            return ResponseEntity.badRequest().body("Registration unavailable at this time.  Please try again later.\n" + ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    private UserView loginUser(String email, String password) throws BadCredentialsException {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(
                        email,
                        password));

        User user = (User) authentication.getPrincipal();
        UserEntity userEntity = userRepository.findByUsername(user.getUsername());
        UserView userView = userMapper.UserEntityToUserView(userEntity);

        userView.setToken(jwtTokenUtil.generateAccessToken(userEntity));

        return userView;
    }
}
