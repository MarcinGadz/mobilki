package com.mobi.togetherly.api;

import com.mobi.togetherly.config.TokenProvider;
import com.mobi.togetherly.model.User;
import com.mobi.togetherly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserDetailsService userDetailsService;
    private TokenProvider tokenProvider;
    private AuthenticationManager manager;
    private UserService service;

    @Autowired
    public void setService(UserService service) {
        this.service = service;
    }

    @Autowired
    public void setUserDetailsService(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Autowired
    public void setManager(AuthenticationManager manager) {
        this.manager = manager;
    }

    @Autowired
    public void setTokenProvider(TokenProvider provider) {
        this.tokenProvider = provider;
    }

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
        UserDetails det = userDetailsService.loadUserByUsername(username);
        final String token = tokenProvider.createToken(auth);
        return token;
    }

    @GetMapping
    public List<User> getAll() {
        return service.getAll();
    }

    @PostMapping
    public User save(@RequestBody User u) {
        if(u.getUsername() == null || u.getPassword() == null) {
            throw new IllegalArgumentException();
        }
        return service.addUser(u);
    }
}
