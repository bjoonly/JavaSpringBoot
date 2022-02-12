package hotel.controllers;

import hotel.dto.RegionDto;
import hotel.dto.ShowRegionDto;
import hotel.entities.Region;
import hotel.mapper.RegionMapper;
import hotel.repositories.RegionRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Tag(name = "Region")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/region")
public class RegionController {
    private final RegionRepository regionRepository;
    private final RegionMapper regionMapper;


    @GetMapping("/get-all")
    public List<ShowRegionDto> getAll() {
        return regionMapper.RegionListToShowRegionDto(regionRepository.findAll());
    }

    @GetMapping("/get-by-id/{id}")
    public ShowRegionDto getById(@PathVariable int id) {
        Region region = regionRepository.findById(id).orElse(null);
        if (region == null)
            throw new EntityNotFoundException(String.format("Region with id: %s not found", id));

        return regionMapper.RegionToShowRegionDto(region);
    }

    @PostMapping("/add")
    public Region add(@RequestBody RegionDto model) {
        Region region = regionMapper.RegionDtoToRegion(model);
        regionRepository.save(region);
        return region;
    }

    @PutMapping("/edit/{id}")
    public String edit(@PathVariable int id, @RequestBody RegionDto model) {
        Region region = regionRepository.findById(id).orElse(null);
        if (region == null)
            throw new EntityNotFoundException(String.format("Region with id: %s not found", id));

        region.setName(model.getName());
        regionRepository.save(region);
        return "Region edited successfully.";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        Optional<Region> region = regionRepository.findById(id);
        if (!region.isPresent())
            throw new EntityNotFoundException(String.format("Region with id: %s not found", id));

        regionRepository.delete(region.get());
        return "Region deleted successfully";
    }
}
