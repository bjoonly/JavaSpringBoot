package hotel.dto;

import lombok.Data;

import java.util.List;

@Data
public class EditHotelDto {
    private String name;
    private String description;
    private List<String> removedImages;
    private List<String> images;
}
