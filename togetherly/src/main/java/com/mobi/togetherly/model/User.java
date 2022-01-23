package com.mobi.togetherly.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.*;

@Entity
public class User implements UserDetails {

    @Column(unique = true)
    private String email;
    @Column
    private String gravatarEmail;
    @Column(unique = true)
    private String username;
    @Column
    private String password;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ElementCollection(fetch = FetchType.EAGER)
    private Set<Achievement> achievements;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Collection<Role> authorities;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_events",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "event_id", referencedColumnName = "id"))
    private List<Event> events;

    @OneToMany(mappedBy = "owner")
    private List<Event> ownedEvents;

    @Column
    private LocalDate birthDate;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User() {
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public List<Event> getOwnedEvents() {
        return ownedEvents;
    }

    public void setOwnedEvents(List<Event> ownedEvents) {
        this.ownedEvents = ownedEvents;
    }

    public Event registerNewEvent(Event e) {
        e.setOwner(this);
        if (ownedEvents == null) {
            ownedEvents = new LinkedList<>();
        }
        this.ownedEvents.add(e);
        return e;
    }

    public void addEvent(Event e) {
        if (events == null) {
            events = new ArrayList<>();
        }
        events.add(e);
    }

    public Set<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(Set<Achievement> achievements) {
        this.achievements = achievements;
    }

    public void addAchievement(Achievement a) {
        if (this.achievements == null) {
            this.achievements = new HashSet<>();
        }
        this.achievements.add(a);
    }

    public Collection<Role> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<Role> authorities) {
        this.authorities = authorities;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return false;
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

    public List<Event> getEvents() {
        return this.events;
    }

    public void setEvents(List<Event> events) {
        this.events = events;
    }

    public void unRegisterEvent(Event e) {
        ownedEvents.remove(e);
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

    public UserShortInfo getUserShortInfo() {
        return new UserShortInfo(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(username, user.username) && Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, id);
    }

    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", gravatarEmail='" + gravatarEmail + '\'' +
                ", username='" + username + '\'' +
                ", id=" + id +
                ", achievements=" + achievements +
                ", authorities=" + authorities +
                ", birthDate=" + birthDate +
                '}';
    }
}
