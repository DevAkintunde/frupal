"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Json = void 0;

var _defaultConfig = require("../defaultConfig");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var Json = function Json(data) {
  // only GET, POST, PATCH and DELETE are support.
  var json = _defaultConfig.frupal.remote.json; //   console.log(data);
  //   const data = {
  //     endpoint: "node/article",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/vnd.api+json",
  //     },
  //     body: {},
  //     method: "get",
  //     id: "req1",
  //     waitFor: "", // will be available once the dependency feature of async calls have been implemented.
  //   };
  //case 1; check if input data is a single object

  if (data && _typeof(data) === "object" && !Array.isArray(data) && data !== null) {
    //convert imported headers toLowerCase to compare and avoid duplicates with defaults.
    var importedHeaders = {};

    if (data.headers && data.headers.length > 0) {
      var importedHeadersKeys = Object.keys(data.headers);
      importedHeadersKeys.forEach(function (key) {
        if (data.headers[key]) {
          importedHeaders = _objectSpread(_objectSpread({}, importedHeaders), {}, _defineProperty({}, key.toLowerCase(), data.headers[key].toLowerCase()));
        }
      });
    }

    var headers = _objectSpread({
      accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json"
    }, importedHeaders);

    var body = data.body ? JSON.stringify(data.body) : null;
    var getMethod = {
      method: "GET",
      headers: headers
    };
    var postMethod = {
      method: "POST",
      headers: headers,
      body: body
    };
    var patchMethod = {
      method: "PATCH",
      headers: headers,
      body: body
    };
    var deleteMethod = {
      method: "DELETE",
      headers: headers,
      body: body
    };
    var methodCall = data.method && data.method.toLowerCase() === "post" ? postMethod : data.method && data.method.toLowerCase() === "patch" ? patchMethod : data.method && data.method.toLowerCase() === "delete" ? deleteMethod : getMethod;
    return fetch(json + (data.endpoint ? data.endpoint : ""), methodCall).then(function (res) {
      if (!data.endpoint) {
        return {
          log: "No endpoint specified."
        };
      } else {
        return res.json();
      }
    }).then(function (resjson) {
      return resjson;
    });
  } //case 2; check is imported data is an array of multiple objects
  else if (data && Array.isArray(data) && typeof data !== "string") {
    //case 2... allow to wait for dependent async to be implemented later;
    var promises = [];
    var promisesId = [];
    data.forEach(function (thisCall) {
      var importedHeaders = {};

      if (thisCall.headers && thisCall.headers.length > 0) {
        var _importedHeadersKeys = Object.keys(thisCall.headers);

        _importedHeadersKeys.forEach(function (key) {
          if (thisCall.headers[key]) {
            importedHeaders = _objectSpread(_objectSpread({}, importedHeaders), {}, _defineProperty({}, key.toLowerCase(), thisCall.headers[key].toLowerCase()));
          }
        });
      }

      var headers = _objectSpread({
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json"
      }, importedHeaders);

      var body = thisCall.body ? JSON.stringify(thisCall.body) : null;
      var getMethod = {
        method: "GET",
        headers: headers
      };
      var postMethod = {
        method: "POST",
        headers: headers,
        body: body
      };
      var patchMethod = {
        method: "PATCH",
        headers: headers,
        body: body
      };
      var deleteMethod = {
        method: "DELETE",
        headers: headers,
        body: body
      };
      var methodCall = thisCall.method && thisCall.method.toLowerCase() === "post" ? postMethod : thisCall.method && thisCall.method.toLowerCase() === "patch" ? patchMethod : thisCall.method && thisCall.method.toLowerCase() === "delete" ? deleteMethod : getMethod;

      var promiseCall = function promiseCall() {
        return new Promise(function (resolve) {
          resolve(fetch(json + thisCall.endpoint, methodCall));
        });
      };

      promises.push(promiseCall().then(function (res) {
        return res.json();
      }));

      if (thisCall.id) {
        promisesId.push(thisCall.id);
      } else {
        promisesId.push(promisesId.length + 1);
      }
    });

    var getPromises = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var reservedPromisesId, requestedData, i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                reservedPromisesId = promisesId;
                _context.next = 3;
                return Promise.all(promises);

              case 3:
                promisesId = _context.sent;
                requestedData = {};

                for (i = 0; i < promisesId.length; i++) {
                  requestedData = _objectSpread(_defineProperty({}, reservedPromisesId[i], promisesId[i]), requestedData);
                }

                return _context.abrupt("return", requestedData);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getPromises() {
        return _ref.apply(this, arguments);
      };
    }();

    return getPromises();
  } //case 3; check if imported data is just an endpoint uri string
  else if (data) {
    return fetch(json + data, {
      method: "GET",
      headers: {
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json"
      }
    }).then(function (res) {
      return res.json();
    }).then(function (resjson) {
      return resjson;
    }).catch(function (error) {
      return {
        log: "Endpoint not found."
      };
    });
  } //case 4; export base /jsonapi endpoint if empty data
  else {
    return fetch(json, {
      method: "GET",
      headers: {
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json"
      }
    }).then(function (res) {
      return res.json();
    }).then(function (resjson) {
      return resjson;
    });
  }
};

exports.Json = Json;