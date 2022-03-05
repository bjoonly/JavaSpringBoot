package hotel.mapper;

import hotel.dto.HotelDto;
import hotel.dto.ShowHotelDto;
import hotel.entities.Hotel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface HotelMapper {
    @Mapping(target = "images", ignore = true)
    Hotel HotelDtoToHotel(HotelDto hotel);

    ShowHotelDto HotelToShowHotelDto(Hotel hotel);

    List<ShowHotelDto> ListHotelToListShowHotelDto(List<Hotel> hotel);
}
