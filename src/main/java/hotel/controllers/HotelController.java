package hotel.controllers;

import hotel.dto.HotelDto;
import hotel.entities.Hotel;
import hotel.entities.HotelImage;
import hotel.mapper.HotelMapper;
import hotel.repositories.HotelImageRepository;
import hotel.repositories.HotelRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Tag(name = "Hotel")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/hotel")
public class HotelController {
    private final HotelRepository hotelRepository;
    private final HotelImageRepository hotelImageRepository;
    private final HotelMapper hotelMapper;

    @PostMapping("/add")
    public ResponseEntity<Hotel> add(@RequestBody HotelDto model) {
        Hotel hotel = hotelMapper.HotelDtoToHotel(model);
        hotelRepository.save(hotel);
        for (String name : model.getImages()) {
            List<HotelImage> images = hotelImageRepository.findByName(name);
            HotelImage image = images.get(0);
            image.setHotel(hotel);
            hotelImageRepository.save(image);
        }

        return ResponseEntity.ok(hotel);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Hotel>> getAll() {
        return ResponseEntity.ok(hotelRepository.findAll());
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Hotel> getById(@PathVariable int id) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if (hotel == null)
            throw new EntityNotFoundException(String.format("Hotel with id: %s not found", id));

        return ResponseEntity.ok(hotel);
    }
}
