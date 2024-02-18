"use strict";
exports.__esModule = true;
var react_1 = require("react");
var buyPopup_1 = require("../components/buyPopup");
var api_1 = require("../services/api");
var sellPopup_1 = require("../components/sellPopup");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var StocksList = function (_a) {
    var username = _a.username;
    var _b = react_1.useState([]), stockData = _b[0], setStockData = _b[1];
    var _c = react_1.useState(false), showBuyPopup = _c[0], setShowBuyPopup = _c[1];
    var _d = react_1.useState(false), showSellPopup = _d[0], setShowSellPopup = _d[1];
    var _e = react_1.useState(""), selectedTicker = _e[0], setSelectedTicker = _e[1];
    var _f = react_1.useState(0), selectedPrice = _f[0], setSelectedPrice = _f[1];
    var _g = react_1.useState(0), selectedDate = _g[0], setSelectedDate = _g[1];
    var _h = react_1.useState(""), searchTerm = _h[0], setSearchTerm = _h[1];
    var _j = react_1.useState([]), filteredStockData = _j[0], setFilteredStockData = _j[1];
    react_1.useEffect(function () {
        api_1["default"]
            .getStocks()
            .then(function (data) {
            setStockData(data.results);
            setFilteredStockData(data.results.slice(0, 12)); // Show first 10 results initially
        })["catch"](function (error) { return console.error("Error fetching data:", error); });
    }, []);
    var openPopupBuy = function (ticker, price, date) {
        setSelectedTicker(ticker);
        setSelectedPrice(price);
        setSelectedDate(date);
        setShowBuyPopup(true);
    };
    var openPopupSell = function (ticker, price, date) {
        setSelectedTicker(ticker);
        setSelectedPrice(price);
        setSelectedDate(date);
        setShowSellPopup(true);
    };
    var closePopup = function () {
        setShowBuyPopup(false);
        setShowSellPopup(false);
    };
    var buyStock = function (ticker, date) {
        var _a;
        var price = ((_a = stockData.find(function (dataPoint) { return dataPoint.T === ticker; })) === null || _a === void 0 ? void 0 : _a.c) || 0;
        openPopupBuy(ticker, price, date);
    };
    var sellStock = function (ticker, date) {
        var _a;
        var price = ((_a = stockData.find(function (dataPoint) { return dataPoint.T === ticker; })) === null || _a === void 0 ? void 0 : _a.c) || 0;
        openPopupSell(ticker, price, date);
    };
    var handleSearch = function (term) {
        setSearchTerm(term);
        // Filter stockData based on search term
        var filteredData = stockData.filter(function (dataPoint) {
            return dataPoint.T.toLowerCase().includes(term.toLowerCase());
        });
        setFilteredStockData(filteredData);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "" }, stockData.length === 0 ? (react_1["default"].createElement("p", { className: "text-center mt-10 text-lg p-4" }, "Loading Stocks List...")) : (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "bg-black py-2 flex justify-between items-center w-[1300px]" },
                react_1["default"].createElement("h2", { className: "ml-4 text-white text-3xl md:text-4xl font-bold mb-4 text-center tracking-wide font-cambria" }, "Stocks List"),
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUser, color: "white", size: "1x", className: "mr-4" })),
            react_1["default"].createElement("div", { className: "p-4" },
                showBuyPopup && (react_1["default"].createElement(buyPopup_1["default"], { ticker: selectedTicker, price: selectedPrice, onClose: closePopup, username: username })),
                showSellPopup && (react_1["default"].createElement(sellPopup_1["default"], { ticker: selectedTicker, price: selectedPrice, onClose: closePopup, username: username })),
                react_1["default"].createElement("input", { type: "text", placeholder: "Search by Ticker", value: searchTerm, onChange: function (e) { return handleSearch(e.target.value); }, className: "border-2 rounded-lg p-2 mb-8 mt-4 w-full md:w-[400px] mx-auto block" }),
                filteredStockData !== undefined && filteredStockData.length > 0 ? (react_1["default"].createElement("ul", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 justify-center" }, filteredStockData.map(function (dataPoint, index) { return (react_1["default"].createElement("li", { key: index, className: "p-6 border rounded-lg shadow-md" },
                    react_1["default"].createElement("p", { className: "text-lg font-semibold mb-2" },
                        "Ticker: ",
                        dataPoint.T),
                    react_1["default"].createElement("p", null,
                        "Date: ",
                        new Date(dataPoint.t).toLocaleDateString()),
                    react_1["default"].createElement("p", null,
                        "Open: ",
                        dataPoint.o),
                    react_1["default"].createElement("p", null,
                        "High: ",
                        dataPoint.h),
                    react_1["default"].createElement("p", null,
                        "Low: ",
                        dataPoint.l),
                    react_1["default"].createElement("p", null,
                        "Close: ",
                        dataPoint.c),
                    react_1["default"].createElement("p", null,
                        "Volume: ",
                        dataPoint.v),
                    react_1["default"].createElement("div", { className: "flex justify-around mt-4" },
                        react_1["default"].createElement("button", { onClick: function () { return buyStock(dataPoint.T, dataPoint.t); }, className: "border-1 bg-green-600 text-white px-4 py-2 rounded-lg" }, "Buy"),
                        react_1["default"].createElement("button", { onClick: function () { return sellStock(dataPoint.T, dataPoint.t); }, className: "border-1 bg-red-600 text-white px-4 py-2 rounded-lg" }, "Sell")))); }))) : (react_1["default"].createElement("p", { className: "text-center mt-10 text-lg" }, "No matching stocks found."))))))));
};
exports["default"] = StocksList;
