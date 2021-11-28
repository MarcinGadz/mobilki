package com.mobi.togetherly.service;

import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.Role;
import com.mobi.togetherly.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

    private UserDao userRepository;

    @Autowired
    public void setUserRepository(UserDao userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }
        UserDetails userDet = org.springframework.security.core.userdetails.User.withUsername(user.getUsername()).
                password(user.getPassword())
                .authorities(getAuthorities(user)).build();
        return userDet;
    }

    private Collection<GrantedAuthority> getAuthorities(User user) {
        Collection<Role> userRoles = user.getAuthorities();
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        for (Role r : userRoles) {
            authorities.add(new SimpleGrantedAuthority(r.getAuthority().toUpperCase()));
        }
        return authorities;
    }


}