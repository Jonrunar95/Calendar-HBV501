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
    public Event save(User user, Event event) {
        event.setUsers(new ArrayList<>());
        event.getUsers().add(user);

        return cleanEvent(eventRepository.save(event));
    }

    @Override
    public void delete(Event event) {
        eventRepository.delete(event);
    }

    @Override
    public List<Event> findByDate(Date startDate, Date endDate) {
        return cleanEventList(eventRepository.findByStartDateBetween(startDate, endDate));
    }

    @Override
    public Event findOne(Long id) {
        return cleanEvent(eventRepository.findOneById(id));
    }

    @Override
    public Event updateEvent(Long id, Event event) {

        // Find the event being updated
        Event currentEvent = eventRepository.findOneById(id);

        if (event == null) return null;

        // Only update available fields.
        if (event.getStartDate() != null) currentEvent.setStartDate(event.getStartDate());
        if (event.getEndDate() != null) currentEvent.setEndDate(event.getEndDate());
        if (event.getTitle() != null) currentEvent.setTitle(event.getTitle());
        if (event.getDescription() != null) currentEvent.setDescription(event.getDescription());

        return cleanEvent(eventRepository.save(currentEvent));
    }

    @Override
    public Event updateUserList(Long id, List<String> usernames) {
        // Get event with id
        Event event = eventRepository.findOneById(id);

        if (event == null) return null;

        // Get current userList
        List <User> currentUserList = event.getUsers();


        // Validate each user and add to List
        for (String username : usernames) {
            User user = userRepository.findUserByUsername(username);
            if (user != null && !currentUserList.contains(user)) {
                currentUserList.add(user);
            }
        }



        try {
            // eventRepository removes duplicate users
            event = eventRepository.save(event);
        } catch (Exception e){

        }
        // Clean event object
        return cleanEvent(event);

    }

    // set events for each user as null to prevent infinite recursive
    // definitions
    private Event cleanEvent(Event event) {
        if (event == null) return null;
        if (event.getUsers() == null) return event;
        for (User user: event.getUsers()) {
            user.setEvents(null);
        }
        return event;
    }

    private List<Event> cleanEventList(List<Event> eventList) {
        for (Event event : eventList) {
            event = cleanEvent(event);
        }
        return eventList;
    }
}
