package com.mobi.togetherly.model;

import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.User;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.data.geo.Point;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class EventDTO {
    private Long id;
    private List<User> enrolledUsers;
    private Point startPoint;
    private String description;
    private User owner;
    private LocalDate date;
    private String title;

    public EventDTO(Event e) {
        this.id = e.getId();
        this.enrolledUsers = e.getEnrolledUsers();
        this.startPoint = e.getStartPoint();
        this.description = e.getDescription();
        this.owner = e.getOwner();
        this.date = e.getDate();
        this.title = e.getTitle();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("id", id)
                .append("startPoint", startPoint)
                .append("description", description)
                .append("owner", owner)
                .append("date", date)
                .append("title", title)
                .toString();
    }

    public Event fromDto() {
        Event e = new Event();
        e.setOwner(owner);
        e.setDescription(description);
        e.setStartPoint(startPoint);
        e.setId(id);
        e.setEnrolledUsers(enrolledUsers);
        e.setDate(date);
        e.setTitle(title);
        return e;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<UserShortInfo> getEnrolledUsers() {
        List<UserShortInfo> enrolled = enrolledUsers.stream().map(User::getUserShortInfo).collect(Collectors.toList());
        System.out.println(enrolled);
        return enrolled;
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

    public UserShortInfo getOwnerShortInfo() {
        return owner.getUserShortInfo();
    }
}
