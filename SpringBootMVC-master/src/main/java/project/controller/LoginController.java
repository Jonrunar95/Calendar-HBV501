/*
package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import project.controller.exceptions.BadRequestException;
import project.persistence.entities.User;
import project.service.UserService;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path="", method=RequestMethod.POST)
    public User loginUser(@RequestBody User user) throws BadRequestException {
        User loggedIn = userService.login(user);

        if (loggedIn == null) {
            throw new BadRequestException("Username not found or invalid password");
        }

        return loggedIn;
    }

}
*/
