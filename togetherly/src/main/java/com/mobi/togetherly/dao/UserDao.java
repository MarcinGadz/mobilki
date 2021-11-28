package com.mobi.togetherly.dao;

import com.mobi.togetherly.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDao extends JpaRepository<User, Long> {
    public User findByUsername(String username);
}
