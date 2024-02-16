package com.stockmarketsimulator.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.stockmarketsimulator.model.Portfolio;
import com.stockmarketsimulator.model.UserTrades;
import com.stockmarketsimulator.repository.PortfolioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepo;
    @Autowired
    private ObjectMapper objectMapper;

//    private final List<Portfolio> savedPortfolios = new ArrayList<>();
//
//    @Autowired
//    public PortfolioService(PortfolioRepository portfolioRepo) {
//        this.portfolioRepo = portfolioRepo;
//    }
//
//    public void saveUserPortfolio(Portfolio portfolio) {
//        savedPortfolios.add(portfolio);
//        portfolioRepo.save(portfolio);
//    }
//
//    public List<Portfolio> getSavedPortfolios() {
//        return savedPortfolios;
//    }

//    public List<Portfolio> getPortfoliosByUserId(String userId) {
//        return portfolioRepo.findByUserId(userId);
//    }

    @Autowired
    public PortfolioService(PortfolioRepository portfolioRepo) {
        this.portfolioRepo = portfolioRepo;
    }

    public Portfolio savePortfolio(Portfolio portfolio) {
        return portfolioRepo.save(portfolio);
    }
    public void deletePortfolioByUserId(String userId) {
        portfolioRepo.deleteByUserId(userId);
    }

    public Portfolio getPortfoliosByUserId(String userId) {
        return portfolioRepo.findByUserId(userId);
    }

//    public Portfolio updatePortfolio(String userId, Portfolio.UserPortfolio updatedPortfolio) {
//        Portfolio existingPortfolio = portfolioRepo.findByUserId(userId).orElse(null);;
//        if (existingPortfolio != null) {
//            List<Portfolio.UserPortfolio> userPortfolioList = existingPortfolio.getUserPortfolio();
//            for (Portfolio.UserPortfolio portfolio : userPortfolioList) {
//                if (portfolio.getStockSymbol().equals(updatedPortfolio.getStockSymbol())) {
//                    // Update the properties you want to change
//                    portfolio.setQuantity(updatedPortfolio.getQuantity());
//                    portfolio.setPrice(updatedPortfolio.getPrice());
//                    portfolio.setUpdateDate(updatedPortfolio.getUpdateDate());
//                    break; // Assuming stock symbols are unique
//                }
//            }
//            existingPortfolio.setUserPortfolio(userPortfolioList);
//            return portfolioRepo.save(existingPortfolio);
//        }
//        return null;
//    }

//    public Portfolio updatePortfolio(String userId, Map<String, Object> updates) {
//        Portfolio portfolio = portfolioRepo.findById(userId).orElse(null);
//
//        if (portfolio != null) {
//            // Update 'userPortfolio' list if present in updates
//            if (updates.containsKey("userPortfolio")) {
//                List<Portfolio.UserPortfolio> newUserPortfolios = objectMapper.convertValue(updates.get("userPortfolio"), new TypeReference<List<Portfolio.UserPortfolio>>() {});
//                portfolio.getUserPortfolio().addAll(newUserPortfolios);
//            }
//
//            return portfolioRepo.save(portfolio);
//        }
//        return null;
//    }

//    public Portfolio updatePortfolio(String userId, Map<String, Object> updates) {
//        Portfolio portfolio = portfolioRepo.findByUserId(userId);
//
//        if (portfolio != null) {
//            if (updates.containsKey("userPortfolio")) {
//                List<Portfolio.UserPortfolio> newUserPortfolios = objectMapper.convertValue(updates.get("userPortfolio"), new TypeReference<List<Portfolio.UserPortfolio>>() {});
//                portfolio.getUserPortfolio().addAll(newUserPortfolios);
//            }
//
//            // Update other properties if needed
//
//            return portfolioRepo.save(portfolio);
//        }
//        return null;
//    }

    public Portfolio updatePortfolio(String userId, Map<String, Object> updates) {
        Portfolio portfolio = portfolioRepo.findByUserId(userId);

        if (portfolio != null) {
            if (updates.containsKey("userPortfolio")) {
                List<Map<String, Object>> newUserPortfolios = (List<Map<String, Object>>) updates.get("userPortfolio");

                List<Portfolio.UserPortfolio> updatedUserPortfolios = new ArrayList<>();

                for (Map<String, Object> portfolioData : newUserPortfolios) {
                    Portfolio.UserPortfolio newUserPortfolio = new Portfolio.UserPortfolio();
                    newUserPortfolio.setStockSymbol((String) portfolioData.get("stockSymbol"));
                    newUserPortfolio.setQuantity((Integer) portfolioData.get("quantity"));
                    newUserPortfolio.setPrice((Double) portfolioData.get("price"));
                    String updateDateStr = (String) portfolioData.get("updateDate");
                    try {
                        Date updateDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX").parse(updateDateStr);
                        newUserPortfolio.setUpdateDate(updateDate);
                    } catch (ParseException e) {
                        e.printStackTrace();
                        // Handle parsing exception
                    }

                    updatedUserPortfolios.add(newUserPortfolio);
                }

                portfolio.getUserPortfolio().addAll(updatedUserPortfolios);
            }

            // Update other properties if needed

            return portfolioRepo.save(portfolio);
        }
        return null;
    }

    public Portfolio partiallyUpdateUserPortfolio(String userId, String stockSymbol, int newQuantity, Date newUpdateDate) {
        Optional<Portfolio> portfolioOptional = Optional.ofNullable(portfolioRepo.findByUserId(userId));

        if (portfolioOptional.isPresent()) {
            Portfolio portfolio = portfolioOptional.get();

            // Find the userPortfolio entry with the matching stock symbol
            Optional<Portfolio.UserPortfolio> userPortfolioOptional = portfolio.getUserPortfolio().stream()
                    .filter(entry -> entry.getStockSymbol().equals(stockSymbol))
                    .findFirst();

            if (userPortfolioOptional.isPresent()) {
                Portfolio.UserPortfolio userPortfolio = userPortfolioOptional.get();

                // Update the fields
                userPortfolio.setQuantity(newQuantity);
                userPortfolio.setUpdateDate(newUpdateDate);

                // Save the updated portfolio
                return portfolioRepo.save(portfolio);
            }
        }
        // Portfolio not found or userPortfolio not found, handle accordingly
        return null;
    }



}
