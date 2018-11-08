package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.controller.exceptions.BadRequestException;
import project.persistence.entities.User;
import project.service.UserService;

import java.util.List;

/**
 * Small controller just to show that you can have multiple controllers
 * in your project
 */
@RestController
@RequestMapping("/")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Example: POST localhost:8080/user
    // RequestBody: { name, username, hash }
    // name, username and hash are strings.  username is unique.
    // Returns user with new ID
    @CrossOrigin(origins = "*")
    @RequestMapping(path="/user", method=RequestMethod.POST)
    public User registerUser(@RequestBody User user) throws BadRequestException {
        try {
            return userService.save(user);
        } catch (Exception e) {
            // If error message matches username taken message, throw bad request exception
            if (e.getMessage().equals(
                    "could not execute statement; " +
                            "SQL [n/a]; constraint [uk_r43af9ap4edm43mmtq01oddj6]; " +
                            "nested exception is org.hibernate.exception.ConstraintViolationException: " +
                            "could not execute statement")) {
                throw new BadRequestException("Username is already taken");

            } else {
                throw e;
            }
        }

    }

    // Example: GET localhost:8080/user
    // Returns list of all users
    @CrossOrigin(origins = "*")
    @RequestMapping(path="/user", method=RequestMethod.GET)
    public List<User> listAllUsers() {
        return userService.findAll();
    }

    // Example: GET localhost:8080/user/{id}
    // id is userID
    // Returns corresponding user, users eventList is in response.
    @CrossOrigin(origins = "*")
    @RequestMapping(path="/user/{id}", method=RequestMethod.GET)
    public User findOneUser(@PathVariable String id) {
        return userService.findOne(Long.parseLong(id));
    }

}
