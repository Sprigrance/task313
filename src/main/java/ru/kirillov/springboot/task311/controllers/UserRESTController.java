package ru.kirillov.springboot.task311.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import ru.kirillov.springboot.task311.services.RoleService;
import ru.kirillov.springboot.task311.services.UserDetailsServiceImpl;
import org.springframework.web.bind.annotation.*;
import ru.kirillov.springboot.task311.models.User;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRESTController {

    private final UserDetailsServiceImpl userDetailsService;
    private final RoleService roleService;

    @Autowired
    public UserRESTController(UserDetailsServiceImpl userDetailsService, RoleService roleService) {
        this.userDetailsService = userDetailsService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public List<User> getAllUsers() {
        return userDetailsService.getAllUsers();
    }

    @GetMapping("/admin/{id}")
    public User getUser(@PathVariable int id) {
        User user = userDetailsService.getUser(id);
        if (user == null) {
            throw new RuntimeException("There is no user with ID = " +
                    id + " in DataBase");
        }
        return user;
    }

    @PostMapping("/new")
    public User addNewUser(@RequestBody User user) {
        userDetailsService.saveUser(user);
        return user;
    }

    @PutMapping("/users/")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userDetailsService.saveUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable int id) {
        userDetailsService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
