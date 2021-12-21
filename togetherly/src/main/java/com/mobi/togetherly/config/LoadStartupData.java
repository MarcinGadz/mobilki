package com.mobi.togetherly.config;

import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.User;
import com.mobi.togetherly.service.EventService;
import com.mobi.togetherly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class LoadStartupData implements ApplicationRunner {
    @Autowired
    private UserService service;
    @Autowired
    private EventService eventService;

    private void addUsersToRepo() {
        User u = new User("marcin", "test");
        service.addUser(u);
        ArrayList<User> users = new ArrayList<>();
        users.add(u);
        Point p = new Point(1.234, 2.345);
        Event e = new Event();
        e.setStartPoint(p);
        e.setDescription("Test event");
        u.registerNewEvent(e);
        eventService.addEvent(e);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (service.getAll().isEmpty()) {
            addUsersToRepo();
        } else {
            service.getAll().forEach(System.out::println);
            System.out.println("\n");
            eventService.getAll().forEach(System.out::println);
        }
    }
}
