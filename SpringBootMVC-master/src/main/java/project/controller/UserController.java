package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @RequestMapping(path="/user", method=RequestMethod.POST)
    public User registerUser(@RequestBody User user) {
        return userService.save(user);
    }

    @RequestMapping(path="/user", method=RequestMethod.GET)
    public List<User> listAllUsers() {
        return userService.findAll();
    }

    @RequestMapping(path="/user/{id}", method=RequestMethod.GET)
    public User findOneUser(@PathVariable String id) {
        return userService.findOne(Long.parseLong(id));
    }

}
