"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = exports.Authorization = void 0;

var _react = _interopRequireDefault(require("react"));

var _Authorization = require("./Authorization");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Authorization = {
  title: "Authorization",
  component: _Authorization.Authorization
};
exports.Authorization = Authorization;

var Template = function Template(args) {
  return /*#__PURE__*/_react.default.createElement(Authorization, args);
};

var Container = Template.bind({});
exports.Container = Container;
Container.args = {
  label: "HTML Element"
};