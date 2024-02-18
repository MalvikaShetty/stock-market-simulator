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

//    @Autowired
//    private UserTradeRepository repo;


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

//    @PostMapping("/addusertrades")
//    public ResponseEntity<String> addUserTrades(
//            @PathVariable Long userId,
//            @RequestBody List<UserTrades> userTradesList) {
//
//        for (UserTrades userTrades : userTradesList) {
//            // Set the userId for each userTrade
////            userTrades.setUserId(userId);
//            userTradesService.saveUserTrade(userTrades);
//        }
//
//        return ResponseEntity.ok("User trades added successfully");
//    }

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


    @PutMapping("/trade/{userId}")
    public ResponseEntity<UserTrades> updateUserTrades(@PathVariable String userId, @RequestBody UserTrades updatedUserTrades) {
        UserTrades existingUserTrades = userTradesService.getUserTradesById(userId);

        if (existingUserTrades != null) {
            // Update the user trades properties based on updatedUserTrades
            existingUserTrades.setUserId(updatedUserTrades.getUserId());
//            existingUserTrades.setAmountDeposited(updatedUserTrades.getAmountDeposited());
            existingUserTrades.setTrades(updatedUserTrades.getTrades());

            // Update other properties as needed
            // existingUserTrades.setProperty(updatedUserTrades.getProperty());

            userTradesService.saveUserTrade(existingUserTrades); // Save the updated user trades

            return ResponseEntity.ok(existingUserTrades);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    @PatchMapping("/updatetrade/{userId}")
//    public ResponseEntity<UserTrades> updateUserTrades(@PathVariable String userId, @RequestBody Map<String, Object> updates) {
//        UserTrades userTrades = userTradesService.updateUserTrades(userId, updates);
//
//        if (userTrades != null) {
//            return ResponseEntity.ok(userTrades);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
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




//    @PatchMapping("/updatetradestatus/{userId}/{tradeId}")
//    public ResponseEntity<UserTrades> updateTradeStatus(
//            @PathVariable String userId,
//            @RequestParam boolean status
//    ) {
//        UserTrades userTrades = userTradesService.updateTradeStatus(userId, status);
//
//        if (userTrades != null) {
//            return ResponseEntity.ok(userTrades);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PatchMapping("/updatesellstatus/{userId}")
    public ResponseEntity<UserTrades> updateStatusForLastSellTrade(@PathVariable String userId) {
        UserTrades updatedUserTrades = userTradesService.updateStatusForLastSellTrade(userId);

        if (updatedUserTrades != null) {
            return ResponseEntity.ok(updatedUserTrades);
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
    public ResponseEntity<String> fetchData() {
        RestTemplate restTemplate = new RestTemplate();

        String apiKey = "1TFBB3MQprW8K7Tsp6T765byKyLokbAZ";
        LocalDate date = LocalDate.now().minusDays(1);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = date.format(formatter);

        String url = "https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/"
                + "2024-02-16?adjusted=true&apiKey=" + apiKey;

        try {
            String responseBody = restTemplate.getForObject(url, String.class);
            return ResponseEntity.ok(responseBody);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred.");
        }
    }

}
