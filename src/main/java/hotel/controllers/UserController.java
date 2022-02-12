package hotel.controllers;

import hotel.entities.User;
import hotel.repositories.UserRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = {"http://localhost:3000"})
@Tag(name = "Users")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/")
public class UserController {
    private final UserRepository userRepository;

    @GetMapping("/get")
    public Page<User> get(int page, int count) {
        Sort sort = Sort.by("Id");

        Pageable pageable = PageRequest.of(page, count, sort);
        Page<User> list = userRepository.findAll(pageable);

        return list;
    }
}
