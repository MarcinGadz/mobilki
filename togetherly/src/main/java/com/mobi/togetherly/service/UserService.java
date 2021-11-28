package com.mobi.togetherly.service;

import com.mobi.togetherly.dao.RoleDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.Role;
import com.mobi.togetherly.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserService {
    private final UserDao userDao;
    private final RoleDao roleDao;
    private final Role customerRole;
    private PasswordEncoder encoder;

    @Autowired
    public UserService(UserDao userDao, RoleDao roleDao) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        Role customerRoleTemp = roleDao.findByAuthority("ROLE_CUSTOMER");
        if (customerRoleTemp == null) {
            customerRoleTemp = new Role("ROLE_CUSTOMER");
            roleDao.save(customerRoleTemp);
        }
        this.customerRole = customerRoleTemp;
    }

    @Autowired
    public void setEncoder(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    public PasswordEncoder getEncoder() {
        return encoder;
    }

    public User addUser(User u) {
        u.setPassword(encoder.encode(u.getPassword()));
        Collection<Role> userRoles = u.getAuthorities();
        if (userRoles == null) {
            userRoles = new ArrayList<>();
        }
        userRoles.add(customerRole);
        return userDao.save(u);
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
}
