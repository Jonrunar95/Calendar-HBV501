package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.persistence.entities.Event;
import project.service.EventService;

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

    @RequestMapping(path="/event", method=RequestMethod.GET)
    public List<Event> postEvent(@RequestParam String startDate, String endDate) {
        return eventService.findByDate(
                new Date(Integer.parseInt(startDate)),
                new Date(Integer.parseInt(endDate))
        );
    }

    @RequestMapping(path="/event", method=RequestMethod.POST)
    public Event postEvent(@RequestBody Event event) {
        return eventService.save(event);
    }

}
