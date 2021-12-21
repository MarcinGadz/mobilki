package com.mobi.togetherly.service;

import com.mobi.togetherly.EventDTO;
import com.mobi.togetherly.dao.EventDao;
import com.mobi.togetherly.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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
        if(e.getStartPoint() == null || e.getDescription() == null || e.getDescription().trim().equals("")) {
            throw new IllegalArgumentException("Passed wrong entity");
        }
        return dao.save(e);
    }

    public EventDTO getById(Long id) {
        Event e = dao.findById(id).orElse(null);
        if(e == null) {
            return null;
        }
        return new EventDTO(e);
    }

    public List<EventDTO> getAll() {
        return dao.findAll().stream().map(e -> new EventDTO(e)).collect(Collectors.toList());
    }
}
