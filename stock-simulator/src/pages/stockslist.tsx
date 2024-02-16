import React, { useState, useEffect } from "react";
import BuyPopup from "../components/buyPopup";
import api from "../services/api";
import SellPopup from "../components/sellPopup";

interface DashboardProps {
  username : string;
}

const StocksList: React.FC<DashboardProps> = ({ username }) => {
  const [stockData, setStockData] = useState<Array<any>>([]);
  const [showBuyPopup, setShowBuyPopup] = useState(false);
  const [showSellPopup, setShowSellPopup] = useState(false);
  const [selectedTicker, setSelectedTicker] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStockData, setFilteredStockData] = useState<Array<any>>([]);

  useEffect(() => {
    api
      .getStocks()
      .then((data) => {
        setStockData(data.results);
        setFilteredStockData(data.results.slice(0, 12)); // Show first 10 results initially
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const openPopupBuy = (ticker: any, price: any, date: any) => {
    setSelectedTicker(ticker);
    setSelectedPrice(price);
    setSelectedDate(date);
    setShowBuyPopup(true);
  };

  const openPopupSell = (ticker: any, price: any, date: any) => {
    setSelectedTicker(ticker);
    setSelectedPrice(price);
    setSelectedDate(date);
    setShowSellPopup(true);
  };

  const closePopup = () => {
    setShowBuyPopup(false);
    setShowSellPopup(false);
  };

  const buyStock = (ticker: any, date: any) => {
    const price = stockData.find((dataPoint) => dataPoint.T === ticker)?.c || 0;
    openPopupBuy(ticker, price, date);
  };

  const sellStock = (ticker: any, date: any) => {
    const price = stockData.find((dataPoint) => dataPoint.T === ticker)?.c || 0;
    openPopupSell(ticker, price, date);
  };

  const handleBuy = () => {
    // Logic to handle buying the stock with the selected quantity
    closePopup();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    // Filter stockData based on search term
    const filteredData = stockData.filter((dataPoint) =>
      dataPoint.T.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredStockData(filteredData);
  };

  return (
    <div>
      {stockData.length === 0 ? (
        <p className="text-center m-10 text-[40px]">Loading Stocks List...</p>
      ) : (
        <>
          <h1 className="text-2xl font-semibold mb-4 text-center">Stocks List</h1>
          {showBuyPopup && (
            <BuyPopup
              ticker={selectedTicker}
              price={selectedPrice}
              onClose={closePopup}
              username={username}
            />
          )}
           {showSellPopup && (
            <SellPopup
              ticker={selectedTicker}
              price={selectedPrice}
              onClose={closePopup}
              id={username}
            />
          )}
          <input
            type="text"
            placeholder="Search by Ticker"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="border-2 rounded-lg p-2 mb-4 ml-[36%] w-[400px]"
          />
          <ul className="flex flex-wrap">
            {filteredStockData.map((dataPoint, index) => (
              <li key={index} className="ml-16 mb-8 p-10 border-2 rounded-lg w-[300px] text-center">
                <p className="text-lg font-semibold mb-2">Ticker: {dataPoint.T}</p>
                <p>Date: {new Date(dataPoint.t).toLocaleDateString()}</p>
                <p>Open: {dataPoint.o}</p>
                <p>High: {dataPoint.h}</p>
                <p>Low: {dataPoint.l}</p>
                <p>Close: {dataPoint.c}</p>
                <p>Volume: {dataPoint.v}</p>
                <div className="flex justify-around mt-4">
                  <button
                    onClick={() => buyStock(dataPoint.T, dataPoint.t)}
                    className="border-1 bg-green-600 text-white px-4 py-2 rounded-lg"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => sellStock(dataPoint.T, dataPoint.t)}
                    className="border-1 bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Sell
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default StocksList;
