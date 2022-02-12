package hotel.mapper;

import hotel.dto.CityDto;
import hotel.dto.ShowCityDto;
import hotel.entities.City;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CityMapper {
    City CityDtoToCity(CityDto cityDto);

    ShowCityDto CityToShowCityDto(City city);

    List<ShowCityDto> CityListToShowCityDto(List<City> cities);
}
