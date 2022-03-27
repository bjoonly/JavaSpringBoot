package hotel.configuration.security.captcha;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@Data
@ConfigurationProperties(prefix = "recaptcha")
public class CaptchaSettings {
    private String sitekey;
    private String secretkey;
}
