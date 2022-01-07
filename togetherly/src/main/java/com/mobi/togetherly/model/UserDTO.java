package com.mobi.togetherly.model;

import com.mobi.togetherly.model.Achievement;
import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.User;

import java.util.List;
import java.util.Set;

public class UserDTO {
    private String username;
    private String password;
    private Long id;
    private Set<Achievement> achievements;
    private List<Event> events;
    private List<Event> ownedEvents;

    public UserDTO(User u) {
        this.username = u.getUsername();
        this.password = u.getPassword();
        this.id = u.getId();
        this.achievements = u.getAchievements();
        this.events = u.getEvents();
        this.ownedEvents = u.getOwnedEvents();
    }

    public User fromDTO() {
        User u = new User();
        u.setId(id);
        u.setEvents(events);
        u.setOwnedEvents(ownedEvents);
        u.setPassword(password);
        u.setUsername(username);
        u.setAchievements(achievements);
        return u;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(Set<Achievement> achievements) {
        this.achievements = achievements;
    }

    public List<Event> getEvents() {
        return events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public List<Event> getOwnedEvents() {
        return ownedEvents;
    }

    public void setOwnedEvents(List<Event> ownedEvents) {
        this.ownedEvents = ownedEvents;
    }
}
