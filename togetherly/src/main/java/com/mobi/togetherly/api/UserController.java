package com.mobi.togetherly.api;

import com.mobi.togetherly.UserDTO;
import com.mobi.togetherly.config.TokenProvider;
import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.User;
import com.mobi.togetherly.service.UserDetailsService;
import com.mobi.togetherly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/user")
public class UserController {
    private TokenProvider tokenProvider;
    private AuthenticationManager manager;
    private UserService service;
    private UserDetailsService detService;
    private Logger logger = Logger.getLogger(getClass().getName());
    /*
     * CONFIGS
     */

    @Autowired
    public void setService(UserService service) {
        this.service = service;
    }

    public UserDetailsService getDetService() {
        return detService;
    }

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

    /*
     * MAPPINGS
     */

    @PostMapping("/register-event")
    public Event registerEvent(@RequestBody Event e) {
        logger.info("Trying to register event with id: " + e.getId());
        return service.registerEvent(e);
    }

    @PostMapping("/authenticate")
    public String login(@RequestBody User user) {
        logger.info("User: " + user.getUsername() + " is trying to log in");
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
        UserDetails det = detService.loadUserByUsername(username);
        final String token = tokenProvider.createToken(auth);
        return token;
    }

    @GetMapping
    public List<User> getAll() {
        logger.info("Getting all users");
        return service.getAll();
    }

    @GetMapping("/{id}")
    public UserDTO getById(@PathVariable Long id) {
        logger.info("Getting user by id: " + id);
        return service.getUser(id);
    }

    @PostMapping
    public User save(@RequestBody User u) {
        try {
            logger.info("Trying to save user " + u.getUsername());
            return service.addUser(u);
        } catch (IllegalArgumentException ex) {
            logger.info("User not saved");
            throw ex;
        }
    }

    // Mapping to get events in which user has enrolled
    @GetMapping("/events")
    public List<Event> eventList() {
        logger.info("Trying to get all events of user");
        return service.getLoggedUser().getEvents();
    }

    @PostMapping("/enroll")
    public Event enroll(@RequestParam(name = "event") Long id) {
        logger.info("Trying to enroll user to event with id: " + id);
        return service.enroll(id);
    }
}
