package com.stockmarketsimulator.service;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class StockAPI {
    public static void main(String[] args) {
        OkHttpClient client = new OkHttpClient();

        String apiKey = "1TFBB3MQprW8K7Tsp6T765byKyLokbAZ";
        String symbol = "AAPL"; // Replace with desired stock symbol

        String url = "https://api.polygon.io/v2/aggs/ticker/" + symbol + "/range/1/day/2022-01-01/2022-01-10?apiKey=" + apiKey;

        Request request = new Request.Builder()
                .url(url)
                .build();

        try {
            Response response = client.newCall(request).execute();
            if (response.isSuccessful()) {
                System.out.println(response.body().string());
            } else {
                System.out.println("Request failed with code: " + response.code());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
