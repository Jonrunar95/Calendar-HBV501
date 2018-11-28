package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.controller.exceptions.BadRequestException;
import project.persistence.entities.User;
import project.service.UserService;

@RestController
@RequestMapping("/")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public User loginUser(@RequestBody User user) throws BadRequestException {
        User loggedIn = userService.login(user);

        if (loggedIn == null) {
            throw new BadRequestException("Username not found or invalid password");
        }

        return loggedIn;
    }

    // Example: POST localhost:8080/user
    // RequestBody: { name, username, hash }
    // name, username and hash are strings.  username is unique.
    // Returns user with new ID
    @CrossOrigin(origins = "*")
    @RequestMapping(path = "/register", method = RequestMethod.POST)
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
            } else if (e.getMessage().equals("could not execute statement; " +
                    "SQL [n/a]; constraint [password]; " +
                    "nested exception is org.hibernate.exception.ConstraintViolationException: " +
                    "could not execute statement")) {
                throw new BadRequestException("Password cannot be empty");
            } else if (e.getMessage().equals("Username can only contain [a-z A-Z 0-9 _ -]")) {
                throw new BadRequestException(e.getMessage());
            }
            throw e;
        }
    }
}

