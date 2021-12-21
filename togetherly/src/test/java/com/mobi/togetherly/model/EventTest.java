package com.mobi.togetherly.model;

import org.junit.jupiter.api.Test;
import org.springframework.data.geo.Point;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class EventTest {

    @Test
    void getEnrolledUsersAddUser() {
        Event e = new Event();
        User u = new User();
        e.addUser(u);
        assertEquals(1, e.getEnrolledUsers().size());
    }

    @Test
    void setEnrolledUsers() {
        List<User> users = new LinkedList<>();
        User u = new User();
        u.setId(1L);
        users.add(u);
        users.add(new User());
        Event e = new Event();
        e.setEnrolledUsers(List.copyOf(users));
        assertEquals(e.getEnrolledUsers(), users);
    }

    @Test
    void getSetRoute() {
        Event e = new Event();
        List<Point> points = new ArrayList<>();
        points.add(new Point(1, 2));
        points.add(new Point(3, 4));
        e.setRoute(List.copyOf(points));
        assertEquals(e.getRoute(), points);
    }

    @Test
    void getSetId() {
        Event e = new Event();
        e.setId(11L);
        assertEquals(11L, e.getId());
    }

    @Test
    void testToString() {
        Event e = new Event();
        e.setId(1111L);
        assertNotNull(e.toString());
    }

    @Test
    void getDistance() {
        //TODO
    }
}