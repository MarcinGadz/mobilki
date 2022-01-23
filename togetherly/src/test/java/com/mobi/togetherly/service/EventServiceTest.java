package com.mobi.togetherly.service;

import com.mobi.togetherly.dao.EventDao;
import com.mobi.togetherly.dao.UserDao;
import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.EventDTO;
import com.mobi.togetherly.model.User;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class EventServiceTest {

    @Rule
    public MockitoRule rule = MockitoJUnit.rule();
    @Mock
    EventDao dao;
    @Mock
    UserDao userDao;
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

    @Test
    public void getByEnrolledUser() {
        eventService.setDao(dao);
        eventService.setUserDao(userDao);
        Event e = new Event();
        e.setId(1L);
        User u = new User();
        String uUserName = "username";
        u.setUsername(uUserName);
        u.setId(1L);
        u.addEvent(e);
        User u2 = new User();
        String u2UserName = "Otherusername";
        u2.setUsername(u2UserName);
        u2.setId(3L);
        e.setEnrolledUsers(List.of(u, u2));
        Mockito.when(userDao.findByUsername(uUserName)).thenReturn(u);
        Mockito.when(dao.getEventsByEnrolledUsersContaining(u)).thenReturn(List.of(e));
        List<EventDTO> ev = eventService.getByEnrolledUser(uUserName);

        assertEquals(ev.get(0).fromDto(), e);

        Mockito.when(userDao.findByUsername(u2UserName)).thenReturn(u2);
        Mockito.when(dao.getEventsByEnrolledUsersContaining(u2)).thenReturn(List.of());
        assertTrue(eventService.getByEnrolledUser(u2UserName).isEmpty());
        String nonExistingUsername = "404";
        Mockito.when(userDao.findByUsername(nonExistingUsername)).thenReturn(null);
        assertThrows(NoSuchElementException.class, () -> eventService.getByEnrolledUser(nonExistingUsername));
    }

    @Test
    public void getNearSpecifiedPointTest() {
        // Scenario:
        // Test with bad parameters
        // Test with expected returned events
        // Test with no expected returned events
        eventService.setDao(dao);
        Point testPointWrong = null;
        Point testPointGood = new Point(22, 25);
        Double testRadiusWrong = -0.1;
        Double testRadiusGood = 4000.0;
        assertThrows(IllegalArgumentException.class, () -> eventService.search(testPointWrong, testRadiusGood));
        assertThrows(IllegalArgumentException.class, () -> eventService.search(testPointGood, testRadiusWrong));
        Event futureEventNear = new Event();
        futureEventNear.setStartPoint(new Point(testPointGood.getX() - 0.01, testPointGood.getY() - 0.015));
        futureEventNear.setTitle("Test event");
        futureEventNear.setDate(LocalDateTime.of(2025, 1, 1, 0, 0));
        Event pastEventNear = new Event();
        pastEventNear.setStartPoint(new Point(testPointGood.getX() + 0.01, testPointGood.getY() + 0.015));
        pastEventNear.setTitle("Test event");
        pastEventNear.setDate(LocalDateTime.of(2020, 1, 1, 0, 0));
        pastEventNear.setId(1L);
        futureEventNear.setId(2L);
        List<Event> testEvents = List.of(pastEventNear, futureEventNear);
        Mockito.when(dao.findAll()).thenReturn(testEvents);
        // Distance between testPointGood and testEvents is ~1,5km
        // So both events should be found within 2km radius
        assertEquals(testEvents.size(), eventService.search(testPointGood, testRadiusGood).size());
        assertEquals(testEvents, eventService.search(testPointGood, testRadiusGood).stream().map(EventDTO::fromDto).collect(Collectors.toList()));
        // But they shouldn't be found in 1km radius
        Double testRadiusTooSmall = 1000.0;
        assertEquals(0, eventService.search(testPointGood, testRadiusTooSmall).size());
    }

    @Test
    public void getNearSpecifiedPointWithDatesTest() {
        // Scenario: this test tests only filtering by date,
        // because it uses other method to find events near point
        // Don't pass any date (Should return all from now)
        // Pass only before date (should return from now to specified date)
        // Pass only after date
        // Pass both dates
        eventService.setDao(dao);

        // Create test events
        Point testPoint = new Point(0, 0);
        Double testRadius = 200.0;
        Event earliestEvent = new Event();
        Event futureEvent = new Event();
        Event futureEventLater = new Event();
        earliestEvent.setStartPoint(testPoint);
        futureEvent.setStartPoint(testPoint);
        futureEventLater.setStartPoint(testPoint);
        earliestEvent.setId(1L);
        futureEvent.setId(2L);
        futureEventLater.setId(3L);
        earliestEvent.setDate(LocalDateTime.of(2023, 2, 15, 0, 0));
        futureEvent.setDate(LocalDateTime.of(2024, 2, 15, 0, 0));
        futureEventLater.setDate(LocalDateTime.of(2024, 5, 15, 0, 0));
        EventDTO earliestDTO = new EventDTO(earliestEvent);
        EventDTO futureDTO = new EventDTO(futureEvent);
        EventDTO futureLaterDTO = new EventDTO(futureEventLater);
        List<Event> allEvents = List.of(earliestEvent, futureEvent, futureEventLater);
        List<EventDTO> allEventsDTOs = List.of(earliestDTO, futureDTO, futureLaterDTO);
        // mock service
        Mockito.when(dao.findAll()).thenReturn(allEvents);
        // Test
        assertEquals(List.of(earliestDTO, futureDTO, futureLaterDTO), eventService.search(testPoint, testRadius, null, null, null));
        assertEquals(List.of(earliestDTO), eventService.search(testPoint, testRadius, null, "2023-03-01T00:00", null));
        assertEquals(List.of(futureDTO, futureLaterDTO), eventService.search(testPoint, testRadius, "2023-03-01T00:00", null, null));
        assertEquals(List.of(futureDTO), eventService.search(testPoint, testRadius, "2023-03-01T00:00", "2024-04-01T00:00", null));
    }

    @Test
    public void getDao() {
        eventService.setDao(dao);
        assertEquals(eventService.getDao(), dao);
    }
}