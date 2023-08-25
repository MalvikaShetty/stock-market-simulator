package com.stockmarketsimulator.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stockmarketsimulator.model.Portfolio;
import com.stockmarketsimulator.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepo;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    public PortfolioService(PortfolioRepository portfolioRepo) {
        this.portfolioRepo = portfolioRepo;
    }

    public void saveUserPortfolio(Portfolio portfolio) {
        portfolioRepo.save(portfolio);
    }

    public Portfolio getPortfolioById(String id) {
        return portfolioRepo.findById(id).orElse(null);
    }


}
