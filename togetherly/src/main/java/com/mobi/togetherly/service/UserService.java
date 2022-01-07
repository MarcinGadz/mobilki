package com.mobi.togetherly.service;

import com.mobi.togetherly.UserDTO;
import com.mobi.togetherly.dao.RoleDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.Achievement;
import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.Role;
import com.mobi.togetherly.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
        return !(s == null || s.equals("") || s.trim().equals(""));
    }

    private boolean checkEmail(String email) {
        if (email == null) return false;
        return email.matches("^[^@]+@[^@]+\\.[^@]+$");
    }

    public User addUser(User u) {
        if (checkString(u.getUsername()) && checkString(u.getPassword()) && checkEmail(u.getEmail())) {
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

    public UserDTO getUser(Long id) {
        return new UserDTO(userDao.getById(id));
    }

    public List<User> getAll() {
        return userDao.findAll();
    }

    public User loadUserByUsername(String userName) {
        return userDao.findByUsername(userName);
    }

    public UserDTO findByUsername(String userName) {
        return new UserDTO(loadUserByUsername(userName));
    }

    public Event enroll(Long id) {
        Event event = eventService.getById(id).fromDto();
        if (event == null) {
            throw new IllegalArgumentException("Cannot enroll to not existing event");
        }
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            throw new IllegalStateException("User is not logged in");
        }
        Object principal = auth.getPrincipal();
        String userName = ((UserDetails) principal).getUsername();
        User u = loadUserByUsername(userName);
        if (u == null) {
            throw new IllegalArgumentException("User with specified id does not exists");
        }
        u.addEvent(event);
        event.addUser(u);
        eventService.addEvent(event);
        if (!u.getAchievements().contains(Achievement.BEGINNER) && u.getEvents().size() == 1) {
            u.addAchievement(Achievement.BEGINNER);
        }
        return event;
    }

    public Event registerEvent(Event e) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            throw new IllegalStateException("User is not logged in");
        }
        Object principal = auth.getPrincipal();
        String userName = ((UserDetails) principal).getUsername();
        User p = loadUserByUsername(userName);
        if (p == null) {
            throw new IllegalArgumentException("User does not exists");
        }
        try {
            Event res = p.registerNewEvent(e);
            eventService.addEvent(e);
            return res;
        } catch (IllegalArgumentException ex) {
            p.unRegisterEvent(e);
            throw ex;
        }
    }

    public UserDTO getLoggedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) {
            throw new IllegalStateException("User is not logged in");
        }
        Object principal = auth.getPrincipal();
        String userName = ((UserDetails) principal).getUsername();
        User p = loadUserByUsername(userName);
        return new UserDTO(p);
    }
}
