package com.stockmarketsimulator.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "portfolio")
public class Portfolio {
    @Id
    private String userId;
    private String stockSymbol;
    private String quantity;
    private double price;
    private Date updateDate;
}
