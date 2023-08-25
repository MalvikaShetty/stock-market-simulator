import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [userTradesData, setUserTradesData] = useState<any>(null);
  const [aggregatedData, setAggregatedData] = useState<{ [key: string]: any }>(
    {}
  );
  const [stockData, setStockData] = useState<Array<any>>([]);
  const [filteredStocks, setFilteredStocks] = useState<Array<any>>([]);
  const [portfolioData, setPortfolioData] = useState<Array<any>>([]);


  useEffect(() => {
    api
      .getStocks()
      .then((data) => {
        setStockData(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // const id = "user123";
    api
      .getUserTradeById("user123")
      .then((data) => {
        setUserTradesData(data); // Set the whole user object directly
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setUserTradesData(null); // Set to null in case of error
      });
  }, []);

  const calculateTotalCurrentValue = () => {
    return userTradesData.trades.reduce(
      (total: any, trade: { currentValue: any }) => total + trade.currentValue,
      0
    );
  };

  useEffect(() => {
    if (userTradesData) {
      const newData: { [key: string]: any } = {}; // Initialize a new data object
      const tickersToFilter: string[] = [];

      // Loop through each trade in the userTradesData
      userTradesData.trades.forEach((trade: any) => {
        const { stockSymbol, quantity, price, date, amountInvested } = trade;

        if (!newData[stockSymbol]) {
          newData[stockSymbol] = {
            totalQuantity: quantity,
            totalInvestment: amountInvested,
            totalprice: price * quantity,
            lastdate: date,
          };
          tickersToFilter.push(stockSymbol);
        } else {
          newData[stockSymbol].totalQuantity += quantity;
          newData[stockSymbol].totalInvestment += amountInvested;
          newData[stockSymbol].totalprice += price * quantity;
          if (new Date(date) > new Date(newData[stockSymbol].lastdate)) {
            newData[stockSymbol].lastdate = date;
          }
        }

        // Filter stockData based on tickersToFilter and get the closing Value
        const filteredStockData = stockData
          .filter((stock) => tickersToFilter.includes(stock.T))
          .map((stock) => ({
            ticker: stock.T,
            closingValue: stock.c,
          }));

        // Loop through the aggregated data to create portfolio entries
        Object.keys(newData).forEach(async (stockSymbol) => {
          const aggregatedTrade = newData[stockSymbol];
          const averageprice =
            aggregatedTrade.totalprice / aggregatedTrade.totalQuantity;

          const newPortfolioEntry = {
            userId: "user123",
            stockSymbol: stockSymbol,
            quantity: aggregatedTrade.totalQuantity,
            price: averageprice.toFixed(2),
            date: new Date(aggregatedTrade.lastdate).toLocaleDateString(),
          };

          try {
            const addedData = await api.postUserPortfolio(newPortfolioEntry);
            console.log("Updated data:", addedData);
          } catch (error) {
            console.error("Error updating user trades:", error);
          }
        });

        // Update the filteredStocks state with the filtered stock data
        setFilteredStocks(filteredStockData);
      });

      //Calculate gain/loss based on the current value from the stockLists API

      // Update the aggregatedData state with the new aggregated data
      setAggregatedData(newData);
    }
  }, [userTradesData]);


  useEffect(() => {
    api
      .getPortfolioById("user123")
      .then((data) => {
        setPortfolioData(data.results);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <>
      {userTradesData !== null ? (
        <div className="m-4 p-4 border rounded-lg">
          <p className="text-md mb-2">
            Amount Deposited: $ {userTradesData.amountDeposited}
          </p>
          <p className="text-md mb-2">
            Amount Invested Total: $
            {Object.values(aggregatedData).reduce(
              (totalInvestment, stockData) =>
                totalInvestment + stockData.totalInvestment,
              0
            )}
          </p>
          <p className="text-md mb-2">
            Amount Can be Withdrawn: $ {userTradesData.amountDeposited}
          </p>
          <p className="text-lg font-semibold mb-2">
            Current Value: ${calculateTotalCurrentValue()}
          </p>
          <p className="text-lg font-semibold mb-2">
            Unrealized Gain/Loss: ${" "}
            {userTradesData.currentValue - userTradesData.amountDeposited}
          </p>
          {/* Other user properties can be displayed here */}
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
              {portfolioData.map((entry,index) => {

                // Find the matching stock data from filteredStocks
                const matchingStock = filteredStocks.find(
                  (stock) => stock.ticker === entry.stockSymbol
                );

                if (matchingStock) {
                  console.log(matchingStock.closingValue); // Debugging output
                }

                // Calculate gain/loss based on the closing value and total investment
                const gainLoss = matchingStock
                  ? matchingStock.closingValue * entry.quantity -
                    entry.quantity * entry.price
                  : 0; // Default value if matching stock not found

                return (
                  <tr key={index}>
                    <td className="border border-green-800 px-4 py-2">
                      {entry.stockSymbol}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      {entry.quantity}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      $ {entry.quantity * entry.price}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      $ {entry.price.toFixed(2)}
                    </td>
                    {/* <td className="border border-green-800 px-4 py-2">{((filteredStocks * aggregatedTrade.totalQuantity)-aggregatedTrade.totalInvestment).toFixed(2)}</td> */}
                    <td className="border border-green-800 px-4 py-2">
                      ${gainLoss.toFixed(2)}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      {new Date(entry.updatedDate).toLocaleDateString()}
                    </td>

                    <td colSpan={2}></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      {/* {userTradesData !== null ? (
        <div className="m-4 p-4 border rounded-lg">
          <p className="text-lg font-semibold mb-2">Sold Stocks</p>
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
                  Realized Gain/Loss
                </th>
                <th className="border border-green-800 px-4 py-2">Date Sold</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(aggregatedData).map((stockSymbol: string) => {
                const aggregatedTrade = aggregatedData[stockSymbol];
                const averageprice =
                  aggregatedTrade.totalprice / aggregatedTrade.totalQuantity;

                // Find the matching stock data from filteredStocks
                const matchingStock = filteredStocks.find(
                  (stock) => stock.ticker === stockSymbol
                );

                if (matchingStock) {
                  console.log(matchingStock.closingValue); // Debugging output
                }

                // Calculate gain/loss based on the closing value and total investment
                const gainLoss = matchingStock
                  ? matchingStock.closingValue * aggregatedTrade.totalQuantity -
                    aggregatedTrade.totalInvestment
                  : 0; // Default value if matching stock not found

                return (
                  <tr key={stockSymbol}>
                    <td className="border border-green-800 px-4 py-2">
                      {stockSymbol}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      {aggregatedTrade.totalQuantity}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      $ {aggregatedTrade.totalInvestment}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      $ {averageprice.toFixed(2)}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      ${gainLoss.toFixed(2)}
                    </td>
                    <td className="border border-green-800 px-4 py-2">
                      {new Date(aggregatedTrade.lastdate).toLocaleDateString()}
                    </td>

                    <td colSpan={2}></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading data...</p>
      )} */}
    </>
  );
};

export default Dashboard;
