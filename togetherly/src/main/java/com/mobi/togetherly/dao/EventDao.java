package com.mobi.togetherly.dao;

import com.mobi.togetherly.model.Event;
import com.mobi.togetherly.model.User;
import org.springframework.data.geo.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EventDao extends JpaRepository<Event, Long> {
    List<Event> findByOwner(User owner);
    List<Event> findByStartPointBetween(Point p1, Point p2);
    @Query(value = "SELECT startPoint FROM Event ")
    List<Object> findStartPoints();
    @Query(value = "SELECT title FROM Event ")
    List<Object> findTitles();
    Event findEventByTitle(String title);
    List<Event> getEventsByStartPoint(Point p);
}
