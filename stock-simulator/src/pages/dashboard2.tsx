import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard2 = () => {
  const [userTradesData, setUserTradesData] = useState<any>(null);
  const [portfolioData, setPortfolioData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getPortfolioById("user123")
      .then((data) => {
        console.log("Array:",data.userPortfolio);
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
      .getUserTradeById("user123")
      .then((data) => {
        setUserTradesData(data);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user trade data:", error);
        // setUserTradesData(null);
        // setIsLoading(false);
      });
    }, []);

    function doesStockExistInPortfolio(stockSymbol : any, portfolioData: any) {
      const lowerCaseStockSymbol = stockSymbol.toLowerCase();
      for (const entry of portfolioData) {
        if (entry.stockSymbol.toLowerCase() === lowerCaseStockSymbol) {
          return true;
        }
      }
      return false;
    }

    useEffect(() => {
      async function updatePortfolio() {
        if (userTradesData) {
          const newData: { [key: string]: any } = {};
    
          userTradesData.trades.forEach((trade: any) => {
            const { stockSymbol, quantity, price, date, amountInvested } = trade;
    
            if (!newData[stockSymbol]) {
              newData[stockSymbol] = {
                totalQuantity: quantity,
                totalInvestment: amountInvested,
                totalPrice: price * quantity,
                lastDate: date,
              };
            } else {
              newData[stockSymbol].totalQuantity += quantity;
              newData[stockSymbol].totalInvestment += amountInvested;
              newData[stockSymbol].totalPrice += price * quantity;
              if (new Date(date) > new Date(newData[stockSymbol].lastDate)) {
                newData[stockSymbol].lastDate = date;
              }
            }
          });
    
          for (const stockSymbol of Object.keys(newData)) {
            const aggregatedTrade = newData[stockSymbol];
            const averagePrice =
              aggregatedTrade.totalPrice / aggregatedTrade.totalQuantity;
    
            const updatedTrade = {
              userPortfolio: [
                {
                  stockSymbol: stockSymbol,
                  quantity: aggregatedTrade.totalQuantity,
                  price: parseFloat(averagePrice.toFixed(2)),
                  updateDate: new Date(aggregatedTrade.lastDate).toISOString(),
                },
              ],
            };
    
            const stockExistsInPortfolio = doesStockExistInPortfolio(
              stockSymbol,
              portfolioData
            );
    
            console.log(stockExistsInPortfolio);
            console.log("User portfolio");
    
            if (!stockExistsInPortfolio) {
              try {
                await api.updateUserPortfolioById("user123", updatedTrade);
                console.log("Portfolio entry updated:", updatedTrade);
              } catch (error) {
                console.error("Error updating user trade:", error);
              }
            } else {
              console.log("All exist");
            }
          }
        }
      }
    
      updatePortfolio();
    }, [userTradesData, portfolioData]);
    

  if (isLoading) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      {userTradesData !== null ? (
        <div className="m-4 p-4 border rounded-lg">
          <p className="text-md mb-2">
            Amount Deposited: $ {userTradesData.amountDeposited}
          </p>
          <p className="text-md mb-2">
            Amount Invested Total: $
            {/* {Object.values(aggregatedData).reduce(
            (totalInvestment, userTradesData) =>
              totalInvestment + userTradesData.amountInvested,
            0
          )} */}
          </p>
          <p className="text-md mb-2">
            Amount Can be Withdrawn: $ {userTradesData.amountDeposited}
          </p>
          <p className="text-lg font-semibold mb-2">
            Current Value: "To be added"
          </p>
          <p className="text-lg font-semibold mb-2">
            Unrealized Gain/Loss: ${" "}
            {userTradesData.currentValue - userTradesData.amountDeposited}
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
              {portfolioData.length > 0 ? (
                portfolioData.map((entry: any, index: number) => (
                  <tr key={index}>
                    <td className="border border-green-800 px-4 py-2">
                      {entry.stockSymbol}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      {entry.quantity}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      ${(entry.quantity * entry.price).toFixed(2)}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      ${entry.price.toFixed(2)}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      {/* Calculate gain/loss if needed */}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      {entry.updateDate
                        ? new Date(entry.updateDate).toLocaleDateString()
                        : "N/A"}
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
        <p>Loading data...</p>
      )}
    </>
  );
};

export default Dashboard2;
