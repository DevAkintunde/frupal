"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;

var _react = require("react");

var Auth = /*#__PURE__*/(0, _react.createContext)({
  isAuth: false,
  setIsAuth: function setIsAuth() {}
});
exports.Auth = Auth;