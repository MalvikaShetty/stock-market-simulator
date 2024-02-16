import React, { useEffect, useRef, useState } from "react";
import api from "../services/api";

interface DashboardProps {
  username? : string;
}

const Dashboard2: React.FC<DashboardProps> = ({ username }) => {
  const [userTradesData, setUserTradesData] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<any>([]);
  let sellUpdatedTrade : any;
  const soldStocksRef = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stockData, setStockData] = useState<Array<any>>([]);
  const [filteredStockData, setFilteredStockData] = useState<Array<any>>([]);

  useEffect(() => {
    api
      .getUserTradeById(username)
      .then((data) => {
        console.log("Array:", data.userPortfolio);
        setPortfolioData(data.userPortfolio);
        // setIsLoading(false);
      })  
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
        // setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // }, [portfolioData]);

    // useEffect(() => {
    api
      .getUserTradeById(username)
      .then((data) => {
        setUserTradesData(data);
        console.log(data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user trade data:", error);
        // setUserTradesData(null);
        // setIsLoading(false);
      });

      api
      .getStocks()
      .then((data) => {
        setStockData(data.results);
        setFilteredStockData(data.results.slice(0, 12)); // Show first 10 results initially
      })
      .catch((error) => console.error("Error fetching data:", error));

      // const totalUnrealizedGainLoss = userTradesData.trades.reduce((total: number, trade: { amountInvested: number; quantity: number; stockSymbol: any; }) => {
      //   return total + (trade.amountInvested - (trade.quantity * getCurrentPrice(trade.stockSymbol)));
      // }, 0)  || 0;

      
  }, []);


    // Function to get current price for a stock symbol
    const getCurrentPrice = (symbol: any) => {
      const stock = stockData.find((dataPoint) => dataPoint.T === symbol);
      return stock ? stock.o : "N/A";
    };

    const totalUnrealizedGainLoss = userTradesData && userTradesData.trades ? userTradesData.trades.reduce((total: number, trade: { amountInvested: number; quantity: number; stockSymbol: any; }) => {
      return total + ((trade.quantity * getCurrentPrice(trade.stockSymbol)) - trade.amountInvested);
    }, 0) : 0;
    

  if (isLoading) {
    return <p>Loading data...</p>;
  }


  return (
    <>
      {userTradesData !== null ? (
        <div className="m-4 p-4 border rounded-lg">
          <p className="text-md mb-2">
            Amount Invested Total: $ 
            {userTradesData.trades.reduce(
            (total: number, trade: any) => total + trade.amountInvested, 0)}
          </p>
          {/* <p className="text-md mb-2">
            Amount Can be Withdrawn: $
          </p> */}
          <p className="text-lg font-semibold mb-2">
            {/* Current Value: "To be added" */}
          </p>
          <p className="text-lg font-semibold mb-2">
            Total Unrealized Gain/Loss: <span style={{ color: totalUnrealizedGainLoss < 0 ? 'red' : 'green' }}>
              ${(totalUnrealizedGainLoss).toFixed(2)}
            </span>
          </p>
          <table className="border-collapse border border-green-800">
            <thead>
              <tr className="bg-green-300">
                <th className="border border-green-800 px-4 py-2">
                  Stock Symbol
                </th>
                <th className="border border-green-800 px-4 py-2">Quantity</th>
                <th className="border border-green-800 px-4 py-2">
                  Total Amount
                </th>
                <th className="border border-green-800 px-4 py-2">
                  Average Cost Basis
                </th>
                <th className="border border-green-800 px-4 py-2">
                  Unrealized Gain/Loss
                </th>
                <th className="border border-green-800 px-4 py-2">
                  Date Bought
                </th>
              </tr>
            </thead>
            <tbody>
              {userTradesData.trades.length > 0 ? (
                userTradesData.trades.map((entry: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-green-800 px-4 py-2">
                      {entry.stockSymbol}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      {entry.quantity}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      ${(entry.amountInvested).toFixed(2)}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      ${((entry.amountInvested) / entry.quantity).toFixed(2)}
                    </td>
                    <td className={`border border-green-800 px-4 py-2 ${(entry.quantity * getCurrentPrice(entry.stockSymbol)-entry.amountInvested ) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {/* Calculate gain/loss */}
                      ${((entry.quantity * getCurrentPrice(entry.stockSymbol)- entry.amountInvested)).toFixed(2)}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      {entry.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6}>No portfolio data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No Data Yet</p>
      )}
    </>
  );
};

export default Dashboard2;
