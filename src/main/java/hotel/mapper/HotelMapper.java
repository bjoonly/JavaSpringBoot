package hotel.mapper;

import hotel.dto.HotelDto;
import hotel.entities.Hotel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface HotelMapper {
    @Mapping(target = "images", ignore = true)
    Hotel HotelDtoToHotel(HotelDto hotel);
}
