package com.stockmarketsimulator.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "user_trades")
public class User {
    @Id
    private String userId;
    private String username;
    private String password;
}
