package com.mobi.togetherly.service;

import com.mobi.togetherly.dao.RoleDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.Achievement;
import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.Role;
import com.mobi.togetherly.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserService {
    private final UserDao userDao;
    private final RoleDao roleDao;
    private final EventService eventService;
    private final Role customerRole;
    private PasswordEncoder encoder;

    @Autowired
    public UserService(UserDao userDao, RoleDao roleDao, EventService eventService) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.eventService = eventService;
        Role customerRoleTemp = roleDao.findByAuthority("ROLE_CUSTOMER");
        if (customerRoleTemp == null) {
            customerRoleTemp = new Role("ROLE_CUSTOMER");
            roleDao.save(customerRoleTemp);
        }
        this.customerRole = customerRoleTemp;
    }

    public PasswordEncoder getEncoder() {
        return encoder;
    }

    @Autowired
    public void setEncoder(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    private boolean checkString(String s) {
        return s == null || s.equals("") || s.trim().equals("");
    }

    public User addUser(User u) {
        if (checkString(u.getUsername()) && checkString(u.getPassword())) {
            u.setPassword(encoder.encode(u.getPassword()));
            Collection<Role> userRoles = u.getAuthorities();
            if (userRoles == null) {
                userRoles = new ArrayList<>();
            }
            userRoles.add(customerRole);
            return userDao.save(u);
        } else {
            throw new IllegalArgumentException("Passed wrong entity");
        }
    }

    public User getUser(Long id) {
        return userDao.getById(id);
    }

    public List<User> getAll() {
        return userDao.findAll();
    }

    public User loadUserByUsername(String userName) {
        return userDao.findByUsername(userName);
    }

    public Event enroll(Event e, Long id) {
        Event event = eventService.getById(e.getId());
        if (event == null) {
            throw new IllegalArgumentException("Cannot enroll to not existing event");
        }
        User u = getUser(id);
        if (u == null) {
            throw new IllegalArgumentException("User with specified id does not exists");
        }
        u.addEvent(e);
        e.addUser(u);
        if (u.getTotalDistanceEvents() > 1000) {
            if (!u.getAchievements().contains(Achievement.BEGINNER)) {
                u.addAchievement(Achievement.BEGINNER);
            }
        }
        if (u.getTotalDistanceEvents() > 10000) {
            if (!u.getAchievements().contains(Achievement.INTERMEDIATE)) {
                u.addAchievement(Achievement.INTERMEDIATE);
            }
        }
        if (u.getTotalDistanceEvents() > 25000) {
            if (!u.getAchievements().contains(Achievement.INSANE_SPORTSMAN)) {
                u.addAchievement(Achievement.INSANE_SPORTSMAN);
            }
        }
        return e;
    }
}
