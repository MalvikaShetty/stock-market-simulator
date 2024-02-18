"use strict";
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("../services/api");
var recharts_1 = require("recharts");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var Dashboard = function (_a) {
    var username = _a.username;
    var _b = react_1.useState(null), userTradesData = _b[0], setUserTradesData = _b[1];
    var _c = react_1.useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = react_1.useState([]), stockData = _d[0], setStockData = _d[1];
    var _e = react_1.useState([]), filteredStockData = _e[0], setFilteredStockData = _e[1];
    var InitialAmount = 5000;
    react_1.useEffect(function () {
        api_1["default"]
            .getUserTradeById(username)
            .then(function (data) {
            setUserTradesData(data);
            // setIsLoading(false);
        })["catch"](function (error) {
            console.error("Error fetching user trade data:", error);
            // setUserTradesData(null);
        })["finally"](function () {
            setIsLoading(false);
        });
        api_1["default"]
            .getStocks()
            .then(function (data) {
            setStockData(data.results);
            setFilteredStockData(data.results.slice(0, 12)); // Show first 10 results initially
        })["catch"](function (error) { return console.error("Error fetching data:", error); });
    }, []);
    // Function to get current price for a stock symbol
    var getCurrentPrice = function (symbol) {
        // Check if stockData is empty or undefined
        if (!stockData || stockData.length === 0) {
            return "N/A";
        }
        // Find the stock with the matching symbol
        var stock = stockData.find(function (dataPoint) { return dataPoint.T === symbol; });
        return stock ? stock.o : "N/A";
    };
    // Function to get total unrealized gain/loss of the logged user
    var totalUnrealizedGainLoss = userTradesData && userTradesData.trades
        ? userTradesData.trades.reduce(function (total, trade) {
            if (trade &&
                trade.amountInvested != null &&
                trade.quantity != null) {
                return (total +
                    (trade.quantity * getCurrentPrice(trade.stockSymbol) -
                        trade.amountInvested));
            }
            else {
                return total;
            }
        }, 0)
        : 0;
    if (isLoading) {
        return react_1["default"].createElement("p", null, "Loading data...");
    }
    // Sample data for the pie chart
    var pieData = [
        { name: "Tech", value: 400 },
        { name: "Finance", value: 300 },
        { name: "Energy", value: 300 },
        { name: "Consumer", value: 200 },
    ];
    // Colors for pie chart sectors
    var COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    var barData = [
        { name: "Tech", investment: 12000, "return": 18000 },
        { name: "Finance", investment: 8000, "return": 9500 },
        { name: "Energy", investment: 5000, "return": 6500 },
        { name: "Consumer", investment: 7000, "return": 7300 },
    ];
    var lineData = [
        {
            month: "January",
            Tech: 4000,
            Finance: 3000,
            Energy: 2000,
            Consumer: 2500
        },
        {
            month: "February",
            Tech: 4500,
            Finance: 3200,
            Energy: 2100,
            Consumer: 2600
        },
        { month: "March", Tech: 4700, Finance: 3300, Energy: 2150, Consumer: 2700 },
        { month: "April", Tech: 4800, Finance: 3400, Energy: 2200, Consumer: 2800 },
    ];
    var totalInvestedAmount = 0;
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "bg-black py-2 flex justify-between items-center" },
            react_1["default"].createElement("h2", { className: "ml-4 text-white text-3xl md:text-4xl font-bold mb-4 text-center tracking-wide" }, "Dashboard"),
            react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUser, color: "white", size: "1x", className: "mr-4" })),
        userTradesData !== null ? (react_1["default"].createElement("div", { className: "overflow-hidden p-4" },
            react_1["default"].createElement("div", { className: "mt-2 pt-2" },
                react_1["default"].createElement("div", { className: "flex flex-col md:flex-row justify-between items-start" },
                    react_1["default"].createElement("div", { className: "text-left ml-4" },
                        react_1["default"].createElement("p", { className: "text-md mb-2 font-semibold" },
                            "Amount Invested Total: $",
                            (userTradesData && userTradesData.trades
                                ? userTradesData.trades.reduce(function (total, trade) {
                                    if (trade && trade.amountInvested != null) {
                                        totalInvestedAmount = total + trade.amountInvested;
                                        return totalInvestedAmount;
                                    }
                                    else {
                                        return total;
                                    }
                                }, 0)
                                : 0).toFixed(2)),
                        react_1["default"].createElement("p", { className: "text-md mb-2 font-semibold" },
                            "Total Unrealized Gain/Loss:",
                            " ",
                            react_1["default"].createElement("span", { style: {
                                    color: totalUnrealizedGainLoss < 0 ? "red" : "green"
                                } },
                                "$",
                                totalUnrealizedGainLoss.toFixed(2)))),
                    react_1["default"].createElement("div", { className: "text-right mr-2" },
                        react_1["default"].createElement("p", { className: "text-md mb-2 font-semibold" },
                            "Initial Amount:",
                            " ",
                            react_1["default"].createElement("span", { className: "font-bold" },
                                "$",
                                InitialAmount)),
                        react_1["default"].createElement("p", { className: "text-md font-semibold" },
                            "Current Amount:",
                            " ",
                            react_1["default"].createElement("span", { className: "font-bold" }, InitialAmount - totalInvestedAmount < 0 ? (react_1["default"].createElement("span", { className: "text-red-500 font-bold" }, "Trading not possible. Insufficient funds.")) : (react_1["default"].createElement("span", { className: "font-bold" },
                                "$",
                                (InitialAmount - totalInvestedAmount).toFixed(2))))))),
                react_1["default"].createElement("div", { className: "flex flex-col md:flex-row justify-between gap-4" },
                    react_1["default"].createElement("div", { className: "shadow-lg m-4 p-2 border rounded-lg bg-white flex-auto" },
                        react_1["default"].createElement("h3", { className: "text-2xl font-bold mb-4" }, "Stocks Portfolio"),
                        react_1["default"].createElement("div", { className: "overflow-y-auto", style: { maxHeight: "300px" } },
                            react_1["default"].createElement("table", { className: "min-w-full divide-y divide-gray-200" },
                                react_1["default"].createElement("thead", { className: "bg-gray-50 sticky top-0" },
                                    react_1["default"].createElement("tr", null,
                                        react_1["default"].createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Stock Symbol"),
                                        react_1["default"].createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Quantity"),
                                        react_1["default"].createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Total Amount"),
                                        react_1["default"].createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Average Cost Basis"),
                                        react_1["default"].createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Unrealized Gain/Loss"),
                                        react_1["default"].createElement("th", { scope: "col", className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Last Transaction"))),
                                react_1["default"].createElement("tbody", { className: "bg-white divide-y divide-gray-200" }, userTradesData.trades.length > 0 ? (userTradesData.trades.map(function (entry, index) { return (
                                // Your rows mapping
                                react_1["default"].createElement("tr", { key: index },
                                    react_1["default"].createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, entry && entry.stockSymbol
                                        ? entry.stockSymbol
                                        : ""),
                                    react_1["default"].createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, entry ? entry.quantity : ""),
                                    react_1["default"].createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" },
                                        "$",
                                        entry ? entry.amountInvested.toFixed(2) : ""),
                                    react_1["default"].createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" },
                                        "$",
                                        entry && entry.quantity
                                            ? (entry.amountInvested / entry.quantity).toFixed(2)
                                            : ""),
                                    react_1["default"].createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm " + (entry &&
                                            entry.quantity &&
                                            entry.stockSymbol &&
                                            getCurrentPrice(entry.stockSymbol) !== null
                                            ? entry.quantity *
                                                getCurrentPrice(entry.stockSymbol) -
                                                entry.amountInvested <
                                                0
                                                ? "text-red-600"
                                                : "text-green-600"
                                            : "") }, entry &&
                                        entry.quantity &&
                                        entry.stockSymbol &&
                                        getCurrentPrice(entry.stockSymbol) !== null
                                        ? (entry.quantity *
                                            getCurrentPrice(entry.stockSymbol) -
                                            entry.amountInvested).toFixed(2)
                                        : ""),
                                    react_1["default"].createElement("td", { className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, entry ? entry.date : ""))); })) : (react_1["default"].createElement("tr", null,
                                    react_1["default"].createElement("td", { colSpan: 6, className: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900" }, "No portfolio data available"))))))),
                    react_1["default"].createElement("div", { className: "shadow-lg my-4 p-2 border rounded-lg bg-white flex-auto" },
                        react_1["default"].createElement("h3", { className: "text-2xl font-bold" }, "Pie Chart Portfolio"),
                        react_1["default"].createElement(recharts_1.PieChart, { width: 380, height: 330 },
                            react_1["default"].createElement(recharts_1.Pie, { data: pieData, cx: 200, cy: 150, labelLine: false, outerRadius: 80, fill: "#8884d8", dataKey: "value", label: function (_a) {
                                    var name = _a.name, percent = _a.percent;
                                    return name + " " + (percent * 100).toFixed(0) + "%";
                                } }, pieData.map(function (entry, index) { return (react_1["default"].createElement(recharts_1.Cell, { key: "cell-" + index, fill: COLORS[index % COLORS.length] })); })),
                            react_1["default"].createElement(recharts_1.Tooltip, null),
                            react_1["default"].createElement(recharts_1.Legend, null)))),
                react_1["default"].createElement("div", { className: "flex flex-col md:flex-row justify-between gap-4" },
                    react_1["default"].createElement("div", { className: "shadow-3d m-4 p-4 border rounded-lg bg-white flex-auto" },
                        react_1["default"].createElement("h3", { className: "text-2xl font-bold mb-4" }, "Bar Chart"),
                        react_1["default"].createElement(recharts_1.BarChart, { width: 400, height: 300, data: barData },
                            react_1["default"].createElement(recharts_1.CartesianGrid, { strokeDasharray: "3 3" }),
                            react_1["default"].createElement(recharts_1.XAxis, { dataKey: "name" }),
                            react_1["default"].createElement(recharts_1.YAxis, null),
                            react_1["default"].createElement(recharts_1.Tooltip, null),
                            react_1["default"].createElement(recharts_1.Legend, null),
                            react_1["default"].createElement(recharts_1.Bar, { dataKey: "investment", fill: "#8884d8" }),
                            react_1["default"].createElement(recharts_1.Bar, { dataKey: "return", fill: "#82ca9d" }))),
                    react_1["default"].createElement("div", { className: "shadow-3d m-4 p-4 border rounded-lg bg-white flex-auto" },
                        react_1["default"].createElement("h3", { className: "text-2xl font-bold" }, "Line Chart Portfolio"),
                        react_1["default"].createElement(recharts_1.LineChart, { width: 400, height: 300, data: lineData },
                            react_1["default"].createElement(recharts_1.XAxis, { dataKey: "month" }),
                            react_1["default"].createElement(recharts_1.YAxis, null),
                            react_1["default"].createElement(recharts_1.Tooltip, null),
                            react_1["default"].createElement(recharts_1.Legend, null),
                            react_1["default"].createElement(recharts_1.Line, { type: "monotone", dataKey: "Tech", stroke: "#8884d8" }),
                            react_1["default"].createElement(recharts_1.Line, { type: "monotone", dataKey: "Finance", stroke: "#82ca9d" }),
                            react_1["default"].createElement(recharts_1.Line, { type: "monotone", dataKey: "Energy", stroke: "#ca82a4" }),
                            react_1["default"].createElement(recharts_1.Line, { type: "monotone", dataKey: "Consumer", stroke: "#ccc349" }))))))) : (react_1["default"].createElement("div", { className: "text-center" },
            react_1["default"].createElement("h2", { className: "font-bold text-[40px]" }, "No Data Yet"),
            react_1["default"].createElement("p", null, "Buy some stocks")))));
};
exports["default"] = Dashboard;
