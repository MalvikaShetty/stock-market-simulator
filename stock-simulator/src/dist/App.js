"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var react_router_dom_1 = require("react-router-dom");
var navigation_1 = require("./components/navigation");
var stockslist_1 = require("./pages/stockslist");
var dashboard_1 = require("./pages/dashboard");
var login_1 = require("./pages/login");
var signup_1 = require("./pages/signup");
var ranksAll_1 = require("./pages/ranksAll");
function App() {
    var _a = react_1.useState(false), isLoggedIn = _a[0], setIsLoggedIn = _a[1];
    var _b = react_1.useState(""), username = _b[0], setUsername = _b[1]; // State to store the username
    var handleLogout = function () {
        // Perform logout logic here (e.g., clear authentication token)
        //  setIsLoggedIn(false);
        //  setUsername(""); // Clear the username state upon logout
    };
    var PAGE_ROUTES = [
        // COMMON PAGES
        {
            name: "Home",
            path: "/",
            component: function () { return (react_1["default"].createElement(dashboard_1["default"], { username: username })); }
        },
        {
            name: "Stocks",
            path: "/stocks",
            component: function () { return (react_1["default"].createElement(stockslist_1["default"], { username: username })); }
        },
        {
            name: "Login",
            path: "/login",
            component: function () { return (react_1["default"].createElement(login_1["default"], { onLogin: function (username) {
                    setUsername(username); // Update the username state
                    setIsLoggedIn(true); // Update the login status
                } })); }
        },
        {
            name: "Sign Up",
            path: "/signup",
            component: signup_1["default"]
        },
        {
            name: "All Users Ranks",
            path: "/ranks",
            component: ranksAll_1["default"]
        },
    ];
    // eslint-disable-next-line no-restricted-globals
    // const showNavigation = !['/login', '/signup'].includes(location.pathname);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_router_dom_1.Routes, null, PAGE_ROUTES.map(function (page) { return (react_1["default"].createElement(react_router_dom_1.Route, { key: "/login", path: "/login", element: react_1["default"].createElement(login_1["default"], { onLogin: function (username) {
                    setUsername(username); // Update the username state
                    setIsLoggedIn(true); // Update the login status
                } }) })); })),
        react_1["default"].createElement("div", { className: "flex" },
            react_1["default"].createElement(navigation_1["default"], { isLoggedIn: isLoggedIn, username: username, onLogout: handleLogout }),
            react_1["default"].createElement(react_router_dom_1.Routes, null, PAGE_ROUTES.map(function (page) { return (react_1["default"].createElement(react_router_dom_1.Route, { key: page.path, path: page.path, element: react_1["default"].createElement(page.component, null) })); })))));
}
exports["default"] = App;
