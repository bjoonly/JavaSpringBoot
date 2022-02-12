package hotel.controllers;

import hotel.entities.Badge;
import hotel.repositories.BadgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/badges/")
public class BadgeController {
    private final BadgeRepository badgeRepository;

    @GetMapping("/{id}")
    public Badge getById(@PathVariable("id") int id) {
        return badgeRepository.findById(id).get();
    }
}
