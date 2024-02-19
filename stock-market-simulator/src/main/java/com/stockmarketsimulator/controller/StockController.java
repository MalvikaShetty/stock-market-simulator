package com.stockmarketsimulator.controller;

import com.stockmarketsimulator.model.User;
import com.stockmarketsimulator.model.UserTrades;
import com.stockmarketsimulator.service.UserTradesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class StockController {

    private final UserTradesService userTradesService;

    @Autowired
    public StockController(UserTradesService userTradesService) {
        this.userTradesService = userTradesService;
    }

    @PostMapping("/addusertrades")
    public ResponseEntity<String> addUserTrades(@RequestBody UserTrades userTrades) {
        String userId = userTrades.getUserId();
        List<UserTrades.Trade> trades = userTrades.getTrades();
        userTradesService.saveUserTrade(userTrades);
        return ResponseEntity.ok("User trades added successfully");
    }

    @GetMapping("/alltrades")
    public List<UserTrades> getAllUserTrades() {
        return userTradesService.findAllUserTrades();
    }

    @GetMapping("/gettrade/{userId}")
    public ResponseEntity<UserTrades> getUserTradesById(@PathVariable String userId) {
        UserTrades trade = userTradesService.getUserTradesById(userId);
        if (trade != null) {
            return ResponseEntity.ok(trade);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/gettradestatus/{userId}")
    public ResponseEntity<Boolean> getUserTradesStatusById(@PathVariable String userId) {
        UserTrades trade = userTradesService.getUserTradesById(userId);
        if (trade != null) {
            // Return true if trades are found
            return ResponseEntity.ok(true);
        } else {
            // Return false if trades are not found
            return ResponseEntity.ok(false);
        }
    }

    @PatchMapping("/updatetrade/{userId}")
    public ResponseEntity<UserTrades> updateUserTrades(@PathVariable String userId, @RequestBody List<UserTrades.Trade> trades) {
        // Check if the user's portfolio exists
        Optional<UserTrades> existingPortfolio = Optional.ofNullable(userTradesService.getUserTradesById(userId));
        if (existingPortfolio.isPresent()) {
            // Portfolio exists, update the trades
            UserTrades userTrades = existingPortfolio.get();

            // Clear existing trades and add new trades
            userTrades.setTrades(trades);

            // Save the updated user trades
            UserTrades updatedUserTrades = userTradesService.saveUserTrade(userTrades);
            return ResponseEntity.ok(updatedUserTrades);
        } else {
            // Portfolio doesn't exist, return not found response or handle accordingly
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/trade/{userId}")
    public ResponseEntity<String> deleteUserTradesById(@PathVariable String userId) {
        userTradesService.deleteById(userId);
        return ResponseEntity.ok("User trades deleted successfully");
    }

    @GetMapping("/stock")
    public ResponseEntity<String> fetchData() {
        RestTemplate restTemplate = new RestTemplate();

        String apiKey = "your key";
        LocalDate date = LocalDate.now().minusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = date.format(formatter);

        String url = "https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/" + formattedDate + "?adjusted=true&apiKey=" + apiKey;

        try {
            String responseBody = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

}
