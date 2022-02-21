package hotel.controllers;

import hotel.dto.ImageDto;
import hotel.entities.HotelImage;
import hotel.repositories.HotelImageRepository;
import hotel.storage.StorageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;


@Tag(name = "Home")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/")
public class HomeController {
    private final StorageService storageService;
    private final HotelImageRepository hotelImageRepository;

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) throws Exception {

        Resource file = storageService.loadAsResource(filename);
        String urlFileName = URLEncoder.encode("image.jpg", StandardCharsets.UTF_8.toString());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\"" + urlFileName + "\"")
                .body(file);
    }

    @PostMapping("/upload")
    public String upload(@RequestBody ImageDto dto) {
        String fileName = storageService.save(dto.getBase64());
        HotelImage image = new HotelImage(fileName);
        hotelImageRepository.save(image);
        return fileName;
    }
}
