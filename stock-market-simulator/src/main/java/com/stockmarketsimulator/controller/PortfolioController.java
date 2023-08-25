package com.stockmarketsimulator.controller;

import com.stockmarketsimulator.model.Portfolio;
import com.stockmarketsimulator.service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PortfolioController {


    private final PortfolioService portfolioService;

    @Autowired
    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @PostMapping("/adduserportfolio")
    public ResponseEntity<String> addUserTrades(@RequestBody List<Portfolio> portfolioList) {
        for (Portfolio port : portfolioList) {
            portfolioService.saveUserPortfolio(port);
        }
        return ResponseEntity.ok("User trades added successfully");
    }

    @GetMapping("/portfolio/{userId}")
    public ResponseEntity<Portfolio> getUserTradesById(@PathVariable String userId) {
        Portfolio port = portfolioService.getPortfolioById(userId);
        if (port != null) {
            return ResponseEntity.ok(port);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
