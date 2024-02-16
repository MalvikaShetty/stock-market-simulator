"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// UserRankingPage.tsx
var react_1 = require("react");
var api_1 = require("../services/api");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var UserRankingPage = function () {
    var _a = react_1.useState([]), users = _a[0], setUsers = _a[1];
    var _b = react_1.useState([]), stockData = _b[0], setStockData = _b[1];
    var _c = react_1.useState([]), filteredStockData = _c[0], setFilteredStockData = _c[1];
    react_1.useEffect(function () {
        var fetchAllUserTrades = function () {
            api_1["default"]
                .getAllTrades()
                .then(function (data) {
                var objectsWithTradesAttribute = data.filter(function (obj) { return obj.trades !== undefined && obj.trades !== null; });
                // const usersWithTrades = response.filter((user: { hasOwnProperty: (arg0: string) => any; }) => user.hasOwnProperty('trades'));
                setUsers(objectsWithTradesAttribute);
                console.log(objectsWithTradesAttribute, "Users with trades");
            })["catch"](function (error) {
                console.error("Error fetching users:", error);
            });
        };
        fetchAllUserTrades();
        api_1["default"]
            .getStocks()
            .then(function (data) {
            setStockData(data.results);
            setFilteredStockData(data.results.slice(0, 12)); // Show first 10 results initially
        })["catch"](function (error) { return console.error("Error fetching data:", error); });
    }, []);
    // Function to get current price for a stock symbol
    var getCurrentPrice = function (symbol) {
        var stock = stockData.find(function (dataPoint) { return dataPoint.T === symbol; });
        return stock ? stock.o : "N/A";
    };
    // Function to calculate the total unrealized gain/loss for a user
    var calculateTotalUnrealizedGainLoss = function (trades) {
        return trades.reduce(function (total, trade) {
            return (total +
                (trade.quantity * getCurrentPrice(trade.stockSymbol) -
                    trade.amountInvested));
        }, 0);
    };
    // Function to rank users based on their total unrealized gain/loss
    var rankUsers = function () {
        // Copy the users array to avoid mutating the state directly
        var rankedUsers = __spreadArrays(users);
        // Calculate total unrealized gain/loss for each user and add it to the user object
        rankedUsers.forEach(function (user) {
            user.totalUnrealizedGainLoss = calculateTotalUnrealizedGainLoss(user.trades);
        });
        // Sort the users based on their total unrealized gain/loss
        rankedUsers.sort(function (a, b) { return b.totalUnrealizedGainLoss - a.totalUnrealizedGainLoss; });
        // Assign ranks to the sorted users
        rankedUsers.forEach(function (user, index) {
            user.rank = index + 1;
        });
        return rankedUsers;
    };
    var rankedUsers = rankUsers();
    return (react_1["default"].createElement("div", { className: "container" },
        react_1["default"].createElement("div", { className: "bg-black py-2 flex justify-between items-center w-full" },
            react_1["default"].createElement("h2", { className: "ml-4 text-white text-3xl md:text-4xl font-bold mb-4 text-center tracking-wide font-cambria" }, "Ranks of All Users"),
            react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUser, color: "white", size: "1x", className: "mr-4" })),
        react_1["default"].createElement("div", { className: "mx-auto p-4" },
            react_1["default"].createElement("h1", { className: "text-3xl font-semibold mb-4" }, "User Ranking"),
            react_1["default"].createElement("table", { className: "w-full table-auto border-collapse border border-gray-300" },
                react_1["default"].createElement("thead", null,
                    react_1["default"].createElement("tr", { className: "bg-gray-200" },
                        react_1["default"].createElement("th", { className: "px-4 py-2" }, "Rank"),
                        react_1["default"].createElement("th", { className: "px-4 py-2" }, "User ID"),
                        react_1["default"].createElement("th", { className: "px-4 py-2" }, "Total Unrealized Gain/Loss"))),
                react_1["default"].createElement("tbody", null, rankedUsers.map(function (user, index) { return (react_1["default"].createElement("tr", { key: user.userId, className: "border-t border-gray-300" },
                    react_1["default"].createElement("td", { className: "py-2 pl-16" }, user.rank),
                    react_1["default"].createElement("td", { className: "py-2 pl-[10%]" }, user.userId),
                    react_1["default"].createElement("td", { className: "py-2 pl-[24%]" },
                        "$",
                        user.totalUnrealizedGainLoss.toFixed(2)))); }))))));
};
exports["default"] = UserRankingPage;
