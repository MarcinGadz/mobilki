package com.mobi.togetherly.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    @ManyToMany(mappedBy = "events")
    private List<User> enrolledUsers;

    public void addUser(User u) {
        enrolledUsers.add(u);
    }
}
