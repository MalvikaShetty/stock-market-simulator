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
var react_router_dom_1 = require("react-router-dom");
var authapi_1 = require("../services/authapi");
function SignUpPage() {
    var _this = this;
    var navigate = react_router_dom_1.useNavigate();
    var _a = react_1.useState({
        username: '',
        password: ''
    }), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState(''), error = _b[0], setError = _b[1];
    var handleChange = function (e) {
        var _a;
        var _b = e.target, name = _b.name, value = _b.value;
        setFormData(__assign(__assign({}, formData), (_a = {}, _a[name] = value, _a)));
    };
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setError('');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, authapi_1["default"].postUser(formData)];
                case 2:
                    _a.sent();
                    navigate('/login'); // Redirect to the login page after successful signup
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setError('Failed to sign up. Please try again.');
                    console.error('Sign up error:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement("div", { className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" },
        react_1["default"].createElement("div", { className: "max-w-md w-full space-y-8" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement("h2", { className: "mt-6 text-center text-3xl font-extrabold text-gray-900" }, "Sign Up")),
            error && react_1["default"].createElement("p", { className: "text-red-500" }, error),
            react_1["default"].createElement("form", { className: "mt-8 space-y-6", onSubmit: handleSubmit },
                react_1["default"].createElement("input", { type: "hidden", name: "remember", value: "true" }),
                react_1["default"].createElement("div", { className: "rounded-md shadow-sm -space-y-px" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("input", { id: "username", name: "username", type: "email", autoComplete: "username", required: true, className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm", placeholder: "Username", value: formData.username, onChange: handleChange })),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("input", { id: "password", name: "password", type: "password", autoComplete: "current-password", required: true, className: "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm", placeholder: "Password", value: formData.password, onChange: handleChange }))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement("button", { type: "submit", className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" },
                        react_1["default"].createElement("span", { className: "absolute left-0 inset-y-0 flex items-center pl-3" },
                            react_1["default"].createElement("svg", { className: "h-5 w-5 text-indigo-500 group-hover:text-indigo-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" },
                                react_1["default"].createElement("path", { fillRule: "evenodd", d: "M10 12a2 2 0 100-4 2 2 0 000 4z" }),
                                react_1["default"].createElement("path", { fillRule: "evenodd", d: "M7 3a7 7 0 100 14h6a7 7 0 100-14H7zm-2 7a2 2 0 112-2 2 2 0 01-2 2z" }))),
                        "Sign Up"))),
            react_1["default"].createElement("div", { className: "text-center" },
                react_1["default"].createElement("p", { className: "text-sm text-gray-600" },
                    "Already have an account?",
                    ' ',
                    react_1["default"].createElement(react_router_dom_1.Link, { to: "/login", className: "font-medium text-indigo-600 hover:text-indigo-500" }, "Log in"))))));
}
exports["default"] = SignUpPage;
