package com.stockmarketsimulator.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stockmarketsimulator.model.UserTrades;
import com.stockmarketsimulator.repository.UserTradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserTradesService {
    private final UserTradeRepository userTradeRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    public UserTradesService(UserTradeRepository userTradeRepo) {
        this.userTradeRepo = userTradeRepo;
    }

    public UserTrades saveUserTrade(UserTrades ut) {
        userTradeRepo.save(ut);
        return ut;
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
