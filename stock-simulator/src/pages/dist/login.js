"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var Login = function (_a) {
    var onLogin = _a.onLogin;
    var _b = react_1.useState(""), username = _b[0], setUsername = _b[1];
    var _c = react_1.useState(false), isLoggedIn = _c[0], setIsLoggedIn = _c[1]; // Local state for login status
    var navigate = react_router_dom_1.useNavigate();
    react_1.useEffect(function () {
        // Check if user is already logged in from browser storage
        var storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            onLogin(storedUsername);
            setIsLoggedIn(true);
        }
    }, [onLogin]);
    var handleLogin = function () {
        // Perform login logic here
        // Assuming login is successful, call onLogin callback with username
        onLogin(username);
        // Store username in browser storage to persist login state
        localStorage.setItem("username", username);
        navigate("/home");
    };
    return (react_1["default"].createElement("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" },
        react_1["default"].createElement("div", { className: "max-w-md w-full space-y-8" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900" }, "Sign in to your account")),
            react_1["default"].createElement("form", { className: "mt-8 space-y-6", onSubmit: handleLogin },
                react_1["default"].createElement("input", { type: "hidden", name: "remember", value: "true" }),
                react_1["default"].createElement("div", { className: "rounded-md shadow-sm -space-y-px" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("input", { id: "username", name: "username", type: "text", autoComplete: "username", required: true, className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm", placeholder: "Username", value: username, onChange: function (e) { return setUsername(e.target.value); } })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("input", { id: "password", name: "password", type: "password", autoComplete: "current-password", required: true, className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm", placeholder: "Password" }))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("button", { type: "submit", className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" },
                        react_1["default"].createElement("span", { className: "absolute left-0 inset-y-0 flex items-center pl-3" },
                            react_1["default"].createElement("svg", { className: "h-5 w-5 text-indigo-500 group-hover:text-indigo-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
                                react_1["default"].createElement("path", { fillRule: "evenodd", d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
                                react_1["default"].createElement("path", { fillRule: "evenodd", d: "M7 3a7 7 0 100 14h6a7 7 0 100-14H7zm-2 7a2 2 0 112-2 2 2 0 01-2 2z" }))),
                        "Sign in"))),
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/signup", className: "text-sm text-indigo-600 hover:text-indigo-800" }, "New User? Sign up")),
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement(react_router_dom_1.Link, { to: "/forgot-password", className: "text-sm text-indigo-600 hover:text-indigo-800" }, "Forgot Password?")))));
};
exports["default"] = Login;
