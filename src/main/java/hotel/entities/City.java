package hotel.entities;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
//@Table(name = "tbl_city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 200, nullable = false)
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "region_id", nullable = false, insertable = false, updatable = false)
    private Region region;

    @Column(name = "region_id")
    private int regionId;
}
