package hotel.controllers;

import hotel.dto.CityDto;
import hotel.dto.ShowCityDto;
import hotel.entities.City;
import hotel.mapper.CityMapper;
import hotel.repositories.CityRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Tag(name = "City")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "api/city")
public class CityController {
    private final CityRepository cityRepository;
    private final CityMapper cityMapper;

    @GetMapping("/get-all")
    public List<ShowCityDto> getAll() {
        return cityMapper.CityListToShowCityDto(cityRepository.findAll());
    }

    @GetMapping("/get-by-id/{id}")
    public ShowCityDto getById(@PathVariable int id) {
        City city = cityRepository.findById(id).orElse(null);
        if (city == null)
            throw new EntityNotFoundException(String.format("City with id: %s not found", id));
        return cityMapper.CityToShowCityDto(city);
    }

    @PostMapping("/add")
    public City add(@RequestBody CityDto model) {
        City city = cityMapper.CityDtoToCity(model);
        cityRepository.save(city);
        return city;
    }

    @PutMapping("/edit/{id}")
    public String edit(@PathVariable int id, @RequestBody CityDto model) {
        City city = cityRepository.findById(id).orElse(null);
        if (city == null)
            throw new EntityNotFoundException(String.format("City with id: %s not found", id));

        city.setName(model.getName());
        city.setRegionId(model.getRegionId());
        cityRepository.save(city);
        return "City edited successfully.";
    }

    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {
        Optional<City> city = cityRepository.findById(id);
        if (!city.isPresent())
            throw new EntityNotFoundException(String.format("City with id: %s not found", id));

        cityRepository.delete(city.get());
        return "City deleted successfully";
    }

}
