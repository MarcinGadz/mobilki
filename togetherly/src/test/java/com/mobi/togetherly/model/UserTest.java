package com.mobi.togetherly.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

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
    void getTotalDistanceEvents() {
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
}