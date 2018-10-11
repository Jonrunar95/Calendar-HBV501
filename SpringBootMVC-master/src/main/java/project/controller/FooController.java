package project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.persistence.entities.PostitNote;
import project.persistence.repositories.PostitNoteRepository;
import project.service.PostitNoteService;

import java.util.List;

/**
 * Small controller just to show that you can have multiple controllers
 * in your project
 */
@RestController
@RequestMapping("/foo") // Notice here that the Request Mapping is set at the Class level
public class FooController {

    private final PostitNoteService postitNoteService;

    @Autowired
    public FooController(PostitNoteService postitNoteService) {
        this.postitNoteService = postitNoteService;
    }

    @RequestMapping(path = "/api/postit")
    public List<PostitNote> getall() {
        return postitNoteService.findAll();
    }

    // Notice here that since the class has "/demo", this path is "/demo/page"
    @RequestMapping("/bar")
    public String barPage(){
        return "foo/bar"; // this returns a .jsp file with the path /webapp/WEB-INF/jsp/demo/demo.jsp
    }

    @RequestMapping("/")
    public String fooPage(){
        return "foo/foo"; // this returns a .jsp file with the path /webapp/WEB-INF/jsp/demo/demo.jsp
    }




}
