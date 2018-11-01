package project.persistence.entities;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date startDate;
    private Date endDate;
    private Long ownerID;
    private String title;
    private String description;

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    @ManyToMany(
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL

    )
    @JoinTable(
            name = "shared",
            joinColumns = { @JoinColumn(name = "eventID")},
            inverseJoinColumns = { @JoinColumn(name = "userID")}
    )
    private List<User> users;


    public Event() {

    }

    public Event(Date startDate, Date endDate, Long ownerID, String title, String description) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.ownerID = ownerID;
        this.title = title;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Long getOwnerID() {
        return ownerID;
    }

    public void setOwnerID(Long ownerID) {
        this.ownerID = ownerID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
