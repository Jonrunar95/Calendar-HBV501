package project.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import project.persistence.entities.Event;

import java.util.List;

/**
 * By extending the {@link JpaRepository} we have access to powerful methods.
 * For detailed information, see:
 * http://docs.spring.io/spring-data/commons/docs/current/api/org/springframework/data/repository/CrudRepository.html
 * http://docs.spring.io/spring-data/data-commons/docs/1.6.1.RELEASE/reference/html/repositories.html
 *
 */
public interface EventRepository extends JpaRepository<Event, Long> {

    Event save(Event event);

    @Transactional
    @Modifying
    @Query(value="DELETE FROM Event WHERE id= ?1")
    void delete(Long id);

    List<Event> findAll();

    @Query(value = "SELECT event from Event event " +
            "where event.startDate > ?1 and event.endDate < ?2" )
    List<Event> findPeriod(long start, long end);
}
