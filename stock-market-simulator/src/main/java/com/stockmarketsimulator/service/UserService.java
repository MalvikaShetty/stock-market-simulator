package com.stockmarketsimulator.service;

import com.stockmarketsimulator.model.User;
import com.stockmarketsimulator.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepo;

    @Autowired
    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public void saveUser(User user) {
        userRepo.save(user);
    }

    public List<User> allUsers() {
        return userRepo.findAll();
    }

    public User getUserById(String id) {
        return userRepo.findById(id).orElse(null);
    }

    public void deleteById(String userId) {
        userRepo.deleteById(userId);
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }
}
