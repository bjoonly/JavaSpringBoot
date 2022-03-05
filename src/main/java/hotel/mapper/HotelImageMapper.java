package hotel.mapper;

import hotel.dto.HotelImageDto;
import hotel.entities.HotelImage;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface HotelImageMapper {
    HotelImageDto HotelImageToHotelImageDto(HotelImage image);
}
