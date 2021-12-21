package com.mobi.togetherly.service;

import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class InitDataConfig {
    private final UserService userService;
    private final EventService eventService;

    @Autowired
    public InitDataConfig(UserService userService, EventService eventService) {
        this.userService = userService;
        this.eventService = eventService;
    }

    private void addData() {
        if(userService.getAll().isEmpty()) {
            User u = new User();
            u.setUsername("Testowy");
            u.setPassword("test");
            userService.addUser(u);
        }
    }
}
