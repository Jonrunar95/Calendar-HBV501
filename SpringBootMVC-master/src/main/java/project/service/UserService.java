package project.service;


import project.persistence.entities.Event;
import project.persistence.entities.User;

import java.util.List;

public interface UserService {

    User save(User user);

    void delete(User user);

    User findOne(Long id);

    User update(User user);

    User login(User user);

    List<User> findAll();

    List<Event> findAllEvents(Long id);
}
