package hotel.dto;

import lombok.Data;

@Data
public class ShowCityDto {
    private int id;
    private String name;
    private ShowRegionDto region;
}
