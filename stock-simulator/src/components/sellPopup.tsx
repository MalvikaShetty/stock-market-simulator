import React, { useEffect, useState } from "react";
import api from "../services/api"; // Import your api module

interface PopupProps {
  ticker: string;
  price: number;
  onClose: () => void;
  username: string;
}

const SellPopup: React.FC<PopupProps> = ({ ticker, price, onClose, username }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [portfolioData, setPortfolioData] = useState<any>(null);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };
  //Call Portfolio API to check the amount if it exceeds later
  // useEffect(() => {
  //   api
  //     .getUserTradeById(username)
  //     .then((data) => {
  //       setPortfolioData(data);
  //       const totalAmount = (price * quantity) + (data.price * data.quantity);
    
  //       // Check if the total amount exceeds the amount deposited
  //       if (totalAmount > data.amountDeposited) {
  //         console.error("Insufficient funds to buy.");
  //         return;
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setPortfolioData(null);
  //     });
  // }, [price, quantity]);

  const formattedDate = new Date().toLocaleDateString("en-US");
  const totalAmountPrice = price * quantity;

  const handleSellClick = async () => {
    try {
  
        const existingPortfolioStatus = await api.getUserTradeStatusById(username);
        console.log(existingPortfolioStatus, "existingPortfolioStatus")
  
        if (existingPortfolioStatus === true) {
          // Portfolio exists, update trades
          const existingPortfolioData = await api.getUserTradeById(username);
          const updatedTrades = existingPortfolioData.trades.map((trade : any) => {
              if (trade.stockSymbol === ticker) {
                  // If the stockSymbol matches, update the trade
                  return {
                      ...trade,
                      quantity: trade.quantity - quantity,
                      amountInvested: trade.amountInvested - (quantity * price),
                  };
              } else {
                  // Otherwise, keep the trade unchanged
                  return trade;
              }
          });
      
          const response = await api.updateUserTradeById(username, updatedTrades);
          console.log("Response from PATCH request:", response);
      } else {
            // Portfolio doesn't exist, create new
            
            console.log("Cannot process");
          
        }
  
        onClose();
    } catch (error) {
        console.error("Error updating user trades:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Sell {ticker}</h2>
        <p>Current Price: {price}</p>
        <input
          type="number"
          placeholder="Quantity"
          className="mt-2 p-2 border"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <p>Total Amount: {totalAmountPrice}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-lg"
            onClick={handleSellClick}
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellPopup;
