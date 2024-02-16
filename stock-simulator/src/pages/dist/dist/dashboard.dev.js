"use strict";

exports.__esModule = true;

var react_1 = require("react");

var api_1 = require("../services/api");

var Dashboard = function Dashboard(_a) {
  var username = _a.username;

  var _b = react_1.useState(null),
      userTradesData = _b[0],
      setUserTradesData = _b[1];

  var _c = react_1.useState([]),
      portfolioData = _c[0],
      setPortfolioData = _c[1];

  var sellUpdatedTrade;
  var soldStocksRef = react_1.useRef(false);

  var _d = react_1.useState(true),
      isLoading = _d[0],
      setIsLoading = _d[1];

  var _e = react_1.useState([]),
      stockData = _e[0],
      setStockData = _e[1];

  var _f = react_1.useState([]),
      filteredStockData = _f[0],
      setFilteredStockData = _f[1];

  react_1.useEffect(function () {
    api_1["default"].getUserTradeById(username).then(function (data) {
      console.log("Array:", data.userPortfolio);
      setPortfolioData(data.userPortfolio); // setIsLoading(false);
    })["catch"](function (error) {
      console.error("Error fetching portfolio data:", error); // setIsLoading(false);
    })["finally"](function () {
      setIsLoading(false);
    }); // }, [portfolioData]);
    // useEffect(() => {

    api_1["default"].getUserTradeById(username).then(function (data) {
      setUserTradesData(data);
      console.log(data); // setIsLoading(false);
    })["catch"](function (error) {
      console.error("Error fetching user trade data:", error); // setUserTradesData(null);
      // setIsLoading(false);
    });
    api_1["default"].getStocks().then(function (data) {
      setStockData(data.results);
      setFilteredStockData(data.results.slice(0, 12)); // Show first 10 results initially
    })["catch"](function (error) {
      return console.error("Error fetching data:", error);
    }); // const totalUnrealizedGainLoss = userTradesData.trades.reduce((total: number, trade: { amountInvested: number; quantity: number; stockSymbol: any; }) => {
    //   return total + (trade.amountInvested - (trade.quantity * getCurrentPrice(trade.stockSymbol)));
    // }, 0)  || 0;
  }, []); // Function to get current price for a stock symbol

  var getCurrentPrice = function getCurrentPrice(symbol) {
    var stock = stockData.find(function (dataPoint) {
      return dataPoint.T === symbol;
    });
    return stock ? stock.c : "N/A";
  };

  var totalUnrealizedGainLoss = userTradesData && userTradesData.trades ? userTradesData.trades.reduce(function (total, trade) {
    return total + (trade.quantity * getCurrentPrice(trade.stockSymbol) - trade.amountInvested);
  }, 0) : 0;

  if (isLoading) {
    return react_1["default"].createElement("p", null, "Loading data...");
  }

  return react_1["default"].createElement(react_1["default"].Fragment, null, userTradesData !== null ? react_1["default"].createElement("div", {
    className: "m-4 p-4 border rounded-lg"
  }, react_1["default"].createElement("p", {
    className: "text-md mb-2"
  }, "Amount Invested Total: $", userTradesData.trades.reduce(function (total, trade) {
    return total + trade.amountInvested;
  }, 0)), react_1["default"].createElement("p", {
    className: "text-lg font-semibold mb-2"
  }), react_1["default"].createElement("p", {
    className: "text-lg font-semibold mb-2"
  }, "Total Unrealized Gain/Loss: ", react_1["default"].createElement("span", {
    style: {
      color: totalUnrealizedGainLoss < 0 ? 'red' : 'green'
    }
  }, "$", totalUnrealizedGainLoss.toFixed(2))), react_1["default"].createElement("table", {
    className: "border-collapse border border-green-800"
  }, react_1["default"].createElement("thead", null, react_1["default"].createElement("tr", {
    className: "bg-green-300"
  }, react_1["default"].createElement("th", {
    className: "border border-green-800 px-4 py-2"
  }, "Stock Symbol"), react_1["default"].createElement("th", {
    className: "border border-green-800 px-4 py-2"
  }, "Quantity"), react_1["default"].createElement("th", {
    className: "border border-green-800 px-4 py-2"
  }, "Total Amount"), react_1["default"].createElement("th", {
    className: "border border-green-800 px-4 py-2"
  }, "Average Cost Basis"), react_1["default"].createElement("th", {
    className: "border border-green-800 px-4 py-2"
  }, "Unrealized Gain/Loss"), react_1["default"].createElement("th", {
    className: "border border-green-800 px-4 py-2"
  }, "Date Bought"))), react_1["default"].createElement("tbody", null, userTradesData.trades.length > 0 ? userTradesData.trades.map(function (entry, index) {
    return react_1["default"].createElement("tr", {
      key: index
    }, react_1["default"].createElement("td", {
      className: "border border-green-800 px-4 py-2"
    }, entry.stockSymbol), react_1["default"].createElement("td", {
      className: "border border-green-800 px-4 py-2"
    }, entry.quantity), react_1["default"].createElement("td", {
      className: "border border-green-800 px-4 py-2"
    }, "$", entry.amountInvested.toFixed(2)), react_1["default"].createElement("td", {
      className: "border border-green-800 px-4 py-2"
    }, "$", (entry.amountInvested / entry.quantity).toFixed(2)), react_1["default"].createElement("td", {
      className: "border border-green-800 px-4 py-2 " + (entry.quantity * getCurrentPrice(entry.stockSymbol) - entry.amountInvested < 0 ? 'text-red-500' : 'text-green-500')
    }, "$", (entry.quantity * getCurrentPrice(entry.stockSymbol) - entry.amountInvested).toFixed(2)), react_1["default"].createElement("td", {
      className: "border border-green-800 px-4 py-2"
    }, entry.date));
  }) : react_1["default"].createElement("tr", null, react_1["default"].createElement("td", {
    colSpan: 6
  }, "No portfolio data available"))))) : react_1["default"].createElement("h2", null, "No Data Yet"));
};

exports["default"] = Dashboard;