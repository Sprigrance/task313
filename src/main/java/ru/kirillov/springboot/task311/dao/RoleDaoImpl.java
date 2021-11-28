package ru.kirillov.springboot.task311.dao;

import org.springframework.stereotype.Repository;
import ru.kirillov.springboot.task311.models.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RoleDaoImpl implements RoleDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Role> getAllRoles() {
        return entityManager.createQuery("from Role").getResultList();
    }

    @Override
    public Role getRoleByName(String role) {
        return entityManager.createQuery("from Role where name = :roleName", Role.class)
                .setParameter("roleName", role)
                .getSingleResult();
    }

    @Override
    public void saveRole(Role role) {
        entityManager.persist(role);
    }
}
