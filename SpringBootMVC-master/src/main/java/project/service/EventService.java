package project.service;


import project.controller.exceptions.UnauthorizedException;
import project.persistence.entities.Event;
import project.persistence.entities.User;

import java.util.Date;
import java.util.List;

public interface EventService {

    Event save(User user, Event event);

    void delete(User user, Long id) throws UnauthorizedException;

    List<Event> findByDate(User user, Date startDate, Date endDate);

    Event findOne(Long id);

    Event updateEvent(User user, Long id, Event event) throws Exception;

    Event updateUserList(User user, Long id, List<String> usernames) throws Exception;
}
