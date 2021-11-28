package ru.kirillov.springboot.task311.dao;

import ru.kirillov.springboot.task311.models.Role;

import java.util.List;

public interface RoleDao {
    List<Role> getAllRoles();
    Role getRoleByName(String role);
    void saveRole(Role role);
}
