package com.mobi.togetherly.service;

import com.mobi.togetherly.dao.RoleDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.Role;
import com.mobi.togetherly.model.User;
import org.junit.Rule;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

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
    void enroll() {
    }

    @Test
    void registerEvent() {
    }

    @Test
    void getLoggedUser() {
    }

    @Test
    void checkString() {

    }
}