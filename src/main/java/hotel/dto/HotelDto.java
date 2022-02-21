package hotel.dto;

import lombok.Data;

import java.util.List;

@Data
public class HotelDto {
    private String name;
    private String description;
    private List<String> images;
}
