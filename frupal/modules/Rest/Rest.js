"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rest = void 0;

var _defaultConfig = require("../../defaultConfig");

// const Rest = frupal.remote.rest;
var Rest = function Rest(endpoint) {
  // only GET is support.
  var rest = _defaultConfig.frupal.remote.rest;
  return fetch(rest + endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json"
    }
  }).then(function (res) {
    if (res.status === 200) {
      return res.json();
    } else {
      return {
        status: res.status,
        statusText: res.statusText ? res.statusText : null
      };
    }
  }).then(function (resjson) {
    return resjson;
  }).catch(function () {
    return {
      log: "No endpoint specified, or endpoint not found."
    };
  });
};

exports.Rest = Rest;