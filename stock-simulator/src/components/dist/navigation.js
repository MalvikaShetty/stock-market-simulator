"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Navigation = function (_a) {
    // const navigate = useNavigate(); 
    var isLoggedIn = _a.isLoggedIn, username = _a.username, onLogout = _a.onLogout;
    var handleLogout = function () {
        if (onLogout) {
            onLogout(); // Check if onLogout is defined before invoking it
        }
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("nav", { className: "bg-black text-white p-4 flex space-x-8" }, isLoggedIn && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "p-4 border rounded-lg" },
                react_1["default"].createElement("p", { className: "text-lg font-semibold" },
                    "Welcome, ",
                    username,
                    "!")),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/", className: "text-lg hover:text-blue-500 transition duration-300 mt-4" }, "Dashboard"),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/stocks", className: "text-lg hover:text-blue-500 transition duration-300 mt-4" }, "Stocks List"),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/ranks", className: "text-lg hover:text-blue-500 transition duration-300 mt-4" }, "All Users Ranks"),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", className: "text-lg hover:text-blue-500 transition duration-300 mt-4", onClick: handleLogout }, "Logout")))),
        !isLoggedIn && (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "flex justify-center mt-4" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", className: "text-lg hover:text-blue-500 transition duration-300" }, "Login"),
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/signup", className: "text-lg hover:text-blue-500 transition duration-300 ml-4" }, "Sign Up"))))));
};
exports["default"] = Navigation;
