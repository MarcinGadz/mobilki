package com.mobi.togetherly.config;

import com.mobi.togetherly.dao.RoleDao;
import com.mobi.togetherly.model.Role;
import com.mobi.togetherly.model.User;
import com.mobi.togetherly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LoadStartupData implements ApplicationRunner {
    @Autowired
    private UserService service;

    private void addUsersToRepo() {
        System.out.println("ADDING");
        User u = new User("marcin", "test");
        service.addUser(u);
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (service.getAll().isEmpty()) {
            addUsersToRepo();
        }
    }
}
