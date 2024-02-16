package com.stockmarketsimulator.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "portfolio")
public class Portfolio {
    @Id
    private String userId;
    private List<UserPortfolio> userPortfolio;
    @Data
    public static class UserPortfolio {
        private String stockSymbol;
        private int quantity;
        private double price;
        private Date updateDate;
    }
}