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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
        u.setGravatarEmail("testgravatar@av.pl");
        u2.setGravatarEmail("testgravatar@org.pl");
        service.addUser(u);
        service.addUser(u2);
        ArrayList<User> users = new ArrayList<>();
        users.add(u);
        users.add(u2);
        Point p = new Point(1.234, 2.345);
        Event e = new Event();
        e.setDate(LocalDateTime.parse("2022-04-16"));
        e.setStartPoint(p);
        e.setDescription("Test event");
        e.setTitle("Test event title!");
        u.registerNewEvent(e);

        Point p2 = new Point(1.5555, 2.5555);
        Event e2 = new Event();
        e2.setDate(LocalDateTime.parse("2022-02-23"));
        e2.setStartPoint(p2);
        e2.setDescription("Test event 5555");
        e2.setTitle("Test event2");
        u.registerNewEvent(e2);

        Point p3 = new Point(1.5555, 2.5555);
        Event e3 = new Event();
        e3.setDate(LocalDateTime.parse("2022-02-13"));
        e3.setStartPoint(p3);
        e3.setDescription("Test event 5124");
        e3.setTitle("Test event23333");

        Point p4 = new Point(1.6123, 2.2345);
        Event e4 = new Event();
        e4.setDate(LocalDateTime.parse("2022-02-23"));
        e4.setStartPoint(p4);
        e4.setDescription("Test asfdasf 5555");
        e4.setTitle("asaaa event2");

        Point p5 = new Point(1.1123, 2.1145);
        Event e5 = new Event();
        e5.setDate(LocalDateTime.parse("2022-06-11"));
        e5.setStartPoint(p5);
        e5.setDescription("Test asfdasf 23");
        e5.setTitle("asaaa event5");

        u.registerNewEvent(e3);
        u.registerNewEvent(e4);
        u.registerNewEvent(e5);

        eventService.addEvent(e);
        eventService.addEvent(e2);
        eventService.addEvent(e3);
        eventService.addEvent(e4);
        eventService.addEvent(e5);
    }

    @Override
    public void run(ApplicationArguments args) {
        List<User> all = service.getAll();
        if (service.getAll().isEmpty()) {
            System.out.println("Adding...");
            addUsersToRepo();
        } else if (all.stream().anyMatch(x -> x.getGravatarEmail() == null)) {
            all.forEach(service::remove);
            addUsersToRepo();
        } else {
            service.getAll().forEach(System.out::println);
            System.out.println("\n");
            eventService.getAll().forEach(System.out::println);
        }
    }
}
