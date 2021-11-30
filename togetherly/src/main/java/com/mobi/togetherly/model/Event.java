package com.mobi.togetherly.model;

import org.springframework.data.geo.Point;

import javax.persistence.*;
import java.util.List;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany(mappedBy = "events")
    private List<User> enrolledUsers;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Point> route;

    public Event(List<User> enrolledUsers, List<Point> route) {
        this.enrolledUsers = enrolledUsers;
        this.route = route;
    }

    public Event() {
    }

    public List<User> getEnrolledUsers() {
        return enrolledUsers;
    }

    public void setEnrolledUsers(List<User> enrolledUsers) {
        this.enrolledUsers = enrolledUsers;
    }

    public List<Point> getRoute() {
        return route;
    }

    public void setRoute(List<Point> route) {
        this.route = route;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return new org.apache.commons.lang3.builder.ToStringBuilder(this)
                .append("id", id)
                .append("route", route)
                .toString();
    }

    public void addUser(User u) {
        enrolledUsers.add(u);
    }
}
