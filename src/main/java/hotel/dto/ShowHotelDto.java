package hotel.dto;

import lombok.Data;

import java.util.List;

@Data
public class ShowHotelDto {
    private int id;
    private String name;
    private String description;
    private List<HotelImageDto> images;
}
