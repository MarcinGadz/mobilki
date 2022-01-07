package com.mobi.togetherly.api;

import com.mobi.togetherly.model.EventDTO;
import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.User;
import com.mobi.togetherly.service.EventService;
import com.mobi.togetherly.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Point;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/event")
public class EventController {

    private final EventService service;
    private final UserService userService;

    @Autowired
    public EventController(EventService service, UserService userService) {
        this.userService = userService;
        this.service = service;
    }

    @GetMapping
    public List<EventDTO> getEvents(
            @RequestParam("owner") String owner,
            @RequestParam("user") String user) {
        if (owner != null) {
            User ownerUser = userService.loadUserByUsername(owner);
            return service.getByOwner(ownerUser);
        }
        if (user != null) {
            return service.getByEnrolledUser(user);
        }
        return service.getAll();
    }

    @GetMapping("/{id}")
    public EventDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @GetMapping("/find")
    public EventDTO getByTitle(@RequestParam("title") String title) {
        Event e = service.findByTitle(title);
        if (e == null) return null;
        return new EventDTO(e);
    }

    @GetMapping("/get-near")
    public List<EventDTO> getNear(@RequestParam("latitude") double latitude,
                                  @RequestParam("longitude") double longitude) {
        Point p = new Point(latitude, longitude);
        return service.getNearSpecifiedPoint(p);
    }

    @GetMapping("/start-points")
    public List<Object> getStartPoints() {
        return service.getStartPoints();
    }

    @GetMapping("/point")
    public List<EventDTO> getByStartPoint(@RequestBody Point p) {
        if (p == null) return null;
        List<Event> e = service.getByStartPoint(p);
        if (e == null || e.isEmpty()) return null;
        return e.stream().map(EventDTO::new).collect(Collectors.toList());
    }


    @GetMapping("/titles")
    public List<Object> getTitles() {
        return service.getTitles();
    }
}
