package ru.kirillov.springboot.task311.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kirillov.springboot.task311.models.User;
import ru.kirillov.springboot.task311.services.RoleService;
import ru.kirillov.springboot.task311.services.UserDetailsServiceImpl;

@Controller
@RequestMapping("/users")
public class UserController {

    private final UserDetailsServiceImpl userDetailsService;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserDetailsServiceImpl userDetailsService,
                          RoleService roleService,
                          PasswordEncoder passwordEncoder) {

        this.userDetailsService = userDetailsService;
        this.roleService = roleService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/user")
    public String showUserInfo(@AuthenticationPrincipal User currentUser, Model model) {
        model.addAttribute("currentUser",
                userDetailsService.loadUserByUsername(currentUser.getUsername()));
        return "user/userInfo";
    }

    @GetMapping("/admin")
    public String getAllUsers(@AuthenticationPrincipal User currentUser,
                              @ModelAttribute("newUser") User newUser,   // newUser - пустой объект для создания нового пользователя
                              Model model) {

        model.addAttribute("users", userDetailsService.getAllUsers());
        model.addAttribute("currentUser", userDetailsService.getUser(currentUser.getId()));
        return "admin/adminInfo";
    }

    @PostMapping("/addUser")
    public String addUser(@ModelAttribute("newUser") User user,
                          @RequestParam String[] strRoles) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Шифруем пароль
        user.setRoles(roleService.getSetRoleFromArray(strRoles));      // Преобразовываем роли
        userDetailsService.saveUser(user);
        return "redirect:/users/admin";
    }

    @PatchMapping("/{id}/edit")
    public String updateUser(@ModelAttribute("user") User user,
                             @PathVariable("id") int id,
                             @RequestParam String[] strRoles) {

        user.setRoles(roleService.getSetRoleFromArray(strRoles));      // Преобразовываем роли
        userDetailsService.updateUser(id, user);
        return "redirect:/users/admin";
    }

    @DeleteMapping("/{id}/delete")
    public String deleteUser(@PathVariable("id") int id) {
        userDetailsService.deleteUser(id);
        return "redirect:/users/admin";
    }

//  Ручное добавление пользователей и ролей
//    @PostConstruct
//    public void myinit() {
//        Role role1 = new Role("ROLE_ADMIN");
//        Role role2 = new Role("ROLE_USER");
//        roleService.saveRole(role1);
//        roleService.saveRole(role2);
//        Set<Role> roles = new HashSet<>();
//        roles.add(role1);
//        roles.add(role2);
//
//        User user = new User();
//        user.setUsername("admin");
//        user.setPassword(passwordEncoder.encode("admin"));
//        user.setRoles(roles);
//
//        userService.saveUser(user);
//    }
}
