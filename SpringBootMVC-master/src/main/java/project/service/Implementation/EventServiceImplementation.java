package project.service.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.persistence.entities.Event;
import project.persistence.entities.User;
import project.persistence.repositories.EventRepository;
import project.persistence.repositories.UserRepository;
import project.service.EventService;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class EventServiceImplementation implements EventService {

    // Instance Variables
    EventRepository eventRepository;
    UserRepository userRepository;

    // Dependency Injection
    @Autowired
    public EventServiceImplementation(EventRepository eventRepository, UserRepository userRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Event save(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public void delete(Event event) {
        eventRepository.delete(event);
    }

    @Override
    public List<Event> findByDate(Date startDate, Date endDate) {
        return eventRepository.findByStartDateBetween(startDate, endDate);
    }

    @Override
    public Event findOne(Long id) {
        return eventRepository.findOneById(id);
    }

    @Override
    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public Event updateUserList(Long id, List<String> usernames) {
        Event event = eventRepository.findOneById(id);
        List <User> currentUserList = event.getUsers();
        List <User> newUsers = new ArrayList<>();

        for (String username : usernames) {
            User user = userRepository.findUserByUsername(username);
            if (user != null) newUsers.add(user);
        }

        currentUserList.addAll(newUsers);

        return eventRepository.save(event);

    }
}
