package hotel.mapper;

import hotel.dto.RegionDto;
import hotel.dto.ShowRegionDto;
import hotel.entities.Region;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface RegionMapper {
    Region RegionDtoToRegion(RegionDto regionDto);

    ShowRegionDto RegionToShowRegionDto(Region region);

    List<ShowRegionDto> RegionListToShowRegionDto(List<Region> regions);
}
