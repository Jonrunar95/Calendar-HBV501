package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.persistence.entities.Event;
import project.service.EventService;

import java.nio.file.Path;
import java.util.Date;
import java.util.List;

/**
 * Small controller just to show that you can have multiple controllers
 * in your project
 */
@RestController
@RequestMapping("/")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    // Example: GET localhost:8080/event?StartDate={x}&endDate={y}
    // x, y are dates in milliseconds
    // Returns list of events with startDate between x and y
    @RequestMapping(path="/event", method=RequestMethod.GET)
    public List<Event> postEvent(@RequestParam String startDate, String endDate) {
        return eventService.findByDate(
                new Date(Integer.parseInt(startDate)),
                new Date(Integer.parseInt(endDate))
        );
    }

    // Example: GET localhost:8080/event/{id}
    // id is eventID
    // Returns corresponding event
    @RequestMapping(path="/event/{id}", method=RequestMethod.GET)
    public Event findOneEvent(@PathVariable String id) {
        return eventService.findOne(Long.parseLong(id));
    }

    // Example: POST localhost:8080/event
    // RequestBody: { startDate, endDate, ownerID, title, description }
    // startDate and endDate are dates in milliseconds
    // ownerID is id of the creator of the event
    // title and description are strings
    // Returns event with new ID
    @RequestMapping(path="/event", method=RequestMethod.POST)
    public Event postEvent(@RequestBody Event event) {
        return eventService.save(event);
    }

    // Example: POST localhost:8080/event/{id}
    // RequestBody: [username_1, username_2, ... , username_k]
    // id is eventID
    // Returns event with updated UserList based on valid usernames given in request body
    @RequestMapping(path="/event/{id}", method=RequestMethod.POST)
    public Event updateUserList(@RequestBody List<String> usernames, @PathVariable String id) {
        return eventService.updateUserList(Long.parseLong(id), usernames);
    }

}
