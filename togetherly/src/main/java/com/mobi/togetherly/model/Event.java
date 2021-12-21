package com.mobi.togetherly.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.data.geo.Point;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "events", fetch = FetchType.EAGER)
    @JsonIgnore
    private List<User> enrolledUsers;

    @Column
    private Point startPoint;

    @Column
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnore
    private User owner;

//    public Event(List<User> enrolledUsers, Point startPoint) {
//        this.enrolledUsers = enrolledUsers;
//        this.startPoint = startPoint;
//    }

    public Event() {

    }



    public Point getStartPoint() {
        return startPoint;
    }

    public void setStartPoint(Point startPoint) {
        this.startPoint = startPoint;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }

    public List<User> getEnrolledUsers() {
        return enrolledUsers;
    }

    public void setEnrolledUsers(List<User> enrolledUsers) {
        this.enrolledUsers = enrolledUsers;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return new org.apache.commons.lang3.builder.ToStringBuilder(this)
                .append("id", id)
                .append("startPoint", startPoint)
                .append("description", description)
                .append("owner", owner)
                .toString();
    }

    public void addUser(User u) {
        if(enrolledUsers == null) {
            this.enrolledUsers = new LinkedList<>();
        }
        enrolledUsers.add(u);
    }
}
