package hotel.entities;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
//@Entity
//@Table(name = "Users", schema = "dbo")
public class User {
    @Id
    @Column(name = "Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "AboutMe", columnDefinition = "nvarchar")
    private String aboutMe;

    @Column(name = "Age")
    private Integer age;

    @Column(name = "CreationDate", nullable = false, columnDefinition = "datetime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;

    @Column(name = "DisplayName", nullable = false, columnDefinition = "nvarchar")
    private String displayName;

    @Column(name = "DownVotes")
    private Integer downVotes;

    @Column(name = "UpVotes")
    private Integer upVotes;

    @Column(name = "EmailHash", columnDefinition = "nvarchar")
    private String emailHash;

    @Column(name = "LastAccessDate", nullable = false, columnDefinition = "datetime")
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastAccessDate;

    @Column(name = "Location", nullable = false, columnDefinition = "nvarchar")
    private String location;

    @Column(name = "Reputation")
    private Integer reputation;

    @Column(name = "Views")
    private Integer views;

    @Column(name = "WebsiteUrl", nullable = false, columnDefinition = "nvarchar")
    private String websiteUrl;

    @Column(name = "AccountId")
    private int accountId;

}
