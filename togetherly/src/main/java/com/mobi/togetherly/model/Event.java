package com.mobi.togetherly.model;

import org.springframework.data.geo.Point;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedList;
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

    @Transient
    private Float distance;

    public Event(List<User> enrolledUsers, List<Point> route) {
        this.enrolledUsers = enrolledUsers;
        this.route = route;
        this.distance = calcTotalLength();
    }

    public Event() {
        this.distance = calcTotalLength();
    }

    private float calcTotalLength() {
        // Return total length of route in meters
        float dist = 0;
        if (route == null || route.size() <= 1) {
            return 0;
        }
        for (int i = 1; i < route.size(); i++) {
            dist += distFrom(route.get(i - 1), route.get(i));
        }
        return dist;
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
                .append("route", route)
                .toString();
    }

    public void addUser(User u) {
        if(enrolledUsers == null) {
            this.enrolledUsers = new LinkedList<>();
        }
        enrolledUsers.add(u);
    }

    public Float getDistance() {
        return this.distance;
    }

    public void setDistance(Float f) {
        this.distance = f;
    }

    private float distFrom(Point p1, Point p2) {
        double earthRadius = 6371000; //meters
        double dLat = Math.toRadians(p2.getY() - p1.getY());
        double dLng = Math.toRadians(p2.getX() - p1.getX());
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(Math.toRadians(p1.getY())) * Math.cos(Math.toRadians(p2.getY())) *
                        Math.sin(dLng / 2) * Math.sin(dLng / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        float dist = (float) (earthRadius * c);
        return dist;
    }
}
