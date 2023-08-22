package com.stockmarketsimulator;

import com.stockmarketsimulator.model.UserTrades;
import com.stockmarketsimulator.repository.UserTradeRepository;
import com.stockmarketsimulator.service.UserTradesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;

@SpringBootApplication
@EnableMongoRepositories
//@ComponentScan(basePackages ="com.stockmarketsimulator.service, com.stockmarketsimulator.model ")
public class StockMarketSimulatorApplication {

//	@Autowired
//	UserTradeRepository userTradeRepo;

	public static void main(String[] args) {

		SpringApplication.run(StockMarketSimulatorApplication.class, args);
//		ApplicationContext context = SpringApplication.run(StockMarketSimulatorApplication.class, args);
//
//		UserTradesService utService = context.getBean(UserTradesService.class);
//
//		UserTrades user1 = new UserTrades();
//		user1.setUserId("Siv");
//		// Create a list of Trade objects
//		List<UserTrades.Trade> tradesList = new ArrayList<>();
//		tradesList.add(new UserTrades.Trade("AAPL", "Apple Inc.", 10, new Date(), 150.00, 5, new Date(), 160.00));
//
//		// Set the trades list to the UserTrades object
//		user1.setTrades(tradesList);
//
//		utService.saveUserTrade(user1);

	}

//	@GetMapping("/stock")
//	public String getStock(Model model){
//		try{
//			Stock stock = YahooFinance.get("AAPL");
//			model.addAttribute("stock", stock);
//		}
//		catch (Exception e) {
//			e.printStackTrace();
//		}
//		return "stock";
//	}

}
