package com.stockmarketsimulator.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "user_trades")
public class UserTrades {
    @Id
    private String userId;
    private double amountDeposited;
    private double currentValue;
    private List<Trade> trades;

    @Data
    public static class Trade {
        private String stockSymbol;
        private String stockName;
        private int quantityBought;
        private Date dateBought;
        private double priceBought;
        private int quantitySold;
        private Date dateSold;
        private double priceSold;
    }
}
