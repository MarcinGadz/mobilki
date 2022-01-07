package com.mobi.togetherly.service;

import com.mobi.togetherly.model.EventDTO;
import com.mobi.togetherly.dao.EventDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    private EventDao dao;
    private UserDao userDao;

    public UserDao getUserDao() {
        return userDao;
    }

    @Autowired
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public EventDao getDao() {
        return dao;
    }

    @Autowired
    public void setDao(EventDao dao) {
        this.dao = dao;
    }

    public Event addEvent(Event e) {
        if (e.getStartPoint() == null || e.getDescription() == null || e.getDescription().trim().equals("")) {
            throw new IllegalArgumentException("Passed wrong entity");
        }
        return dao.save(e);
    }

    public EventDTO getById(Long id) {
        Optional<Event> optEvt = dao.findById(id);
        Event e = optEvt.orElse(null);
        if (e == null) {
            return null;
        }
        return new EventDTO(e);
    }

    public List<EventDTO> getAll() {
        return dao.findAll().stream().map(EventDTO::new).collect(Collectors.toList());
    }

    public List<EventDTO> getByOwner(User owner) {
        return dao.findByOwner(owner).stream().map(EventDTO::new).collect(Collectors.toList());
    }

    public List<EventDTO> getByEnrolledUser(String user) {
        User u = userDao.findByUsername(user);
        if (u == null) {
            throw new NoSuchElementException("User with specified login does not exists");
        }
        List<Event> userEvents = u.getEvents();
        if (userEvents == null) {
            return new LinkedList<>();
        }
        return userEvents.stream().map(EventDTO::new).collect(Collectors.toList());
    }

    public List<EventDTO> getNearSpecifiedPoint(Point p) {
        //Argument is point which is in the center of searched area
        //Returned events starting points are within radius
        //of aprox. 500 meters from specified point
        double smaller_x = p.getX() - 0.01;
        double smaller_y = p.getY() - 0.01;
        double bigger_x = p.getX() + 0.01;
        double bigger_y = p.getY() + 0.01;
        Point p1 = new Point(smaller_x, smaller_y);
        Point p2 = new Point(bigger_x, bigger_y);
        return dao.findByStartPointBetween(p1, p2).stream().map(EventDTO::new).collect(Collectors.toList());
    }

    public List<Object> getStartPoints() {
        return dao.findStartPoints();
    }

    public List<Event> getByStartPoint(Point p) {
        return dao.getEventsByStartPoint(p);
    }

    public List<Object> getTitles() {
        return dao.findTitles();
    }

    public Event findByTitle(String title) {
        return dao.findEventByTitle(title);
    }
}
