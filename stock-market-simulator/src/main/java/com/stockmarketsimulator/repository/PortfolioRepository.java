package com.stockmarketsimulator.repository;

import com.stockmarketsimulator.model.Portfolio;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends MongoRepository<Portfolio, String>{
    Portfolio findByUserId(String userId);

    void deleteByUserId(String userId);
}

