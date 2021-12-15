package ru.kirillov.springboot.task311.dao;

import org.springframework.stereotype.Repository;
import ru.kirillov.springboot.task311.models.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @PersistenceContext                      // используем вместо @Autowired
    private EntityManager entityManager;

    @Override
    public List<User> getAllUsers() {
        return entityManager.createQuery("from User").getResultList();
    }

    @Override
    public User getUser(int id) {
        return entityManager.createQuery("from User where id = :userId", User.class)
                .setParameter("userId", id)
                .getSingleResult();
    }

    @Override
    public void saveUser(User user) {
        entityManager.persist(user);
    }

    @Override
    public void updateUser(User updatedUser) {
        User userToBeUpdated = getUser(updatedUser.getId());
        userToBeUpdated.setUsername(updatedUser.getUsername());
        userToBeUpdated.setPassword(updatedUser.getPassword());
        userToBeUpdated.setEmail(updatedUser.getEmail());
        userToBeUpdated.setRoles(updatedUser.getRoles());
        entityManager.merge(userToBeUpdated);
    }

    @Override
    public void deleteUser(int id) {
        entityManager.remove(getUser(id));
    }

    @Override
    public User loadUserByUsername(String name) {
        return entityManager.createQuery("from User where username = :username", User.class)
                .setParameter("username", name)
                .getSingleResult();
    }
}
