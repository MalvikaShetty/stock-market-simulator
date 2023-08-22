package com.stockmarketsimulator.controller;

import com.stockmarketsimulator.model.UserTrades;
import com.stockmarketsimulator.service.UserTradesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StockController {

//    @Autowired
//    private UserTradeRepository repo;


    private final UserTradesService userTradesService;

    @Autowired
    public StockController(UserTradesService userTradesService) {
        this.userTradesService = userTradesService;
    }

    @PostMapping("/addusertrades")
    public ResponseEntity<String> addUserTrades(@RequestBody List<UserTrades> userTradesList) {
        for (UserTrades userTrades : userTradesList) {
            userTradesService.saveUserTrade(userTrades);
        }
        return ResponseEntity.ok("User trades added successfully");
    }

    @GetMapping("/alltrades")
    public List<UserTrades> getAllUserTrades() {
        return userTradesService.findAllUserTrades();
    }

    @GetMapping("/trade/{userId}")
    public ResponseEntity<UserTrades> getUserTradesById(@PathVariable String userId) {
        UserTrades trade = userTradesService.getUserTradesById(userId);
        if (trade != null) {
            return ResponseEntity.ok(trade);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/trade/{userId}")
    public ResponseEntity<UserTrades> updateUserTrades(@PathVariable String userId, @RequestBody UserTrades updatedUserTrades) {
        UserTrades existingUserTrades = userTradesService.getUserTradesById(userId);

        if (existingUserTrades != null) {
            // Update the user trades properties based on updatedUserTrades
            existingUserTrades.setUserId(updatedUserTrades.getUserId());
            existingUserTrades.setAmountDeposited(updatedUserTrades.getAmountDeposited());
            existingUserTrades.setCurrentValue(updatedUserTrades.getCurrentValue());
            existingUserTrades.setTrades(updatedUserTrades.getTrades());

            // Update other properties as needed
            // existingUserTrades.setProperty(updatedUserTrades.getProperty());

            userTradesService.saveUserTrade(existingUserTrades); // Save the updated user trades

            return ResponseEntity.ok(existingUserTrades);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/trade/{userId}")
    public ResponseEntity<String> deleteUserTradesById(@PathVariable String userId) {
        userTradesService.deleteById(userId);
        return ResponseEntity.ok("User trades deleted successfully");
    }


    @GetMapping("/stock")
    public ResponseEntity<String> fetchData(Model model) {
        RestTemplate restTemplate = new RestTemplate();

        String apiKey = "1TFBB3MQprW8K7Tsp6T765byKyLokbAZ";
        LocalDate date = LocalDate.now().minusDays(3);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = date.format(formatter);

//        LocalDate twoDaysAgo = LocalDate.now().minusDays(2);


        String url = "https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/"
                + formattedDate + "?adjusted=true&apiKey=" + apiKey;

        try {
            String responseBody = restTemplate.getForObject(url, String.class);
            model.addAttribute("data", responseBody);
            return ResponseEntity.ok(responseBody);

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("error", "An error occurred.");
        }

        return null;
    }
}
