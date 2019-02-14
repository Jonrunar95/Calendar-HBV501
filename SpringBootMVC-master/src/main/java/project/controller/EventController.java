package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.controller.exceptions.BadRequestException;
import project.controller.exceptions.NotFoundException;
import project.controller.exceptions.UnauthorizedException;
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
@CrossOrigin(origins = "*", allowedHeaders = "*")
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
    public List<Event> getEvents(
            @RequestParam String startDate, String endDate,
            @RequestHeader(value = "Authorization") String token
    ) {
        User user = userService.findByToken(token);
        return eventService.findByDate(
                user,
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
                    "constraint [start_date]; nested exception is " +
                            "org.hibernate.exception.ConstraintViolationException: could not execute statement") ||
                    e.getMessage().equals(
                            "could not execute statement; SQL [n/a]; " +
                                    "constraint [end_date]; nested exception is " +
                                    "org.hibernate.exception.ConstraintViolationException: could not execute statement") ||
                    e.getMessage().equals(
                            "could not execute statement; SQL [n/a]; " +
                                    "constraint [title]; nested exception is " +
                                    "org.hibernate.exception.ConstraintViolationException: could not execute statement")) {
                throw new BadRequestException("Start date, end date and title cannot be null");
            }
            throw e;
        }
    }

    // Example: POST localhost:8080/event/{id}/users
    // RequestBody: [username_1, username_2, ... , username_k]
    // id is eventID
    // Returns event with updated UserList based on valid usernames given in request body
    @CrossOrigin(origins = "*")
    @RequestMapping(path="/{id}/users", method=RequestMethod.POST)
    public Event updateUserList(
            @RequestBody List<String> usernames,
            @PathVariable String id,
            @RequestHeader(value = "Authorization") String token
    ) throws Exception {
        try {
            User user = userService.findByToken(token);
            Event event = eventService.updateUserList(user, Long.parseLong(id), usernames);
            if (event == null) {
                throw new NotFoundException("Event with id: " + id + " not found");
            }

            return event;
        } catch (Exception e) {
            if (e.getMessage() == "Cannot update event!") {
                throw new UnauthorizedException(e.getMessage());
            }
            throw e;
        }
    }


    // Example: POST localhost:8080/event/{id}
    // RequestBody: { startDate, endDate, title, description }
    // id is eventID, all params are optional in request body
    // Returns event with updated fields
    @CrossOrigin(origins = "*")
    @RequestMapping(path="/{id}", method=RequestMethod.POST)
    public Event updateEvent(
            @RequestBody Event event,
            @PathVariable String id,
            @RequestHeader(value = "Authorization") String token
    ) throws Exception {
        try {
            User user = userService.findByToken(token);
            Event other = eventService.updateEvent(user, Long.parseLong(id), event);
            if (other == null) {
                throw new NotFoundException("Event with id: " + id + " not found");
            }

            return other;
        } catch (Exception e) {
            if (e.getMessage() == "Cannot update event!") {
                throw new UnauthorizedException(e.getMessage());
            }
            throw e;
        }

    }

    @CrossOrigin(origins = "*")
    @RequestMapping(path="/{id}/delete", method=RequestMethod.DELETE)
    public void deleteEvent(@PathVariable String id, @RequestHeader(value="Authorization") String token) throws UnauthorizedException {
        User user = userService.findByToken(token);
        try {
            eventService.delete(user, Long.parseLong(id));
        } catch (Exception e) {
            if (e.getMessage().equals("Cannot delete event")) throw new UnauthorizedException(e.getMessage());
            else throw e;
        }
    }

}
