package project.service.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import project.persistence.entities.User;
import project.persistence.repositories.UserRepository;
import project.service.UserService;

import java.util.List;

public class UserServiceImplementation implements UserService {

    private UserRepository repository;

    @Autowired
    public UserServiceImplementation(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public User save(User user) {
        return null;
    }

    @Override
    public void delete(User user) {

    }

    @Override
    public User findOne(Long id) {
        return null;
    }

    @Override
    public User update(User user) {
        return null;
    }

    @Override
    public User login(User user) {
        return null;
    }

    @Override
    public List<User> findAll() {
        return null;
    }
}
