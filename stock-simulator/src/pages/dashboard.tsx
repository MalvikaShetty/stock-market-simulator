import React, { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [userTradesData, setUserTradesData] = useState<any>(null);
  const [stockData, setStockData] = useState<Array<any>>([]);
  const [portfolioData, setPortfolioData] = useState<Array<any>>([]);
  const [filteredStocks, setFilteredStocks] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .getStocks()
      .then((data) => {
        setStockData(data.results);
      })
      .catch((error) => console.error("Error fetching stock data:", error));
  }, []);

  useEffect(() => {
    api
      .getUserTradeById("user123")
      .then((data) => {
        setUserTradesData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user trade data:", error);
        setUserTradesData(null);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    api
      .getPortfolioById("user123")
      .then((data) => {
        setPortfolioData(data.userPortfolio);
      })
      .catch((error) => console.error("Error fetching portfolio data:", error));
  }, []);

  useEffect(() => {
    if (userTradesData) {
      const newData: { [key: string]: any } = {};
      const tickersToFilter: string[] = [];

      userTradesData.trades.forEach((trade: any) => {
        const { stockSymbol, quantity, price, date, amountInvested } = trade;

        if (!newData[stockSymbol]) {
          newData[stockSymbol] = {
            totalQuantity: quantity,
            totalInvestment: amountInvested,
            totalPrice: price * quantity,
            lastDate: date,
          };
          tickersToFilter.push(stockSymbol);
        } else {
          newData[stockSymbol].totalQuantity += quantity;
          newData[stockSymbol].totalInvestment += amountInvested;
          newData[stockSymbol].totalPrice += price * quantity;
          if (new Date(date) > new Date(newData[stockSymbol].lastDate)) {
            newData[stockSymbol].lastDate = date;
          }
        }
      });

      // setAggregatedData(newData);

      const filteredStockData = stockData
        .filter((stock) => tickersToFilter.includes(stock.T))
        .map((stock) => ({
          ticker: stock.T,
          closingValue: stock.c,
        }));

      setFilteredStocks(filteredStockData);

      Object.keys(newData).forEach((stockSymbol) => {
        const aggregatedTrade = newData[stockSymbol];
        const averagePrice =
          aggregatedTrade.totalPrice / aggregatedTrade.totalQuantity;

        // Check if the stock symbol exists in portfolioData
        // const stockExistsInPortfolio = portfolioData.some((entry:any) =>
        //   entry.userPortfolio.some((item: { stockSymbol: string; }) => item.stockSymbol === stockSymbol)
        // );
        const stockExistsInPortfolio =
          portfolioData &&
          portfolioData.some(
            (entry: any) =>
              entry.userPortfolio &&
              entry.userPortfolio.some(
                (item: { stockSymbol: string }) =>
                  item.stockSymbol === stockSymbol
              )
          );

        const updatedTrade = {
          userPortfolio: [
            {
              stockSymbol: stockSymbol,
              quantity: aggregatedTrade.totalQuantity,
              price: averagePrice.toFixed(2),
              date: new Date(aggregatedTrade.lastDate).toLocaleDateString(),
            },
          ],
        };

        if (stockExistsInPortfolio) {
          // Update portfolio entry
          api
            .updateUserTradeById("user123", updatedTrade)
            .then(() => {
              console.log("Portfolio entry updated:", stockSymbol);
            })
            .catch((error) => {
              console.error("Error updating user trade:", error);
            });
        } else {
          // Add new portfolio entry
          api
            .postUserPortfolio({
              userId: "user123",
              userPortfolio: [updatedTrade.userPortfolio[0]],
            })
            .then(() => {
              console.log("New portfolio entry added:", stockSymbol);
            })
            .catch((error) => {
              console.error("Error adding new portfolio entry:", error);
            });
        }
      });
    }
  }, [userTradesData, portfolioData, stockData]);

  return (
    <>
      {userTradesData !== null && portfolioData !== undefined ? (
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

export default Dashboard;


//  {/* {portfolioData.length > 0 ? ( */}
//  {
//   portfolioData.map((entry: any, index: any) => {
//     //Find the matching stock data from filteredStocks
//     const matchingStock = filteredStocks.find(
//       (stock) =>
//         stock.ticker === entry.userPortfolio[0].stockSymbol
//     );

//     let gainLoss: number = 0;

//     if (matchingStock) {
//       // console.log(matchingStock.closingValue);
//       gainLoss =
//         matchingStock.closingValue *
//           entry.userPortfolio[0].quantity -
//         entry.userPortfolio[0].quantity *
//           entry.userPortfolio[0].price; // Default value if matching stock not found
//       console.log(gainLoss + " wow");
//     }

//     // Calculate gain/loss based on the closing value and total investment

//     return (
//       <tr key={index}>
//         <td className="border border-green-800 px-4 py-2">
//           {/* {entry.userPortfolio[0].stockSymbol} */}
//           {entry.userPortfolio && entry.userPortfolio[0]
//             ? entry.userPortfolio[0].stockSymbol
//             : "N/A"}
//         </td>
//         <td className="border border-green-800 px-4 py-2">
//           {entry.userPortfolio && entry.userPortfolio[0]
//             ? entry.userPortfolio[0].quantity
//             : "N/A"}
//         </td>
//         <td className="border border-green-800 px-4 py-2">
//           ${" "}
//           {(
//             entry.userPortfolio?.[0]?.quantity *
//               entry.userPortfolio?.[0]?.price || 0
//           ).toFixed(2)}
//         </td>
//         <td className="border border-green-800 px-4 py-2">
//           $ {(entry.userPortfolio?.[0]?.price || 0).toFixed(2)}
//         </td>
//         <td className="border border-green-800 px-4 py-2">
//           ${gainLoss.toFixed(2)}
//         </td>
//         <td className="border border-green-800 px-4 py-2">
//           {entry.userPortfolio &&
//           entry.userPortfolio[0] &&
//           entry.userPortfolio[0].updatedDate
//             ? new Date(
//                 entry.userPortfolio[0].updatedDate
//               ).toLocaleDateString()
//             : "N/A"}
//         </td>
//       </tr>
//     );
//   })
//   // ): (
//   //   <tr>
//   //     <td colSpan={6}>No portfolio data available.</td>
//   //   </tr>
//   // )
// }