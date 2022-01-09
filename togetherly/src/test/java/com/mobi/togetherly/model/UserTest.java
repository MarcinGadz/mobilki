package com.mobi.togetherly.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

class UserTest {

    @Test
    void addEvent() {
        User u = new User();
        Event e = new Event();
        e.setId(20L);
        u.addEvent(e);
        Event tmp = u.getEvents().get(0);
        Assertions.assertEquals(tmp, e);
    }

    @Test
    void getAchievements() {
        User u = new User();
        u.addAchievement(Achievement.BEGINNER);
        u.addAchievement(Achievement.INTERMEDIATE);
        Set<Achievement> achvs = new HashSet<>();
        achvs.add(Achievement.BEGINNER);
        achvs.add(Achievement.INTERMEDIATE);
        assertEquals(achvs, u.getAchievements());
    }

    @Test
    void setAchievements() {
        Set<Achievement> achvs = new HashSet<>();
        achvs.add(Achievement.BEGINNER);
        achvs.add(Achievement.INTERMEDIATE);
        User u = new User();
        u.setAchievements(Set.copyOf(achvs));
        assertEquals(u.getAchievements(), achvs);
    }

    @Test
    void getAuthorities() {
    }

    @Test
    void setAuthorities() {
    }

    @Test
    void getSetUsername() {
        User u = new User();
        u.setUsername("test");
        assertEquals("test", u.getUsername());
    }

    @Test
    void isAccountNonExpired() {
        User u = new User();
        assertTrue(u.isAccountNonExpired());
    }

    @Test
    void isAccountNonLocked() {
        User u = new User();
        assertTrue(u.isAccountNonLocked());
    }

    @Test
    void isCredentialsNonExpired() {
        User u = new User();
        assertTrue(u.isCredentialsNonExpired());
    }

    @Test
    void isEnabled() {
    }

    @Test
    void getSetPassword() {
        User u = new User();
        u.setPassword("test");
        assertEquals("test", u.getPassword());
    }

    @Test
    void getSetId() {
        User u = new User();
        u.setId(123L);
        assertEquals(123L, u.getId());
    }

    @Test
    void getEvents() {
        User u = new User();
        Event e1 = new Event();
        e1.setId(1234L);
        Event e2 = new Event();
        e2.setId(111L);
        u.addEvent(e1);
        u.addEvent(e2);
        assertEquals(2, u.getEvents().size());
    }

    @Test
    void getOwnedEvents() {
        User u = new User();
        u.registerNewEvent(new Event());
        assertEquals(1, u.getOwnedEvents().size());
    }

    @Test
    void setOwnedEvents() {
        List<Event> owned = new LinkedList<>();
        owned.add(new Event());
        owned.add(new Event());
        User u = new User();
        u.setOwnedEvents(owned);
        assertEquals(owned, u.getOwnedEvents());
    }

    @Test
    void registerNewEvent() {
        User u = new User();
        Event test = new Event();
        u.registerNewEvent(test);
        assertEquals(test, u.getOwnedEvents().get(0));
    }

    @Test
    void testAddEvent() {
        User u = new User();
        Event test = new Event();
        u.addEvent(test);
        assertEquals(test, u.getEvents().get(0));
    }

    @Test
    void testGetSetAchievements() {
        User u = new User();
        Achievement t1 = Achievement.BEGINNER;
        Achievement t2 = Achievement.INTERMEDIATE;
        Set<Achievement> testList = new HashSet<>();
        testList.add(t1);
        testList.add(t2);
        u.setAchievements(testList);
        assertEquals(2, u.getAchievements().size());
    }

    @Test
    void addGetAchievement() {
        User u = new User();
        Achievement t1 = Achievement.BEGINNER;
        u.addAchievement(t1);
        assertTrue(u.getAchievements().contains(t1));
    }

    @Test
    void unRegisterEvent() {
        User u = new User();
        Event e = new Event();
        e.setId(1L);
        u.registerNewEvent(e);
        assertEquals(1, u.getOwnedEvents().size());
        u.unRegisterEvent(e);
        assertEquals(0, u.getOwnedEvents().size());
    }

}