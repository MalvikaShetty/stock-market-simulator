package com.stockmarketsimulator.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Document(collection = "user_trades")
public class UserTrades {
    @Id
    private String userId;
    private List<Trade> trades;

    @Data
    public static class Trade {
        private String tradeId  = UUID.randomUUID().toString();;
        private String stockSymbol;
        private String transactionType;
        private int quantity;
        private Date date;
        private double price;
        private double amountInvested;
        private boolean status;
    }
}
