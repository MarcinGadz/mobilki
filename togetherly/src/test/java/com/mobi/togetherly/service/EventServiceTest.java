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

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Rule
    public MockitoRule rule = MockitoJUnit.rule();
    @Mock
    EventDao dao;
    EventService eventService = new EventService();

    @Test
    public void addEvent() {
        eventService.setDao(dao);
        Mockito.when(dao.save(Mockito.isA(Event.class))).then(AdditionalAnswers.returnsFirstArg());
        Event e = new Event();
        assertThrows(IllegalArgumentException.class, () -> eventService.addEvent(e));
        e.setStartPoint(null);
        assertThrows(IllegalArgumentException.class, () -> eventService.addEvent(e));
        e.setStartPoint(new Point(1, 2));
        e.setDescription("Test");
        assertEquals(e, eventService.addEvent(e));
    }

    @Test
    public void getById() {
        eventService.setDao(dao);
        Event tmpdao = new Event();
        tmpdao.setId(123L);
        Mockito.when(dao.findById(123L)).thenReturn(java.util.Optional.of(tmpdao));
        Mockito.when(dao.findById(1L)).thenReturn(java.util.Optional.empty());
        assertNull(eventService.getById(1L));
        assertEquals(eventService.getById(123L).fromDto().getId(), tmpdao.getId());
    }

    @Test
    public void getAll() {
        eventService.setDao(dao);
        List<Event> tmpList = List.of(new Event());
        Mockito.when(dao.findAll()).thenReturn(tmpList);
        assertEquals(tmpList.size(), eventService.getAll().size());
    }
}