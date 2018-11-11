package project.service;


import project.persistence.entities.Event;
import project.persistence.entities.User;

import java.util.Date;
import java.util.List;

public interface EventService {

    Event save(User user, Event event);

    void delete(Event event);

    List<Event> findByDate(Date startDate, Date endDate);

    Event findOne(Long id);

    Event updateEvent(Long id, Event event);

    Event updateUserList(Long id, List<String> usernames);
}
