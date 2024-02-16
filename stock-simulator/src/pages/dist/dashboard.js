"use strict";
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("../services/api");
var Dashboard = function (_a) {
    var username = _a.username;
    var _b = react_1.useState(null), userTradesData = _b[0], setUserTradesData = _b[1];
    var _c = react_1.useState([]), stockData = _c[0], setStockData = _c[1];
    var _d = react_1.useState([]), portfolioData = _d[0], setPortfolioData = _d[1];
    var _e = react_1.useState([]), filteredStocks = _e[0], setFilteredStocks = _e[1];
    var _f = react_1.useState(true), isLoading = _f[0], setIsLoading = _f[1];
    react_1.useEffect(function () {
        api_1["default"]
            .getStocks()
            .then(function (data) {
            setStockData(data.results);
        })["catch"](function (error) { return console.error("Error fetching stock data:", error); });
    }, []);
    react_1.useEffect(function () {
        api_1["default"]
            .getUserTradeById(username)
            .then(function (data) {
            setUserTradesData(data);
            setIsLoading(false);
        })["catch"](function (error) {
            console.error("Error fetching user trade data:", error);
            setUserTradesData(null);
            setIsLoading(false);
        });
    }, []);
    react_1.useEffect(function () {
        api_1["default"]
            .getPortfolioById("user123")
            .then(function (data) {
            setPortfolioData(data.userPortfolio);
        })["catch"](function (error) { return console.error("Error fetching portfolio data:", error); });
    }, []);
    react_1.useEffect(function () {
        if (userTradesData) {
            var newData_1 = {};
            var tickersToFilter_1 = [];
            userTradesData.trades.forEach(function (trade) {
                var stockSymbol = trade.stockSymbol, quantity = trade.quantity, price = trade.price, date = trade.date, amountInvested = trade.amountInvested, transactionType = trade.transactionType;
                if (!newData_1[stockSymbol]) {
                    newData_1[stockSymbol] = {
                        totalQuantity: transactionType === "Sell" ? -quantity : quantity,
                        totalInvestment: transactionType === "Sell" ? -amountInvested : amountInvested,
                        totalPrice: price * quantity,
                        lastDate: date
                    };
                    tickersToFilter_1.push(stockSymbol);
                }
                else {
                    if (transactionType === "Buy") {
                        newData_1[stockSymbol].totalQuantity += quantity;
                        newData_1[stockSymbol].totalInvestment += amountInvested;
                    }
                    else if (transactionType === "Sell") {
                        newData_1[stockSymbol].totalQuantity -= quantity;
                        newData_1[stockSymbol].totalInvestment -= amountInvested;
                    }
                    newData_1[stockSymbol].totalPrice += price * quantity;
                    if (new Date(date) > new Date(newData_1[stockSymbol].lastDate)) {
                        newData_1[stockSymbol].lastDate = date;
                    }
                }
            });
            // setAggregatedData(newData);
            var filteredStockData = stockData
                .filter(function (stock) { return tickersToFilter_1.includes(stock.T); })
                .map(function (stock) { return ({
                ticker: stock.T,
                closingValue: stock.c
            }); });
            setFilteredStocks(filteredStockData);
            Object.keys(newData_1).forEach(function (stockSymbol) {
                var aggregatedTrade = newData_1[stockSymbol];
                var averagePrice = aggregatedTrade.totalPrice / aggregatedTrade.totalQuantity;
                // Check if the stock symbol exists in portfolioData
                // const stockExistsInPortfolio = portfolioData.some((entry:any) =>
                //   entry.userPortfolio.some((item: { stockSymbol: string; }) => item.stockSymbol === stockSymbol)
                // );
                var stockExistsInPortfolio = portfolioData &&
                    portfolioData.some(function (entry) {
                        return entry.userPortfolio &&
                            entry.userPortfolio.some(function (item) {
                                return item.stockSymbol === stockSymbol;
                            });
                    });
                var updatedTrade = {
                    userPortfolio: [
                        {
                            stockSymbol: stockSymbol,
                            quantity: aggregatedTrade.totalQuantity,
                            price: averagePrice.toFixed(2),
                            date: new Date(aggregatedTrade.lastDate).toLocaleDateString()
                        },
                    ]
                };
                if (stockExistsInPortfolio) {
                    // Update portfolio entry
                    api_1["default"]
                        .updateUserTradeById(username, updatedTrade)
                        .then(function () {
                        console.log("Portfolio entry updated:", stockSymbol);
                    })["catch"](function (error) {
                        console.error("Error updating user trade:", error);
                    });
                }
                else {
                    // Add new portfolio entry
                    api_1["default"]
                        .postUserTrades(updatedTrade.userPortfolio[0])
                        .then(function () {
                        console.log("New portfolio entry added:", stockSymbol);
                    })["catch"](function (error) {
                        console.error("Error adding new portfolio entry:", error);
                    });
                }
            });
        }
    }, [userTradesData, portfolioData, stockData]);
    return (react_1["default"].createElement(react_1["default"].Fragment, null, userTradesData !== null && portfolioData !== undefined ? (react_1["default"].createElement("div", { className: "m-4 p-4 border rounded-lg" },
        react_1["default"].createElement("p", { className: "text-md mb-2" },
            "Amount Deposited: $ ",
            userTradesData.amountDeposited),
        react_1["default"].createElement("p", { className: "text-md mb-2" }, "Amount Invested Total: $"),
        react_1["default"].createElement("p", { className: "text-md mb-2" },
            "Amount Can be Withdrawn: $ ",
            userTradesData.amountDeposited),
        react_1["default"].createElement("p", { className: "text-lg font-semibold mb-2" }, "Current Value: \"To be added\""),
        react_1["default"].createElement("p", { className: "text-lg font-semibold mb-2" },
            "Unrealized Gain/Loss: $",
            " ",
            userTradesData.currentValue - userTradesData.amountDeposited),
        react_1["default"].createElement("table", { className: "border-collapse border border-green-800" },
            react_1["default"].createElement("thead", null,
                react_1["default"].createElement("tr", { className: "bg-green-300" },
                    react_1["default"].createElement("th", { className: "border border-green-800 px-4 py-2" }, "Stock Symbol"),
                    react_1["default"].createElement("th", { className: "border border-green-800 px-4 py-2" }, "Quantity"),
                    react_1["default"].createElement("th", { className: "border border-green-800 px-4 py-2" }, "Total Amount"),
                    react_1["default"].createElement("th", { className: "border border-green-800 px-4 py-2" }, "Average Cost Basis"),
                    react_1["default"].createElement("th", { className: "border border-green-800 px-4 py-2" }, "Unrealized Gain/Loss"),
                    react_1["default"].createElement("th", { className: "border border-green-800 px-4 py-2" }, "Date Bought"))),
            react_1["default"].createElement("tbody", null, portfolioData.length > 0 ? (portfolioData.map(function (entry, index) { return (react_1["default"].createElement("tr", { key: index },
                react_1["default"].createElement("td", { className: "border border-green-800 px-4 py-2" }, entry.stockSymbol),
                react_1["default"].createElement("td", { className: "border border-green-800 px-4 py-2" }, entry.quantity),
                react_1["default"].createElement("td", { className: "border border-green-800 px-4 py-2" },
                    "$",
                    (entry.quantity * entry.price).toFixed(2)),
                react_1["default"].createElement("td", { className: "border border-green-800 px-4 py-2" },
                    "$",
                    entry.price.toFixed(2)),
                react_1["default"].createElement("td", { className: "border border-green-800 px-4 py-2" }),
                react_1["default"].createElement("td", { className: "border border-green-800 px-4 py-2" }, entry.updateDate
                    ? new Date(entry.updateDate).toLocaleDateString()
                    : "N/A"))); })) : (react_1["default"].createElement("tr", null,
                react_1["default"].createElement("td", { colSpan: 6 }, "No portfolio data available"))))))) : (react_1["default"].createElement("p", null, "Loading data..."))));
};
exports["default"] = Dashboard;
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
