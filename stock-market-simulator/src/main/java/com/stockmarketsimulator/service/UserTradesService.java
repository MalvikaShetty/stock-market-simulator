package com.stockmarketsimulator.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.stockmarketsimulator.model.User;
import com.stockmarketsimulator.model.UserTrades;
import com.stockmarketsimulator.repository.UserTradeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserTradesService {
    private final UserTradeRepository userTradeRepo;

    @Autowired
    private ObjectMapper objectMapper;

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

    public UserTrades updateUserTrades(String userId, Map<String, Object> updates) {
        UserTrades userTrades = userTradeRepo.findById(userId).orElse(null);

        if (userTrades != null) {
            // Update 'amountDeposited' if present in updates
            if (updates.containsKey("amountDeposited")) {
                userTrades.setAmountDeposited((Double) updates.get("amountDeposited"));
            }

            // Update 'trades' list if present in updates
            if (updates.containsKey("trades")) {
                List<UserTrades.Trade> newTrades = objectMapper.convertValue(updates.get("trades"), new TypeReference<List<UserTrades.Trade>>() {});
                userTrades.getTrades().addAll(newTrades);
            }

            return userTradeRepo.save(userTrades);
        }

        return null;
    }

    public void deleteById(String userId) {
        userTradeRepo.deleteById(userId);
    }

}
