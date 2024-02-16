"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var NavigationItem = function (_a) {
    var to = _a.to, icon = _a.icon, label = _a.label;
    var location = react_router_dom_1.useLocation();
    var isActive = location.pathname === to;
    return (react_1["default"].createElement(react_router_dom_1.Link, { to: to, className: "flex items-center px-4 py-2.5 rounded transition duration-200 " + (isActive ? 'bg-gray-300 text-gray-900' : 'text-gray-600 hover:bg-gray-200') },
        react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: icon, className: "h-5 w-5 mr-2" }),
        label));
};
var Navigation = function (_a) {
    var isLoggedIn = _a.isLoggedIn, username = _a.username, onLogout = _a.onLogout;
    var handleLogout = function () {
        if (onLogout) {
            onLogout();
        }
    };
    return (react_1["default"].createElement("div", { className: "bg-gray-100 text-gray-900 w-64 space-y-12 py-7 px-2 fixed inset-y-0 left-0 transform -translate-x-full sm:relative sm:translate-x-0 transition duration-200 ease-in-out min-h-screen" },
        react_1["default"].createElement("div", { className: "text-gray-900 flex items-center space-x-2 px-4" },
            react_1["default"].createElement("span", { className: "text-2xl font-bold" }, "Your Brand")),
        react_1["default"].createElement("nav", null, isLoggedIn ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "p-4 bg-gray-200 mb-5 rounded-lg" },
                react_1["default"].createElement("p", { className: "text-lg font-semibold" },
                    "Welcome, ",
                    username,
                    "!")),
            react_1["default"].createElement(NavigationItem, { to: "/", icon: free_solid_svg_icons_1.faHome, label: "Dashboard" }),
            react_1["default"].createElement(NavigationItem, { to: "/stocks", icon: free_solid_svg_icons_1.faList, label: "Stocks List" }),
            react_1["default"].createElement(NavigationItem, { to: "/ranks", icon: free_solid_svg_icons_1.faUsers, label: "All Users Ranks" }),
            react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", className: "flex items-center px-4 py-2.5 rounded transition duration-200 text-gray-600 hover:bg-gray-200", onClick: onLogout },
                react_1["default"].createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSignInAlt, className: "h-5 w-5 mr-2" }),
                "Logout"))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(NavigationItem, { to: "/login", icon: free_solid_svg_icons_1.faSignInAlt, label: "Login" }),
            react_1["default"].createElement(NavigationItem, { to: "/signup", icon: free_solid_svg_icons_1.faUserPlus, label: "Sign Up" }))))));
};
exports["default"] = Navigation;
