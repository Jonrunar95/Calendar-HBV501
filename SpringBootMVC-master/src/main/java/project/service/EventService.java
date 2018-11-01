package project.service;


import project.persistence.entities.Event;

import java.util.Date;
import java.util.List;

public interface EventService {

    Event save(Event event);

    void delete(Event event);

    List <Event> findByDate(Date startDate, Date endDate);

    Event findOne(Long id);

    Event updateEvent(Event event);

    Event updateUserList(Long id, List<String> usernames);
}
