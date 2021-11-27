package ru.kirillov.springboot.task311.services;

import ru.kirillov.springboot.task311.models.User;

import java.util.List;

public interface UserService {
    public List<User> getAllUsers();
    public User getUser(int id);
    public void saveUser(User user);
    public void updateUser(int id, User user);
    public void deleteUser(int id);
}
