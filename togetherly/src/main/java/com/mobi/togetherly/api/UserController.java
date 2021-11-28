package com.mobi.togetherly.api;

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
import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController {
    private TokenProvider tokenProvider;
    private AuthenticationManager manager;
    private UserService service;
    private UserDetailsService detService;

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

    @PostMapping("/authenticate")
    public String login(@RequestBody User user) {
        System.out.println("HERE");
        String username = user.getUsername();
        String password = user.getPassword();
        Authentication auth;
        try {
            auth = manager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {
            throw new RuntimeException("INVALID_CREDENTIALS", e);
        } catch (DisabledException e) {
            System.out.println("BB");
            throw new RuntimeException("USER_DISABLED", e);
        }
        UserDetails det = detService.loadUserByUsername(username);
        final String token = tokenProvider.createToken(auth);
        return token;
    }

    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    @PostMapping
    public User save(@RequestBody User u) {
        if (u.getUsername() == null || u.getPassword() == null) {
            throw new IllegalArgumentException();
        }
        return service.addUser(u);
    }

    // Mapping to get events in which user has enrolled
    @GetMapping("/{id}/events")
    public List<Event> eventList(@PathVariable String id) {
        return service.getUser(Long.valueOf(id)).getEvents();
    }
}
