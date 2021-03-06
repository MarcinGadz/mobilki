package com.mobi.togetherly.service;

import com.mobi.togetherly.config.TokenProvider;
import com.mobi.togetherly.dao.RoleDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.*;
import org.junit.Rule;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.security.Principal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
        when(userDao.save(u)).thenReturn(u);
        assertEquals(u, userService.addUser(u));
    }

    @Test
    public void getUser() {
        userService.setUserDao(userDao);
        User u = new User();
        u.setId(12L);
        u.setUsername("test");
        when(userDao.getById(12L)).thenReturn(u);
        assertEquals(u, userService.getUser(12L).fromDTO());
    }

    @Mock
    private AuthenticationManager manager;
    @Mock
    private Authentication auth;
    @Mock
    private TokenProvider provider;
    @Test
    public void authenticate() {
        String username = "test";
        String password = "test";
        User u = new User(username, password);

        userService.setManager(manager);
        userService.setTokenProvider(provider);
        doReturn(auth).when(manager).authenticate(new UsernamePasswordAuthenticationToken(username, password));
        doReturn("Test").when(provider).createToken(auth);
        assertEquals("Test", userService.authenticate(u));

        doThrow(new BadCredentialsException("")).when(manager).authenticate(new UsernamePasswordAuthenticationToken(username, password));
        assertThrows(RuntimeException.class, () -> userService.authenticate(u));

        doThrow(new DisabledException("")).when(manager).authenticate(new UsernamePasswordAuthenticationToken(username, password));
        assertThrows(RuntimeException.class, () -> userService.authenticate(u));
    }

    @Test
    public void enrollUnauthenticated() {
        Event e = new Event();
        Long eventId = 123L;
        userService.setUserDao(userDao);
        userService.setEventService(eventService);
        EventDTO tmp = new EventDTO(e);
        when(eventService.getById(eventId)).thenReturn(tmp);
        when(eventService.getById(0L)).thenReturn(null);
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
        Long otherId = 8L;
        Long anotherId = 9L;
        EventDTO other = new EventDTO(new Event(otherId));
        EventDTO another = new EventDTO(new Event(anotherId));
        when(eventService.getById(eventId)).thenReturn(tmp);
        when(eventService.getById(otherId)).thenReturn(other);
        when(eventService.getById(anotherId)).thenReturn(another);

        Authentication auth = Mockito.mock(Authentication.class);
        SecurityContext ctx = Mockito.mock(SecurityContext.class);

        String testName = "test";

        try (MockedStatic<SecurityContextHolder> utilities = Mockito.mockStatic(SecurityContextHolder.class)) {
            utilities.when(SecurityContextHolder::getContext).thenReturn(ctx);
            when(ctx.getAuthentication()).thenReturn(auth);
            User u = new User();
            u.setUsername(testName);
            u.setId(1L);
            when(auth.getPrincipal()).thenReturn(u);
            assertThrows(IllegalArgumentException.class, () -> userService.enroll(eventId));
            when(userService.loadUserByUsername(testName)).thenReturn(u);
            when(userDao.save(u)).thenReturn(u);
            assertEquals(e, userService.enroll(eventId));
            assertTrue(u.getAchievements().contains(Achievement.BEGINNER));

            Set<Achievement> testSet = new HashSet<>();
            testSet.add(Achievement.BEGINNER);
            u.setAchievements(testSet);
            u.addEvent(new Event(2L));
            u.addEvent(new Event(3L));
            u.addEvent(new Event(4L));
            u.addEvent(new Event(5L));
            u.addEvent(new Event(6L));
            assertEquals(other.fromDto(), userService.enroll(otherId));
            assertTrue(u.getAchievements().contains(Achievement.INTERMEDIATE));
            u.addEvent(new Event());
            u.addEvent(new Event());
            u.addEvent(new Event());
            u.addEvent(new Event());
            u.addEvent(new Event());
            assertEquals(another.fromDto(), userService.enroll(anotherId));
            assertTrue(u.getAchievements().contains(Achievement.INSANE_SPORTSMAN));
        }
    }

    @Test
    void registerEvent() {
        userService = spy(userService);
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
            when(ctx.getAuthentication()).thenReturn(auth);
            User u = new User();
            u.setUsername(testName);
            u.setId(1L);

            when(auth.getPrincipal()).thenReturn(u);
            assertThrows(IllegalArgumentException.class, () -> userService.registerEvent(e));

            doReturn(u).when(userService).getLoggedUser();
            Event tmp = userService.registerEvent(e);
            assertEquals(e, tmp);
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
    public void updateUser() {

        userService.setUserDao(userDao);
        userService = spy(userService);

        User user = new User();
        user.setGravatarEmail("abc@abc.com");
        user.setBirthDate(LocalDate.of(1999, 1, 1));
        user.setPassword("p@ssw0rd");

        doReturn(user).when(userService).getLoggedUser();
        User updated = new User();
        doReturn(updated).when(userDao).save(updated);
        String newMail = "test@mail.com";
        String newPassword = "strongpassword";
        String newUsername = "nonexistinguser";
        doReturn(null).when(userDao).findByUsername(newUsername);
        LocalDate date = LocalDate.of(2000, 9, 9);

        updated.setGravatarEmail(newMail);
        userService.updateUser(updated);
        assertEquals(newMail, user.getGravatarEmail());

        updated.setPassword(newPassword);
        userService.updateUser(updated);
        assertEquals(newPassword, user.getPassword());

        updated.setBirthDate(date);
        userService.updateUser(updated);
        assertEquals(date, user.getBirthDate());

        updated.setUsername(newUsername);
        userService.updateUser(updated);
        assertEquals(newUsername, updated.getUsername());
    }

    @Test
    void getLoggedUser() {
    }

    @Test
    void checkString() {

    }
}