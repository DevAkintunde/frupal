"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ER = void 0;

var _defaultConfig = require("../../defaultConfig");

var ER = function ER(endpoint) {
  var entityRouter = _defaultConfig.frupal.remote.entityRouter;
  return fetch(entityRouter + endpoint, {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-type": "application/vnd.api+json"
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

exports.ER = ER;