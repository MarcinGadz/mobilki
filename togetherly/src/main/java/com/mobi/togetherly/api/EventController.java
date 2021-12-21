package com.mobi.togetherly.api;

import com.mobi.togetherly.EventDTO;
import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {

    private final EventService service;

    @Autowired
    public EventController(EventService service) {
        this.service = service;
    }

    @GetMapping
    public List<EventDTO> getEvents() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public EventDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    //TODO implement getByRegion or something similiar, getByOwner
}
