package com.stockmarketsimulator.controller;

import com.stockmarketsimulator.model.User;
import com.stockmarketsimulator.service.UserService;
import com.stockmarketsimulator.service.UserTradesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/adduser")
    public ResponseEntity<String> addUser(@RequestBody List<User> userList) {
        for (User user : userList) {
            userService.saveUser(user);
        }
        return ResponseEntity.ok("User added successfully");
    }

    @GetMapping("/allusers")
    public List<User> getAllUser() {
        return userService.allUsers();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        User user = userService.getUserById(id);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable String id) {
        userService.deleteById(id);

        return "Deleted Successfully";
    }


}
