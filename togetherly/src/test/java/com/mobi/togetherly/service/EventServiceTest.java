package com.mobi.togetherly.service;

import com.mobi.togetherly.dao.EventDao;
import com.mobi.togetherly.model.Event;
import org.junit.Rule;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.AdditionalAnswers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.geo.Point;

import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Mock
    EventDao dao;

    @Rule
    public MockitoRule rule = MockitoJUnit.rule();

    EventService eventService = new EventService();
    
    @Test
    public void addEvent() {
        eventService.setDao(dao);
        Mockito.when(dao.save(Mockito.isA(Event.class))).then(AdditionalAnswers.returnsFirstArg());
        Event e = new Event();
        assertThrows(IllegalArgumentException.class, () -> eventService.addEvent(e));
        e.setRoute(new LinkedList<>());
        assertThrows(IllegalArgumentException.class, () -> eventService.addEvent(e));
        List<Point> points = Arrays.asList(new Point(1.2, 1.3), new Point(1.11, 1.444));
        e.setRoute(points);
        assertEquals(e, eventService.addEvent(e));
    }

    @Test
    public void getById() {
        eventService.setDao(dao);
        Event tmpdao = new Event();
        tmpdao.setId(123L);
        Mockito.when(dao.getById(123L)).thenReturn(tmpdao);
        Mockito.when(dao.getById(1L)).thenReturn(null);
        assertNull(eventService.getById(1L));
        assertEquals(eventService.getById(123L), tmpdao);
    }

    @Test
    public void getAll() {
        eventService.setDao(dao);
        List<Event> tmpList = List.of(new Event());
        Mockito.when(dao.findAll()).thenReturn(tmpList);
        assertEquals(tmpList.size(), eventService.getAll().size());
    }
}