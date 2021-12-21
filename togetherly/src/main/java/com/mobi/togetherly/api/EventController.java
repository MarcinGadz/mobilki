package com.mobi.togetherly.api;

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
    public List<Event> getEvents() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Event getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public Event createEvent(@RequestBody Event event) {
        return service.addEvent(event);
    }
}
