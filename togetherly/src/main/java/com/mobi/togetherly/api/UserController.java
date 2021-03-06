package com.mobi.togetherly.api;

import com.mobi.togetherly.model.EventDTO;
import com.mobi.togetherly.model.UserDTO;
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
    private UserService service;
    private Logger logger = Logger.getLogger(getClass().getName());
    /*
     * CONFIGS
     */

    @Autowired
    public void setService(UserService service) {
        this.service = service;
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
        return service.authenticate(user);
    }

    @GetMapping
    public List<UserDTO> getAll() {
        logger.info("Getting all users");
        return service.getAll();
    }

    @GetMapping("/find")
    public UserDTO findByUsername(@RequestParam(name = "username") String username) {
        return service.findByUsername(username);
    }

    @PutMapping
    public UserDTO updateUser(@RequestBody User u) {
        return service.updateUser(u);
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
    public List<EventDTO> eventList(@RequestParam(name = "past", required = false) Object past,
                                    @RequestParam(name = "future", required = false) Object future) {
        if (past != null) {
            logger.info("Trying to get past events of user");
            return service.getPastEvents();
        }
        if (future != null) {
            logger.info("Trying to get future events of user");
            return service.getFutureEvents();
        }
        logger.info("Trying to get all events of user");
        return service.getByEnrolledUser();
    }

    @PostMapping("/enroll")
    public Event enroll(@RequestParam(name = "event") Long id) {
        logger.info("Trying to enroll user to event with id: " + id);
        return service.enroll(id);
    }
}
