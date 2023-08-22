package com.stockmarketsimulator.repository;

import com.stockmarketsimulator.model.UserTrades;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserTradeRepository extends MongoRepository<UserTrades, String> {

}

