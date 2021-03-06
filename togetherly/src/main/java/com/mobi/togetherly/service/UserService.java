package com.mobi.togetherly.service;

import com.mobi.togetherly.config.TokenProvider;
import com.mobi.togetherly.dao.RoleDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class UserService {
    private UserDao userDao;
    private RoleDao roleDao;
    private EventService eventService;
    private Role customerRole;
    private PasswordEncoder encoder;

    private TokenProvider tokenProvider;
    private AuthenticationManager manager;
    private UserDetailsService detService;

    private final Logger logger = Logger.getLogger(getClass().getName());

    @Autowired
    public void setDetService(UserDetailsService detService) {
        this.detService = detService;
    }

    @Autowired
    public void setManager(AuthenticationManager manager) {
        this.manager = manager;
    }

    @Autowired
    public void setTokenProvider(TokenProvider provider) {
        this.tokenProvider = provider;
    }


    public String authenticate(User user) {
        String username = user.getUsername();
        String password = user.getPassword();
        Authentication auth;
        try {
            auth = manager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            logger.info("User logged in");
        } catch (BadCredentialsException e) {
            logger.info("Passed invalid credentials");
            throw new RuntimeException("INVALID_CREDENTIALS", e);
        } catch (DisabledException e) {
            logger.info("User is disabled");
            throw new RuntimeException("USER_DISABLED", e);
        }
//        UserDetails det = detService.loadUserByUsername(username);
        final String token = tokenProvider.createToken(auth);
        return token;
    }

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
        return !(s == null || s.trim().equals(""));
    }

    private boolean checkEmail(String email) {
        if (email == null) return false;
        return email.matches("^[^@]+@[^@]+\\.[^@]+$");
    }

    public User addUser(User u) {
        if (checkUsername(u.getUsername()) &&
                checkString(u.getPassword()) &&
                checkEmail(u.getEmail())) {
            if ((u.getGravatarEmail() == null ||
                    !checkEmail(u.getGravatarEmail()))) {
                u.setGravatarEmail(u.getEmail());
            }
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

    public List<UserDTO> getAll() {
        return userDao.findAll().stream().map(UserDTO::new).collect(Collectors.toList());
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
        User u = getLoggedUser();
        if (u.getEvents() != null && u.getEvents().contains(event)) {
            throw new IllegalStateException("You are already enrolled to this event");
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
        User p = getLoggedUser();
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

    public User getLoggedUser() {
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
        return p;
    }

    public UserDTO updateUser(User u) {
        User user = getLoggedUser();
        if (checkEmail(u.getGravatarEmail())) {
            user.setGravatarEmail(u.getGravatarEmail());
        }
        if (checkString(u.getPassword())) {
            user.setPassword(u.getPassword());
        }
        if (u.getBirthDate() != null && u.getBirthDate() != LocalDate.EPOCH) {
            user.setBirthDate(u.getBirthDate());
        }
        if (checkUsername(u.getUsername())) {
            user.setUsername(u.getUsername());
        }
        User newUser = userDao.save(user);
        return new UserDTO(newUser);
    }

    private boolean checkUsername(String username) {
        if (!checkString(username)) {
            return false;
        }
        return userDao.findByUsername(username) == null;
    }

    public List<EventDTO> getPastEvents() {
        User u = getLoggedUser();
        return eventService.getByEnrolledUserAndDateBefore(u,
                LocalDate.now()).stream().map(EventDTO::new).collect(Collectors.toList());
    }

    public List<EventDTO> getFutureEvents() {
        User u = getLoggedUser();
        return eventService.getByEnrolledUserAndDateAfter(u,
                LocalDate.now()).stream().map(EventDTO::new).collect(Collectors.toList());
    }

    public List<EventDTO> getByEnrolledUser() {
        User u = getLoggedUser();
        return eventService.getByEnrolledUser(new UserDTO(u));
    }

    public void setEventService(EventService eventService) {
        this.eventService = eventService;
    }

    public void remove(User u) {
        userDao.delete(u);
    }
}
