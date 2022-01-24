package com.mobi.togetherly.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public class UserDTO {

    private String username;
    private String password;
    private Long id;
    private Set<Achievement> achievements;
    private List<Event> events;
    private List<Event> ownedEvents;
    private String email;
    private String gravatarEmail;
    private LocalDate birthDate;

    public UserDTO(User u) {
        this.username = u.getUsername();
        this.password = u.getPassword();
        this.id = u.getId();
        this.achievements = u.getAchievements();
        this.events = u.getEvents();
        this.ownedEvents = u.getOwnedEvents();
        this.email = u.getEmail();
        this.gravatarEmail = u.getGravatarEmail();
        this.birthDate = u.getBirthDate();
    }
    public UserDTO() {}

    public User fromDTO() {
        User u = new User();
        u.setId(id);
        u.setEvents(events);
        u.setOwnedEvents(ownedEvents);
        u.setPassword(password);
        u.setUsername(username);
        u.setAchievements(achievements);
        u.setEmail(email);
        u.setGravatarEmail(gravatarEmail);
        u.setBirthDate(birthDate);
        return u;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGravatarEmail() {
        return gravatarEmail;
    }

    public void setGravatarEmail(String gravatarEmail) {
        this.gravatarEmail = gravatarEmail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
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

    @Override
    public String toString() {
        return "UserDTO{" +
                "username='" + username + '\'' +
                ", id=" + id +
                ", achievements=" + achievements +
                ", email='" + email + '\'' +
                ", gravatarEmail='" + gravatarEmail + '\'' +
                ", birthDate=" + birthDate +
                '}';
    }
}
