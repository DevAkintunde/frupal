"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Test = void 0;

var _react = require("react");

var _Authorization = require("../Authorization");

var _Json = require("../Json/Json");

var _Rest = require("../Rest/Rest");

var _EntityRouter = require("../ER/EntityRouter");

var _Contact = require("../Contact/Contact");

var _Pager = _interopRequireDefault(require("../../ui/Pager/Pager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Test = function Test() {
  /* Contact({
    form: "feedback",
    name: "person submitting the form",
    mail: "email of user submitting the form",
    subject: "subject of message",
    message: "message body",
    profile: "authenticated profile object data",
  }); */
  // ER("mellyscope/technokraft-coming").then((res) => console.log(res));
  var _useContext = (0, _react.useContext)(_Authorization.Token),
      token = _useContext.token,
      setToken = _useContext.setToken;

  var changeHandler = function changeHandler(e) {
    e.preventDefault();
    console.log(e.target.value);
  };

  function clickHandler(e) {
    e.preventDefault();
    /*  Login({
      username: "akintunde",
      mail: "ebakintunde@gmail.com",
      password: "accounts-olakunle.",
      loginType: "email",
      action: { statusCode: 200, func: loggedInAction },
    }).then((response) => {
      console.log(response);
      // setToken({
      //   type: "access_token",
      //   key: response.json.access_token,
      // });
      setToken(response.token);
    }); */
  }

  var loggedInAction = function loggedInAction() {
    console.log("action processed");
  }; //console.log(token);
  // let output = Json([
  //   {
  //     endpoint: "node/series",
  //     id: "req1",
  //     waitFor: "", // will be available once the dependency feature of async calls have been implemented.
  //   },
  //   {
  //     endpoint: "node/movie",
  //     id: "req9",
  //     waitFor: "", // will be available once the dependency feature of async calls have been implemented.
  //   },
  // ]);
  // output.then((res) => {
  //   console.log(res);
  // });
  // .then((response) => console.log(response));
  // Json("").then((response) => console.log(response));
  // Json("node/movie").then((response) => console.log(response));
  // Json().then((response) => console.log(response));
  // Json(["dhdj"]);
  // Rest("vote/rating");
  // Rest().then((response) => console.log(response));
  //testing Pager


  var url = "node?";

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      pagerData = _useState2[0],
      setPagerData = _useState2[1];

  console.log(pagerData);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("h1", null, token.key), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "enter a dummy test",
    onChange: changeHandler
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    onClick: clickHandler
  })), /*#__PURE__*/React.createElement(_Pager.default, {
    url: url,
    pageContents: function pageContents(pageContent) {
      return setPagerData(pageContent);
    }
  }));
};

exports.Test = Test;