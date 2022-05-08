"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Test = void 0;

var _react = require("react");

var _Authorization = require("../Authorization");

var _Login = _interopRequireDefault(require("../Login/Login"));

var _Json = require("../Json/Json");

var _Rest = require("../Rest/Rest");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Test = function Test() {
  var _useContext = (0, _react.useContext)(_Authorization.Token),
      token = _useContext.token,
      setToken = _useContext.setToken;

  var changeHandler = function changeHandler(e) {
    e.preventDefault();
    console.log(e.target.value);
  };

  function clickHandler(e) {
    e.preventDefault();
    (0, _Login.default)({
      username: "akintunde",
      mail: "ebakintunde@gmail.com",
      password: "accounts-olakunle.",
      loginType: "email",
      action: {
        statusCode: 200,
        func: loggedInAction
      }
    }).then(function (response) {
      console.log(response); // setToken({
      //   type: "access_token",
      //   key: response.json.access_token,
      // });

      setToken(response.token);
    });
  }

  var loggedInAction = function loggedInAction() {
    console.log("action processed");
  };

  console.log(token);
  var output = (0, _Json.Json)([{
    endpoint: "node/series",
    id: "req1",
    waitFor: "" // will be available once the dependency feature of async calls have been implemented.

  }, {
    endpoint: "node/movie",
    id: "req9",
    waitFor: "" // will be available once the dependency feature of async calls have been implemented.

  }]);
  output.then(function (res) {
    console.log(res);
  }); // .then((response) => console.log(response));
  // Json("").then((response) => console.log(response));
  // Json("node/movie").then((response) => console.log(response));
  // Json().then((response) => console.log(response));
  // Json(["dhdj"]);
  // Rest("vote/rating");
  // Rest().then((response) => console.log(response));

  return /*#__PURE__*/React.createElement("form", null, /*#__PURE__*/React.createElement("h1", null, token.key), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "enter a dummy test",
    onChange: changeHandler
  }), /*#__PURE__*/React.createElement("input", {
    type: "submit",
    onClick: clickHandler
  }));
};

exports.Test = Test;