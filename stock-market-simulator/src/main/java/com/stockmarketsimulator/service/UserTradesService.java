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

    public UserTrades updateUserTrades(String userId, Map<String, Object> updates) {
        UserTrades userTrades = userTradeRepo.findById(userId).orElse(null);

        if (userTrades != null) {
            // Update 'amountDeposited' if present in updates
//            if (updates.containsKey("amountDeposited")) {
//                userTrades.setAmountDeposited((Double) updates.get("amountDeposited"));
//            }

            // Update 'trades' list if present in updates
            if (updates.containsKey("trades")) {
                List<UserTrades.Trade> newTrades = objectMapper.convertValue(updates.get("trades"), new TypeReference<List<UserTrades.Trade>>() {});
                userTrades.getTrades().addAll(newTrades);
            }

            return userTradeRepo.save(userTrades);
        }

        return null;
    }

    public UserTrades updateStatusForLastSellTrade(String userId) {
        Optional<UserTrades> userTradesOptional = userTradeRepo.findById(userId);

        if (userTradesOptional.isPresent()) {
            UserTrades userTrades = userTradesOptional.get();
            List<UserTrades.Trade> trades = userTrades.getTrades();

            // Find the last trade with "Sell" as transactionType
            for (int i = trades.size() - 1; i >= 0; i--) {
                UserTrades.Trade trade = trades.get(i);
                if ("Sell".equals(trade.getTransactionType())) {
                    trade.setStatus(true);
                    break; // Stop after updating the last "Sell" trade
                }
            }

            // Save the updated UserTrades entity
            userTradeRepo.save(userTrades);

            return userTrades;
        }

        return null;
    }

//    public UserTrades updateTradeStatus(String userId, boolean newStatus) {
//        UserTrades userTrades = userTradeRepo.findById(userId).orElse(null);
//
//        if (userTrades != null) {
//            List<UserTrades.Trade> trades = userTrades.getTrades();
//
//            // Update the status of all trades
//            for (UserTrades.Trade trade : trades) {
//                trade.setStatus(newStatus);
//            }
//
//            // Save the updated UserTrades entity
//            userTradeRepo.save(userTrades);
//
//            return userTrades;
//        }
//
//        return null;
//    }

    public void deleteById(String userId) {
        userTradeRepo.deleteById(userId);
    }

}
