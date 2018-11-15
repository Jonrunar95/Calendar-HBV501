package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.controller.exceptions.BadRequestException;
import project.controller.exceptions.NotFoundException;
import project.persistence.entities.User;
import project.service.UserService;

import java.util.List;

/**
 * Small controller just to show that you can have multiple controllers
 * in your project
 */
@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Example: GET localhost:8080/user
    // Returns list of all users
    @CrossOrigin(origins = "*")
    @RequestMapping(path="", method=RequestMethod.GET)
    public List<User> listAllUsers() {
        return userService.findAll();
    }

    // Example: GET localhost:8080/user/{id}
    // id is userID
    // Returns corresponding user, users eventList is in response.
    @CrossOrigin(origins = "*")
    @RequestMapping(path="/{id}", method=RequestMethod.GET)
    public User findOneUser(@PathVariable String id) throws NotFoundException {
        User user = userService.findOne(Long.parseLong(id));
        if (user == null) {
            throw new NotFoundException("User with id: " + id + " not found");
        }
        return user;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(path="/delete", method=RequestMethod.GET)
    public void deleteUser(@RequestHeader(value="Authorization") String token) {
        User user = userService.findByToken(token);
        userService.delete(user);
    }

}
