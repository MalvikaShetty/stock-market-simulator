import React, { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from 'react-router-dom';

interface PopupProps {
  ticker: string;
  price: number;
  onClose: () => void;
  username: string;
  // currentAmount?: number;
}

const BuyPopup: React.FC<PopupProps> = ({ ticker, price, onClose, username }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [checkedForTicker, setcheckedForTicker] = useState(false);
  let checkedforticker = false;
  let foundticker = false;
  const navigate = useNavigate();

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantity(newQuantity);
  };
  let totalAmountPrice = 0; // Initialize totalAmountPrice with 0

  if (quantity !== 0) {
    totalAmountPrice = price * quantity; // Calculate total amount price only if quantity is not 0
  }

  const formattedDate = new Date().toLocaleDateString("en-US");

// Inside handleBuyClick function
const handleBuyClick = async () => {
  try {
      const existingPortfolioStatus = await api.getUserTradeStatusById(username);

      if (existingPortfolioStatus === true) {
        // Portfolio exists, update trades
        const existingPortfolioData = await api.getUserTradeById(username);
        let updatedTrades;
        if(existingPortfolioData.trades.length === 0){
          updatedTrades = [
            ...existingPortfolioData.trades,
            {
                stockSymbol: ticker,
                transactionType: "Buy",
                quantity: quantity,
                date: new Date(formattedDate).toISOString(), // Convert date to ISO string
                price: price,
                amountInvested: quantity * price,
                status: true
            }
          ];
        }else{
          console.log(checkedforticker, "first check");
          if(checkedforticker === false && foundticker === false){
            checkedforticker = true;
            // setcheckedForTicker(true);
            const updatedTradesCopy = existingPortfolioData.trades.map((trade: any) => {
              if (trade.stockSymbol === ticker) {
                  foundticker = true;
                  // Update the trade details
                  return {
                      ...trade,
                      date: new Date(formattedDate).toISOString(),
                      quantity: trade.quantity + quantity,
                      price: (trade.amountInvested + quantity * price) / (trade.quantity + quantity),
                      amountInvested: trade.amountInvested + (quantity * price),
                  };
              }
              return trade;
          });
          updatedTrades = updatedTradesCopy;
          } 
          if(checkedforticker === true && foundticker === false){
            const newTrade = {
                stockSymbol: ticker,
                transactionType: "Buy",
                quantity: quantity,
                date: new Date(formattedDate).toISOString(),
                price: price,
                amountInvested: quantity * price,
                status: true
            };
            updatedTrades = [...existingPortfolioData.trades, newTrade]; 
              setcheckedForTicker(false);
              checkedforticker = false;
            } 
            foundticker = false;
    }  
      // Now updatedTrades contains either the updated trade or includes a new trade
      const response = await api.updateUserTradeById(username, updatedTrades);
      console.log("Response from PATCH request:", response);
    }
  
    else {
          // Portfolio doesn't exist, create new
          const data = {
              userId: username,
              trades: [
                  {
                      stockSymbol: ticker,
                      transactionType: "Buy",
                      quantity: quantity,
                      date: new Date(formattedDate).toISOString(), // Convert date to ISO string
                      price: price,
                      amountInvested: quantity * price,
                      status: true
                  }
              ]
          };
          const response = await api.postUserTrades(data);
          console.log("Response from POST request:", response);
      }
      onClose();
      navigate('/home');
  } catch (error) {
      console.error("Error updating user trades:", error);
      navigate('/home');
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Buy {ticker}</h2>
        <p>Current Price: {price}</p>
        <input
          type="number"
          placeholder="Quantity"
          className="mt-2 p-2 border"
          value={quantity}
          onChange={handleQuantityChange}
        />
        <p>Total Price: {totalAmountPrice.toFixed(2)} </p>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-lg"
            onClick={handleBuyClick}

          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyPopup;
function setPortfolioData(userPortfolio: any) {
  throw new Error("Function not implemented.");
}

