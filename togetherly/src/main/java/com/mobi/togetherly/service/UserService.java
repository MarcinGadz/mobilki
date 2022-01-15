package com.mobi.togetherly.service;

import com.mobi.togetherly.dao.RoleDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private UserDao userDao;
    private RoleDao roleDao;
    private EventService eventService;
    private Role customerRole;
    private PasswordEncoder encoder;

    public UserService() {

    }

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

    public UserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public PasswordEncoder getEncoder() {
        return encoder;
    }

    @Autowired
    public void setEncoder(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public boolean checkString(String s) {
        return !(s == null || s.equals("") || s.trim().equals(""));
    }

    private boolean checkEmail(String email) {
        if (email == null) return false;
        return email.matches("^[^@]+@[^@]+\\.[^@]+$");
    }

    public User addUser(User u) {
        if (checkString(u.getUsername()) &&
                checkString(u.getPassword()) &&
                checkEmail(u.getEmail()) &&
                (u.getGravatarEmail() == null ||
                        checkEmail(u.getGravatarEmail()))) {
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
        Event event;
        try {
            event = eventService.getById(id).fromDto();
        } catch (NullPointerException ex) {
            event = null;
        }
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
        boolean wasUserChanged = false;
        if ((u.getAchievements() == null || !u.getAchievements().contains(Achievement.BEGINNER)) && u.getEvents().size() == 1) {
            u.addAchievement(Achievement.BEGINNER);
            wasUserChanged = true;
        } else if (u.getEvents().size() > 5 && (u.getAchievements() == null || !u.getAchievements().contains(Achievement.INTERMEDIATE))) {
            u.addAchievement(Achievement.INTERMEDIATE);
            wasUserChanged = true;
        } else if (u.getEvents().size() > 10 && (u.getAchievements() == null || !u.getAchievements().contains(Achievement.INSANE_SPORTSMAN))) {
            u.addAchievement(Achievement.INSANE_SPORTSMAN);
            wasUserChanged = true;
        }
        if (wasUserChanged) {
            userDao.save(u);
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
            if (p.getOwnedEvents().size() == 1 && (p.getAchievements() == null || !p.getAchievements().contains(Achievement.CREATOR))) {
                p.addAchievement(Achievement.CREATOR);
                userDao.save(p);
            } else if (p.getOwnedEvents().size() > 5 && !p.getAchievements().contains(Achievement.SOCIAL_STAR)) {
                p.addAchievement(Achievement.SOCIAL_STAR);
                userDao.save(p);
            }
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

    public UserDTO updateUser(User u) {
        UserDTO user = getLoggedUser();
        if (checkEmail(u.getEmail())) {
            user.setEmail(u.getEmail());
        }
        if (checkEmail(u.getGravatarEmail())) {
            user.setGravatarEmail(u.getGravatarEmail());
        }
        if (checkString(u.getPassword())) {
            user.setPassword(u.getPassword());
        }
        User newUser = userDao.save(user.fromDTO());
        return new UserDTO(newUser);
    }

    public List<EventDTO> getPastEvents() {
        UserDTO u = getLoggedUser();
        if (u == null) {
            throw new IllegalStateException("User is not logged in");
        }
        return eventService.getByEnrolledUserAndDateBefore(u.fromDTO(),
                LocalDate.now()).stream().map(EventDTO::new).collect(Collectors.toList());
    }

    public List<EventDTO> getFutureEvents() {
        UserDTO u = getLoggedUser();
        if (u == null) {
            throw new IllegalStateException("User is not logged in");
        }
        return eventService.getByEnrolledUserAndDateAfter(u.fromDTO(),
                LocalDate.now()).stream().map(EventDTO::new).collect(Collectors.toList());
    }

    public List<EventDTO> getByEnrolledUser() {
        UserDTO u = getLoggedUser();
        if (u == null) {
            throw new IllegalStateException("User is not logged in");
        }
        return eventService.getByEnrolledUser(u);
    }

    public void setEventService(EventService eventService) {
        this.eventService = eventService;
    }

    public void remove(User u) {
        userDao.delete(u);
    }
}
