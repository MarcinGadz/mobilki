package com.mobi.togetherly.service;

import com.mobi.togetherly.dao.RoleDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.Achievement;
import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.EventDTO;
import com.mobi.togetherly.model.User;
import org.junit.Rule;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.Principal;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Rule
    public MockitoRule rule = MockitoJUnit.rule();
    @Mock
    UserDao userDao;
    @Mock
    RoleDao roleDao;
    @Mock
    EventService eventService;
    UserService userService = new UserService();

    @Test
    public void addUser() {
        userService.setUserDao(userDao);
        userService.setEncoder(new BCryptPasswordEncoder());
        User u = new User();
        u.setUsername("test");
        Long id = 43L;
        u.setId(id);
        assertThrows(IllegalArgumentException.class, () -> userService.addUser(u));
        u.setPassword("test");
        u.setEmail("test@pp.pl");
        Mockito.when(userDao.save(u)).thenReturn(u);
        assertEquals(u, userService.addUser(u));
    }

    @Test
    void getUser() {
        userService.setUserDao(userDao);
        User u = new User();
        u.setId(12L);
        u.setUsername("test");
        Mockito.when(userDao.getById(12L)).thenReturn(u);
        assertEquals(u, userService.getUser(12L).fromDTO());
    }

    @Test
    void getAll() {
    }

    @Test
    void loadUserByUsername() {
    }

    @Test
    void findByUsername() {
    }

    @Test
    public void enrollUnauthenticated() {
        Event e = new Event();
        Long eventId = 123L;
        userService.setUserDao(userDao);
        userService.setEventService(eventService);
        EventDTO tmp = new EventDTO(e);
        Mockito.when(eventService.getById(eventId)).thenReturn(tmp);
        Mockito.when(eventService.getById(0L)).thenReturn(null);
        assertThrows(IllegalArgumentException.class, () -> userService.enroll(0L));
        assertThrows(IllegalStateException.class, () -> userService.enroll(eventId));
    }

    @Test
    public void enroll() {
        Event e = new Event();
        Long eventId = 123L;
        userService.setUserDao(userDao);
        userService.setEventService(eventService);
        EventDTO tmp = new EventDTO(e);
        Mockito.when(eventService.getById(eventId)).thenReturn(tmp);

        Authentication auth = Mockito.mock(Authentication.class);
        SecurityContext ctx = Mockito.mock(SecurityContext.class);

        String testName = "test";

        try (MockedStatic<SecurityContextHolder> utilities = Mockito.mockStatic(SecurityContextHolder.class)) {
            utilities.when(SecurityContextHolder::getContext).thenReturn(ctx);
            Mockito.when(ctx.getAuthentication()).thenReturn(auth);
            User u = new User();
            u.setUsername(testName);
            u.setId(1L);
            Mockito.when(auth.getPrincipal()).thenReturn(u);
            assertThrows(IllegalArgumentException.class, () -> userService.enroll(eventId));
            Mockito.when(userService.loadUserByUsername(testName)).thenReturn(u);
            Mockito.when(userDao.save(u)).thenReturn(u);
            assertEquals(e, userService.enroll(eventId));
            assertTrue(u.getAchievements().contains(Achievement.BEGINNER));

            Set<Achievement> testSet = new HashSet<>();
            testSet.add(Achievement.BEGINNER);
            u.setAchievements(testSet);
            u.addEvent(new Event());
            u.addEvent(new Event());
            u.addEvent(new Event());
            u.addEvent(new Event());
            u.addEvent(new Event());
            assertEquals(e, userService.enroll(eventId));
            assertTrue(u.getAchievements().contains(Achievement.INTERMEDIATE));
            u.addEvent(new Event());
            u.addEvent(new Event());
            u.addEvent(new Event());
            u.addEvent(new Event());
            u.addEvent(new Event());
            assertEquals(e, userService.enroll(eventId));
            assertTrue(u.getAchievements().contains(Achievement.INSANE_SPORTSMAN));
        }
    }

    @Test
    void registerEvent() {
        Event e = new Event();
        Long eventId = 123L;
        String testName = "test";
        userService.setUserDao(userDao);
        userService.setEventService(eventService);

        assertThrows(IllegalStateException.class, () -> userService.registerEvent(e));

        Authentication auth = Mockito.mock(Authentication.class);
        SecurityContext ctx = Mockito.mock(SecurityContext.class);
        try (MockedStatic<SecurityContextHolder> utilities = Mockito.mockStatic(SecurityContextHolder.class)) {
            utilities.when(SecurityContextHolder::getContext).thenReturn(ctx);
            Mockito.when(ctx.getAuthentication()).thenReturn(auth);
            User u = new User();
            u.setUsername(testName);
            u.setId(1L);

            Mockito.when(auth.getPrincipal()).thenReturn(u);
            assertThrows(IllegalArgumentException.class, () -> userService.registerEvent(e));

            Mockito.when(userService.loadUserByUsername(testName)).thenReturn(u);
            assertEquals(e, userService.registerEvent(e));
            assertTrue(u.getAchievements().contains(Achievement.CREATOR));
            u.registerNewEvent(new Event());
            u.registerNewEvent(new Event());
            u.registerNewEvent(new Event());
            u.registerNewEvent(new Event());
            u.registerNewEvent(new Event());
            assertEquals(e, userService.registerEvent(e));
            assertTrue(u.getAchievements().contains(Achievement.SOCIAL_STAR));
        }
    }

    @Test
    void getLoggedUser() {
    }

    @Test
    void checkString() {

    }
}