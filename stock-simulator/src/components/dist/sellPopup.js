"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var api_1 = require("../services/api"); // Import your api module
var react_router_dom_1 = require("react-router-dom");
var SellPopup = function (_a) {
    var ticker = _a.ticker, price = _a.price, onClose = _a.onClose, username = _a.username;
    var _b = react_1.useState(1), quantity = _b[0], setQuantity = _b[1];
    var navigate = react_router_dom_1.useNavigate();
    var handleQuantityChange = function (event) {
        var newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
    };
    var formattedDate = new Date().toLocaleDateString("en-US");
    var totalAmountPrice = price * quantity;
    var handleSellClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var existingPortfolioStatus, existingPortfolioData, updatedTrades, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, api_1["default"].getUserTradeStatusById(username)];
                case 1:
                    existingPortfolioStatus = _a.sent();
                    if (!(existingPortfolioStatus === true)) return [3 /*break*/, 4];
                    return [4 /*yield*/, api_1["default"].getUserTradeById(username)];
                case 2:
                    existingPortfolioData = _a.sent();
                    updatedTrades = existingPortfolioData.trades.map(function (trade) {
                        if (trade.stockSymbol === ticker) {
                            // If the stockSymbol matches, update the trade
                            return __assign(__assign({}, trade), { date: new Date(formattedDate).toISOString(), quantity: trade.quantity - quantity, amountInvested: trade.amountInvested - quantity * price });
                        }
                        else {
                            // Otherwise, keep the trade unchanged
                            return trade;
                        }
                    });
                    return [4 /*yield*/, api_1["default"].updateUserTradeById(username, updatedTrades)];
                case 3:
                    response = _a.sent();
                    console.log("Response from PATCH request:", response);
                    return [3 /*break*/, 5];
                case 4:
                    // Portfolio doesn't exist, create new
                    console.log("Cannot process");
                    _a.label = 5;
                case 5:
                    onClose();
                    navigate('/home');
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Error updating user trades:", error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50" },
        react_1["default"].createElement("div", { className: "bg-white p-6 rounded-lg" },
            react_1["default"].createElement("h2", { className: "text-lg font-semibold mb-2" },
                "Sell ",
                ticker),
            react_1["default"].createElement("p", null,
                "Current Price: ",
                price),
            react_1["default"].createElement("input", { type: "number", placeholder: "Quantity", className: "mt-2 p-2 border", value: quantity, onChange: handleQuantityChange }),
            react_1["default"].createElement("p", null,
                "Total Amount: ",
                totalAmountPrice),
            react_1["default"].createElement("div", { className: "mt-4 flex justify-end" },
                react_1["default"].createElement("button", { className: "mr-2 px-4 py-2 bg-gray-300 rounded-lg", onClick: onClose }, "Cancel"),
                react_1["default"].createElement("button", { className: "px-4 py-2 bg-black text-white rounded-lg", onClick: handleSellClick }, "Sell")))));
};
exports["default"] = SellPopup;
