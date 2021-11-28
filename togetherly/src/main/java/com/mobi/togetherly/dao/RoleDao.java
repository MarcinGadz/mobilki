package com.mobi.togetherly.dao;

import com.mobi.togetherly.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleDao extends JpaRepository<Role, Long> {
    Role findByAuthority(String authority);
}
