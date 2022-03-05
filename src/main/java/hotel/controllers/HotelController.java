package hotel.controllers;

import hotel.dto.EditHotelDto;
import hotel.dto.HotelDto;
import hotel.dto.ShowHotelDto;
import hotel.entities.Hotel;
import hotel.entities.HotelImage;
import hotel.mapper.HotelMapper;
import hotel.repositories.HotelImageRepository;
import hotel.repositories.HotelRepository;
import hotel.storage.StorageException;
import hotel.storage.StorageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Hotel")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/hotel")
public class HotelController {
    private final HotelRepository hotelRepository;
    private final HotelImageRepository hotelImageRepository;
    private final HotelMapper hotelMapper;
    private final StorageService storageService;

    @PostMapping("/add")
    public ResponseEntity<Hotel> add(@RequestBody HotelDto model) {
        Hotel hotel = hotelMapper.HotelDtoToHotel(model);
        hotelRepository.save(hotel);
        for (String name : model.getImages()) {
            List<HotelImage> images = hotelImageRepository.findByName(name);
            if (images.size() != 0) {
                HotelImage image = images.get(0);
                image.setHotel(hotel);
                hotelImageRepository.save(image);
            }
        }

        return ResponseEntity.ok(hotel);
    }

    @GetMapping("/get")
    public ResponseEntity<Page<ShowHotelDto>> get(int page) {
        Sort sort = Sort.by("Id");
        Pageable pageable = PageRequest.of(page, 10, sort);
        Page<Hotel> list = hotelRepository.findAll(pageable);
        return ResponseEntity.ok(list.map(hotelMapper::HotelToShowHotelDto));
    }

    @GetMapping("/get-by-id/{id}")
    @ResponseBody
    public ResponseEntity<?> getById(@PathVariable int id) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if (hotel == null)
            return ResponseEntity.badRequest().body(String.format("Hotel with id: %s not found", id));

        return ResponseEntity.ok(hotelMapper.HotelToShowHotelDto(hotel));
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> edit(@PathVariable int id, @RequestBody EditHotelDto model) {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if (hotel == null)
            return ResponseEntity.badRequest().body(String.format("Hotel with id: %s not found", id));

        hotel.setName(model.getName());
        hotel.setDescription(model.getDescription());
        hotelRepository.save(hotel);

        for (String name : model.getRemovedImages()) {
            List<HotelImage> images = hotelImageRepository.findByName(name);
            if (images.size() != 0) {
                HotelImage image = images.get(0);
                image.setHotel(null);
                storageService.delete(image.getName());
                hotelImageRepository.delete(image);
            }
        }

        for (String name : model.getImages()) {
            List<HotelImage> images = hotelImageRepository.findByName(name);
            if (images.size() != 0) {
                HotelImage image = images.get(0);
                image.setHotel(hotel);
                hotelImageRepository.save(image);
            }
        }


        return ResponseEntity.ok("Hotel edited successfully.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) throws StorageException {
        Hotel hotel = hotelRepository.findById(id).orElse(null);
        if (hotel == null)
            return ResponseEntity.badRequest().body(String.format("Hotel with id: %s not found", id));

        List<HotelImage> images = hotelImageRepository.findByHotelId(hotel.getId());
        hotelRepository.delete(hotel);

        for (HotelImage image : images) {
            storageService.delete(image.getName());
            hotelImageRepository.delete(image);
        }
        return ResponseEntity.ok("Hotel deleted successfully");
    }
}
