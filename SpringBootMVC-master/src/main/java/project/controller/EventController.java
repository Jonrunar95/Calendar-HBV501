package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.controller.exceptions.BadRequestException;
import project.controller.exceptions.NotFoundException;
import project.persistence.entities.Event;
import project.persistence.entities.User;
import project.service.EventService;
import project.service.UserService;

import java.nio.file.Path;
import java.util.Date;
import java.util.List;

/**
 * Small controller just to show that you can have multiple controllers
 * in your project
 */
@RestController
@RequestMapping("/event")
public class EventController {

    private final EventService eventService;
    private final UserService userService;

    @Autowired
    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }

    // Example: GET localhost:8080/event?StartDate={x}&endDate={y}
    // x, y are dates in milliseconds
    // Returns list of events with startDate between x and y
    @CrossOrigin(origins = "*")
    @RequestMapping(path="", method=RequestMethod.GET)
    public List<Event> getEvents(@RequestParam String startDate, String endDate) {
        return eventService.findByDate(
                new Date(Long.parseLong(startDate)),
                new Date(Long.parseLong(endDate))
        );
    }

    // Example: GET localhost:8080/event/{id}
    // id is eventID
    // Returns corresponding event
    @CrossOrigin(origins = "*")
    @RequestMapping(path="/{id}", method=RequestMethod.GET)
    public Event findOneEvent(@PathVariable String id) throws NotFoundException {
        Event event = eventService.findOne(Long.parseLong(id));
        if (event == null) {
            throw new NotFoundException("Event with id: " + id + " not found");
        }

        return event;
    }

    // Example: POST localhost:8080/event
    // RequestBody: { startDate, endDate, ownerID, title, description }
    // startDate and endDate are dates in milliseconds
    // ownerID is id of the creator of the event
    // title and description are strings
    // Returns event with new ID
    @CrossOrigin(origins = "*")
    @RequestMapping(path="", method=RequestMethod.POST)
    public Event postEvent(@RequestBody Event event, @RequestHeader(value="Authorization") String token) throws BadRequestException {
        User user = userService.findByToken(token);
        try {
            return eventService.save(user, event);
        } catch (Exception e) {
            if (e.getMessage().equals(
                    "could not execute statement; SQL [n/a]; " +
                    "constraint [end_date]; nested exception is " +
                            "org.hibernate.exception.ConstraintViolationException: could not execute statement")) {
                throw new BadRequestException("Start date, end date and title cannot be null");
            } else {
                throw e;
            }
        }
    }

    // Example: POST localhost:8080/event/{id}/users
    // RequestBody: [username_1, username_2, ... , username_k]
    // id is eventID
    // Returns event with updated UserList based on valid usernames given in request body
    @CrossOrigin(origins = "*")
    @RequestMapping(path="/{id}/users", method=RequestMethod.POST)
    public Event updateUserList(@RequestBody List<String> usernames, @PathVariable String id) throws NotFoundException {
        Event event = eventService.updateUserList(Long.parseLong(id), usernames);
        if (event == null) {
            throw new NotFoundException("Event with id: " + id + " not found");
        }

        return event;
    }


    // Example: POST localhost:8080/event/{id}
    // RequestBody: { startDate, endDate, title, description }
    // id is eventID, all params are optional in request body
    // Returns event with updated fields
    @CrossOrigin(origins = "*")
    @RequestMapping(path="/{id}", method=RequestMethod.POST)
    public Event updateUserList(@RequestBody Event event, @PathVariable String id) throws NotFoundException {
        Event other = eventService.updateEvent(Long.parseLong(id), event);
        if (other == null) {
            throw new NotFoundException("Event with id: " + id + " not found");
        }

        return other;
    }

}
