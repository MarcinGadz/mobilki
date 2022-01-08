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
        User u2 = new User("M", "t");
        u.setEmail("test@test.com");
        u2.setEmail("testmail@edu.com");
        service.addUser(u);
        service.addUser(u2);
        ArrayList<User> users = new ArrayList<>();
        users.add(u);
        users.add(u2);
        Point p = new Point(1.234, 2.345);
        Event e = new Event();
        e.setStartPoint(p);
        e.setDescription("Test event");
        e.setTitle("Test event title!");
        u.registerNewEvent(e);

        Point p2 = new Point(1.5555, 2.5555);
        Event e2 = new Event();
        e2.setStartPoint(p2);
        e2.setDescription("Test event 5555");
        e2.setTitle("Test event2");
        u.registerNewEvent(e2);


        eventService.addEvent(e);
        eventService.addEvent(e2);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (service.getAll().isEmpty()) {
            addUsersToRepo();
        }
        else {
            service.getAll().forEach(System.out::println);
            System.out.println("\n");
            eventService.getAll().forEach(System.out::println);
        }
    }
}
