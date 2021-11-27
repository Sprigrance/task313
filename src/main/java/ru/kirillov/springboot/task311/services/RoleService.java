package ru.kirillov.springboot.task311.services;

import ru.kirillov.springboot.task311.models.Role;

import java.util.List;

public interface RoleService {
    List<Role> getAllRoles();
    void saveRole(Role role);
    Role getRoleByName(String roleName);
}
