package com.mobi.togetherly.dao;

import com.mobi.togetherly.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventDao extends JpaRepository<Event, Long> {
}
