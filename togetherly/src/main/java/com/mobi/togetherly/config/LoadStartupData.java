package com.mobi.togetherly.config;

import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.*;
import com.mobi.togetherly.service.EventService;
import com.mobi.togetherly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@Transactional
public class LoadStartupData implements ApplicationRunner {
    @Autowired
    UserDao dao;
    @Autowired
    private UserService service;
    @Autowired
    private EventService eventService;

    private void addUsersToRepo() {
        User u = new User("marcin", "test");
        User u2 = new User("John", "test");
        u.addAchievement(Achievement.BEGINNER);
        u.addAchievement(Achievement.CREATOR);
        u2.addAchievement(Achievement.SOCIAL_STAR);
        u.setEmail("test@test.com");
        u2.setEmail("testmail@edu.com");
        u.setGravatarEmail("filiptheg@gmail.com");
        u2.setGravatarEmail("testgravatar@org.pl");
        u.setBirthDate(LocalDate.of(2000,9,22));
        u2.setBirthDate(LocalDate.of(2002,1,13));
        service.addUser(u);
        service.addUser(u2);
        Point p = new Point(51.7499026,19.4480431);
        Event e = new Event();
        e.setDate(LocalDateTime.parse("2022-04-16T00:00"));
        e.setStartPoint(p);
        e.setDescription("Amatorski bieg w okolicach Politechniki Łódzkiej");
        e.setTitle("Bieg dookoła Politechniki");
        u.registerNewEvent(e);

        Point p2 = new Point(51.7705938,19.4893868);
        Event e2 = new Event();
        e2.setDate(LocalDateTime.parse("2022-02-23T00:00"));
        e2.setStartPoint(p2);
        e2.setDescription("Kto najdłużej wytrzyma, wygra prestiżowy tytuł Mistrza");
        e2.setTitle("Zawody skakankowe");
        u.registerNewEvent(e2);

        Point p3 = new Point(51.7727959,19.4386219);
        Event e3 = new Event();
        e3.setDate(LocalDateTime.parse("2022-02-13T00:00"));
        e3.setStartPoint(p3);
        e3.setDescription("Przejażdżka rowerowa, planowana długość ok. 50km");
        e3.setTitle("Rowerem dookoła Łodzi");

        Point p4 = new Point(51.789872,19.465442);
        Event e4 = new Event();
        e4.setDate(LocalDateTime.parse("2022-02-23T00:00"));
        e4.setStartPoint(p4);
        e4.setDescription("Zawody flankowe");
        e4.setTitle("Flanki");

        Point p5 = new Point(51.8707398,19.4081212);
        Event e5 = new Event();
        e5.setDate(LocalDateTime.parse("2022-06-11T00:00"));
        e5.setStartPoint(p5);
        e5.setDescription("Kolejna edycja gry we flanki");
        e5.setTitle("Flanki - druga edycja");

        u.registerNewEvent(e3);
        u.registerNewEvent(e4);
        u.registerNewEvent(e5);

        eventService.addEvent(e);
        eventService.addEvent(e2);
        eventService.addEvent(e3);
        eventService.addEvent(e4);
        eventService.addEvent(e5);
    }

    public void enrollUsersToTestEvents() {
        List<EventDTO> dtos = eventService.getAll();
        if(!dtos.isEmpty()) {
            List<UserDTO> userDTOS = service.getAll();
            if(!dtos.isEmpty()) {
                Event event = dtos.get(0).fromDto();
                User u = userDTOS.get(0).fromDTO();
                User u2 = userDTOS.get(1).fromDTO();
                Event ev = dtos.get(1).fromDto();

                u.addEvent(event);
                u.addEvent(ev);
                u2.addEvent(event);
                event.addUser(u);
                event.addUser(u2);
                ev.addUser(u);
                System.out.println("aaaaa");
                dao.save(u);
                dao.save(u2);
                eventService.addEvent(event);
                eventService.addEvent(ev);
            }
        }

    }
    @Override
    public void run(ApplicationArguments args) {
        if (service.getAll().isEmpty()) {
            System.out.println("Adding...");
            addUsersToRepo();
            enrollUsersToTestEvents();
        } else {
            service.getAll().forEach(System.out::println);
            System.out.println("\n");
            eventService.getAll().forEach(System.out::println);
        }
    }
}
