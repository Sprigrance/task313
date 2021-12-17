package ru.kirillov.springboot.task311.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import ru.kirillov.springboot.task311.services.RoleService;
import ru.kirillov.springboot.task311.services.UserDetailsServiceImpl;
import org.springframework.web.bind.annotation.*;
import ru.kirillov.springboot.task311.models.User;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserRESTController {

    private final UserDetailsServiceImpl userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;

    @Autowired
    public UserRESTController(UserDetailsServiceImpl userDetailsService,
                              PasswordEncoder passwordEncoder,
                              RoleService roleService) {

        this.userDetailsService = userDetailsService;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public List<User> getAllUsers() {
        return userDetailsService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable int id) {
        User user = userDetailsService.getUser(id);
        if (user == null) {
            throw new RuntimeException("There is no user with ID = " +
                    id + " in DataBase");
        }
        return user;
    }

    @GetMapping("/currentUser")
    public User getCurrentUser(@AuthenticationPrincipal User currentUser) {
        User user = (User) userDetailsService.loadUserByUsername(currentUser.getUsername());
        return user;
    }

    @PostMapping("/new")
    public User addNewUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Шифруем пароль
        userDetailsService.saveUser(user);
        return user;
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        userDetailsService.updateUser(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable int id) {
        userDetailsService.deleteUser(id);
        return "User with ID = " + id + " was completely deleted";
    }
}
