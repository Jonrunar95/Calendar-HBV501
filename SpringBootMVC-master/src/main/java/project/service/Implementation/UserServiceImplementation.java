package project.service.Implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.persistence.entities.Event;
import project.persistence.entities.User;
import project.persistence.repositories.UserRepository;
import project.service.UserService;

import java.util.List;

@Service
public class UserServiceImplementation implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImplementation(UserRepository repository) {
        this.userRepository = repository;
    }

    @Override
    public User save(User user) {
        return cleanUser(userRepository.save(user));
    }

    @Override
    public void delete(User user) {
        userRepository.delete(user);
    }

    @Override
    public User findOne(Long id) {
        return cleanUser(userRepository.findOneById(id));
    }

    @Override
    public User update(User user) {
        return cleanUser(user);
    }

    @Override
    public User login(User user) {
        return null;
    }

    @Override
    public List<User> findAll() {
        return cleanUserList(userRepository.findAll());
    }

    private User cleanUser(User user) {
        if (user == null) return null;
        if (user.getEvents() == null) return user;

        user.setPassword(null);

        for (Event event : user.getEvents()) {
            event.setUsers(null);
        }
        return user;
    }

    private List<User> cleanUserList(List<User> userList) {
        for (User user : userList) {
            user = cleanUser(user);
        }
        return userList;
    }
}
