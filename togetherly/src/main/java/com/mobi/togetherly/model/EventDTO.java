package com.mobi.togetherly.model;

import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.User;
import org.springframework.data.geo.Point;

import java.util.List;
import java.util.stream.Collectors;

public class EventDTO {
    private Long id;
    private List<User> enrolledUsers;
    private Point startPoint;
    private String description;
    private User owner;

    public EventDTO(Event e) {
        this.id = e.getId();
        this.enrolledUsers = e.getEnrolledUsers();
        this.startPoint = e.getStartPoint();
        this.description = e.getDescription();
        this.owner = e.getOwner();
    }

    public Event fromDto() {
        Event e = new Event();
        e.setOwner(owner);
        e.setDescription(description);
        e.setStartPoint(startPoint);
        e.setId(id);
        e.setEnrolledUsers(enrolledUsers);
        return e;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<String> getEnrolledUsers() {
        return enrolledUsers.stream().map(User::getUsername).collect(Collectors.toList());
    }

    public void setEnrolledUsers(List<User> enrolledUsers) {
        this.enrolledUsers = enrolledUsers;
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

    public String getOwner() {
        if(owner == null) return "";
        return owner.getUsername();
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
