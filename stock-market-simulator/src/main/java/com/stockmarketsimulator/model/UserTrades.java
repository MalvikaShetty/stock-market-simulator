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
    private List<Trade> trades;
    private List<Sell> sell;

    @Data
    public static class Trade {
        private String stockSymbol;
        private int quantityBought;
        private Date dateBought;
        private double priceBought;
        private int quantitySold;
        private Date dateSold;
        private double priceSold;
        private double amountInvested;
    }

    @Data
    public static class Sell {
        private String stockSymbol;
        private int quantitySold;
        private Date dateSold;
        private double priceSold;
        private double amountDeinvested;
    }
}
