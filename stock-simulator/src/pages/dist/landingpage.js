"use strict";
exports.__esModule = true;
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var react_router_dom_1 = require("react-router-dom");
var LandingPage = function () {
    return (React.createElement("div", { className: "container" },
        React.createElement("div", { className: "text-center navigation-box" },
            React.createElement(react_router_dom_1.Link, { to: "/login", className: "flex items-center px-4 py-2.5 rounded transition duration-200 hover:bg-gray-200" },
                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faSignInAlt, className: "h-5 w-5 mr-2" }),
                "Login"),
            React.createElement(react_router_dom_1.Link, { to: "/signup", className: "flex items-center px-4 py-2.5 rounded transition duration-200 hover:bg-gray-200" },
                React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUserPlus, className: "h-5 w-5 mr-2" }),
                "Sign Up"))));
};
exports["default"] = LandingPage;
