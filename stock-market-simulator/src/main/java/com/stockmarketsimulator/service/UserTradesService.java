package com.stockmarketsimulator.service;

import com.stockmarketsimulator.model.User;
import com.stockmarketsimulator.model.UserTrades;
import com.stockmarketsimulator.repository.UserTradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserTradesService {
    private final UserTradeRepository userTradeRepo;


    @Autowired
    public UserTradesService(UserTradeRepository userTradeRepo) {
        this.userTradeRepo = userTradeRepo;
    }

    public void saveUserTrade(UserTrades ut) {
        userTradeRepo.save(ut);
    }

    public List<UserTrades> findAllUserTrades() {
        return userTradeRepo.findAll();
    }

    public UserTrades getUserTradesById(String id) {
        return userTradeRepo.findById(id).orElse(null);
    }

    public void deleteById(String userId) {
        userTradeRepo.deleteById(userId);
    }

}
