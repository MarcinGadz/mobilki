package com.mobi.togetherly.service;

import com.mobi.togetherly.dao.EventDao;
import com.mobi.togetherly.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class EventService {

    private EventDao dao;

    public EventDao getDao() {
        return dao;
    }

    @Autowired
    public void setDao(EventDao dao) {
        this.dao = dao;
    }

    public Event addEvent(Event e) {
        if(e.getRoute() == null || e.getRoute().isEmpty()) {
            throw new IllegalArgumentException("Passed wrong entity");
        }
        return dao.save(e);
    }

    public Event getById(Long id) {
        return dao.getById(id);
    }

    public List<Event> getAll() {
        return dao.findAll();
    }
}
