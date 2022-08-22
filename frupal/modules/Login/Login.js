"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Login = void 0;

var _defaultConfig = require("../../defaultConfig");

var Login = function Login(data) {
  /*
    Available data importable options
    Login({
        username: "user",
        mail: "email@gmail.com",
        password: "password.",
        loginType: "email",
        action: { statusCode: 200, func: loggedInActionAsFunction },
      }).then((response) => {
        console.log(response); //returned to function
      });
      Token may optionly be set from Login() response by calling useContext and
      re-exporting response to token as follow
      const { setToken } = useContext(Token);
      setToken(response.token);
  */
  //import user preferred Token type. Defaults to access_token.
  var authMethod = _defaultConfig.frupal && _defaultConfig.frupal.authenticationMethod ? _defaultConfig.frupal.authenticationMethod : null;
  var saveTokenToLocalStorage = _defaultConfig.frupal && _defaultConfig.frupal.saveTokenToLocalStorage ? true : false; //create endpoint and body content for choice login method

  var uri = _defaultConfig.frupal.remote.uri;
  var endPoint = data && data.loginType && data.loginType === "email" ? {
    uri: uri + "/user/email-login?_format=json",
    body: {
      mail: data.mail,
      pass: data.password
    }
  } : {
    uri: uri + "/user/login?_format=json",
    body: {
      name: data && data.username ? data.username : null,
      pass: data && data.password ? data.password : null
    }
  }; //ensure one of email or username exists with password

  if (data && data.password && (data.mail || data.username)) {
    var statusCode = "";
    return fetch(endPoint.uri, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(endPoint.body)
    }).then(function (res) {
      statusCode = res.status;
      return res.json();
    }).then(function (resJson) {
      // console.log(resJson);
      //check to save token to browser localStorage
      if (resJson && resJson["current_user"] && saveTokenToLocalStorage && (resJson[authMethod] || resJson["access_token"])) {
        localStorage.setItem("sessionToken", JSON.stringify({
          type: authMethod ? authMethod : "access_token",
          key: authMethod ? resJson[authMethod] : resJson["access_token"]
        }));
      } //execute custom developer function if imported by developer


      if (data && data.action && data.action.func && (!data.action.statusCode && statusCode === 200 || data.action.statusCode === statusCode)) {
        data.action.func();
      } //returned Login() response


      return {
        json: resJson,
        log: resJson.message ? resJson.message : "",
        statusCode: statusCode,
        token: {
          type: authMethod && resJson[authMethod] ? authMethod : resJson["access_token"] ? "access_token" : "",
          key: resJson[authMethod] ? resJson[authMethod] : resJson["access_token"] ? resJson["access_token"] : ""
        }
      };
    }).catch(function (error) {
      return {
        error: error
      };
    });
  } else {
    return {
      json: "",
      log: "Incomplete credentials",
      statusCode: ""
    };
  }
};

exports.Login = Login;