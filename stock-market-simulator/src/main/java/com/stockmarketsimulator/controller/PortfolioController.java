package com.stockmarketsimulator.controller;

import com.stockmarketsimulator.model.Portfolio;
import com.stockmarketsimulator.model.UserTrades;
import com.stockmarketsimulator.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class PortfolioController {


    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

//    @PostMapping("/adduserportfolio")
//    public ResponseEntity<String> addUserTrades(@RequestBody List<Portfolio> portfolioList) {
//        for (Portfolio port : portfolioList) {
//            portfolioService.saveUserPortfolio(port);
//        }
//        return ResponseEntity.ok("User trades added successfully");
//    }
//@PostMapping("/adduserportfolio")
//public ResponseEntity<String> addUserTrades(@RequestBody Portfolio portfolio) {
//    portfolioService.saveUserPortfolio(portfolio);
//
//    return ResponseEntity.ok("User trade added successfully");
//}

//    @PostMapping("/adduserportfolio")
//    public ResponseEntity<String> addUserTrades(@RequestBody List<Portfolio> portfolioList) {
//        List<Portfolio> existingPortfolios = new ArrayList<>();
//
//        for (Portfolio port : portfolioList) {
//            existingPortfolios.add(port);
//        }
//
//        portfolioService.saveUserPortfolio((Portfolio) existingPortfolios);
//
//        return ResponseEntity.ok("User trades added successfully");
//    }

//    @GetMapping("/portfolio/{userId}")
//    public ResponseEntity<List<Portfolio>> getUserPortfoliosById(@PathVariable String userId) {
//        List<Portfolio> portfolios = portfolioService.getPortfoliosByUserId(userId);
//        if (!portfolios.isEmpty()) {
//            return ResponseEntity.ok(portfolios);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

//    @PostMapping("/adduserportfolio")
//    public ResponseEntity<String> addUserTrades(@RequestBody Portfolio portfolio) {
//        portfolioService.saveUserPortfolio(portfolio);
//
//        return ResponseEntity.ok("User trade added successfully");
//    }
//
//    @GetMapping("/getallportfolios")
//    public ResponseEntity<List<Portfolio>> getAllPortfolios() {
//        List<Portfolio> portfolios = portfolioService.getSavedPortfolios();
//        if (!portfolios.isEmpty()) {
//            return ResponseEntity.ok(portfolios);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @GetMapping("/getportfoliosbyuserid/{userId}")
//    public ResponseEntity<List<Portfolio>> getPortfoliosByUserId(@PathVariable String userId) {
//        List<Portfolio> portfolios = portfolioService.getPortfoliosByUserId(userId);
//        if (!portfolios.isEmpty()) {
//            return ResponseEntity.ok(portfolios);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @PostMapping("/adduserportfolio")
    public ResponseEntity<Portfolio> addPortfolio(@RequestBody Portfolio portfolio){
        Portfolio savedPortfolio = portfolioService.savePortfolio(portfolio);
        return ResponseEntity.ok(savedPortfolio);
    }

    @DeleteMapping("/deluserportfolio/{userId}")
    public ResponseEntity<String> deletePortfolioByUserId(@PathVariable String userId) {
        portfolioService.deletePortfolioByUserId(userId);
        return ResponseEntity.ok("Portfolio deleted successfully");
    }

    @GetMapping("/getportfoliosbyuserid/{userId}")
    public ResponseEntity<Portfolio> getPortfoliosByUserId(@PathVariable String userId) {
        Portfolio portfolios = portfolioService.getPortfoliosByUserId(userId);
        if (portfolios != null) {
            return ResponseEntity.ok(portfolios);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PatchMapping("/updateportfolio/{userId}")
    public ResponseEntity<Portfolio> updatePortfolio(
            @PathVariable String userId,
//            @RequestBody Portfolio.UserPortfolio updatedPortfolio
             @RequestBody Map<String, Object> updatedPortfolio
    ) {
        Portfolio updated = portfolioService.updatePortfolio(userId,  updatedPortfolio);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/updateportfolio/{userId}/{stockSymbol}")
    public ResponseEntity<Portfolio> partiallyUpdateUserPortfolio(
            @PathVariable String userId,
            @PathVariable String stockSymbol,
            @RequestParam(name = "quantity") int newQuantity,
            @RequestParam(name = "updateDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date newUpdateDate
    ) {
        Portfolio updatedPortfolio = portfolioService.partiallyUpdateUserPortfolio(userId, stockSymbol, newQuantity, newUpdateDate);

        if (updatedPortfolio != null) {
            return ResponseEntity.ok(updatedPortfolio);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
