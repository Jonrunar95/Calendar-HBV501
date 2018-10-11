package project.service;


import project.persistence.entities.Event;

import java.util.List;

public interface EventService {

    Event save(Event event);

    void delete(Long id);

    List<Event> findAll();
}
