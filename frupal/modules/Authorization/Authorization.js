"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _defaultConfig = require("../../defaultConfig");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Token = require("./Token");

var _Auth = require("./Auth");

var _Profile = require("./Profile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Authorization = function Authorization(_ref) {
  var app = _ref.app;
  var uri = _defaultConfig.frupal.remote.uri;
  var json = _defaultConfig.frupal.remote.json;
  var authMethod = _defaultConfig.frupal && _defaultConfig.frupal.authenticationMethod ? _defaultConfig.frupal.authenticationMethod : null;
  var sessionToken = JSON.parse(localStorage.getItem("sessionToken")); //sessionToken is used for all types of authentication available to the drupal website
  //session token is set as 'session' while 'access_token' is used for authenticated users.

  var _useState = (0, _react.useState)({
    type: sessionToken && sessionToken.type ? sessionToken.type : "anon_session",
    key: sessionToken && sessionToken.key ? sessionToken.key : ""
  }),
      _useState2 = _slicedToArray(_useState, 2),
      token = _useState2[0],
      setToken = _useState2[1];

  var userToken = (0, _react.useMemo)(function () {
    return {
      token: token,
      setToken: setToken
    };
  }, [token]);

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isAuth = _useState4[0],
      setIsAuth = _useState4[1];

  var thisAuthentication = (0, _react.useMemo)(function () {
    return {
      isAuth: isAuth,
      setIsAuth: setIsAuth
    };
  }, [isAuth]);

  var _useState5 = (0, _react.useState)({
    isAuth: false,
    uuid: "",
    display_name: "",
    mail: "",
    name: "",
    preferred_langcode: "en"
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      profile = _useState6[0],
      setProfile = _useState6[1];

  var thisUserProfile = (0, _react.useMemo)(function () {
    return {
      profile: profile,
      setProfile: setProfile
    };
  }, [profile]);
  (0, _react.useEffect)(function () {
    var getUserUUId = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var profileRelations, response, outputData, thisUUid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (_defaultConfig.frupalProfileFields && _defaultConfig.frupalProfileFields.length > 0) {
                  _defaultConfig.frupalProfileFields.forEach(function (field) {
                    if (field.includes("[relation]")) {
                      profileRelations = profileRelations ? profileRelations + "," + field : profileRelations;
                    }
                  });
                }

                _context.next = 3;
                return fetch(json, {
                  method: "GET",
                  headers: {
                    Accept: "application/vnd.api+json",
                    "Content-type": "application/vnd.api+json",
                    Authorization: "Bearer " + token.key
                  }
                });

              case 3:
                response = _context.sent;
                _context.next = 6;
                return response.json();

              case 6:
                outputData = _context.sent;

                if (outputData && outputData.meta && outputData.meta.links.me && outputData.meta.links.me.meta.id) {
                  thisUUid = outputData.meta.links.me.meta.id;
                  fetch(json + "user/user/" + thisUUid + (profileRelations ? "?include=" + profileRelations : ""), {
                    method: "GET",
                    headers: {
                      Accept: "application/vnd.api+json",
                      "Content-type": "application/vnd.api+json",
                      Authorization: "Bearer " + token.key
                    }
                  }).then(function (res) {
                    return res.json();
                  }).then(function (resJson) {
                    // console.log(resJson);
                    if (resJson && resJson.data && resJson.data.attributes.mail) {
                      var profilefields = {};

                      if (_defaultConfig.frupalProfileFields && _defaultConfig.frupalProfileFields.length > 0) {
                        _defaultConfig.frupalProfileFields.forEach(function (field) {
                          if (field.includes("[relation]")) {//To be implemented;
                          } else {
                            if (resJson.data.attributes[field]) {
                              profilefields = _objectSpread(_objectSpread({}, profilefields), {}, _defineProperty({}, field, resJson.data.attributes[field].length && Array.isArray(resJson.data.attributes[field]) && resJson.data.attributes[field].length > 0 ? resJson.data.attributes[field].join(", ") : resJson.data.attributes[field]));
                            }
                          }
                        });
                      }

                      setProfile(_objectSpread({
                        isAuth: true,
                        uuid: resJson.data.id,
                        display_name: resJson.data.attributes.display_name,
                        name: resJson.data.attributes.name,
                        mail: resJson.data.attributes.mail,
                        login: resJson.data.attributes.login,
                        timezone: resJson.data.attributes.timezone,
                        preferred_langcode: resJson.data.attributes.preferred_langcode
                      }, profilefields));
                    }
                  });
                }

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function getUserUUId() {
        return _ref2.apply(this, arguments);
      };
    }();

    if (isAuth) {
      getUserUUId();
    }
  }, [isAuth, token, json]); // console.log(profile);

  (0, _react.useEffect)(function () {
    var saveTokenToLocalStorage = _defaultConfig.frupal && _defaultConfig.frupal.saveTokenToLocalStorage ? true : false; // const anonHeader = {
    //   "Content-type": "application/json",
    // "X-CSRF-Token": token && token.key ? token.key : "",
    // withCredentials: true,
    // };

    var bearerHeader = {
      "Content-type": "application/json",
      Authorization: "Bearer " + (token && token.key ? token.key : "")
    };

    var checkLoggedInStatus = /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var response, outputData;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return fetch(uri + "/user/login_status?_format=json", {
                  method: "GET",
                  headers: bearerHeader
                });

              case 2:
                response = _context2.sent;
                _context2.next = 5;
                return response.json();

              case 5:
                outputData = _context2.sent;

                // console.log(response);
                // console.log(outputData);
                if (outputData !== 1) {
                  setProfile({});

                  if (token.type !== "anon_session" || !token.key) {
                    getAnonymousSession();
                  }
                } else {
                  setIsAuth(true);
                }

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function checkLoggedInStatus() {
        return _ref3.apply(this, arguments);
      };
    }();

    if (!isAuth) {
      checkLoggedInStatus();
    } else if (!token || !token.key) {
      setIsAuth(false);
    }

    function getAnonymousSession() {
      fetch(uri + "/session/token", {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      }).then(function (res) {
        return res.text();
      }).then(function (resText) {
        setToken({
          type: "anon_session",
          key: resText
        });

        if (saveTokenToLocalStorage) {
          localStorage.setItem("sessionToken", JSON.stringify({
            type: "anon_session",
            key: resText
          }));
        }
      });
    }
  }, [token, isAuth, uri, authMethod]);
  return /*#__PURE__*/_react.default.createElement(_Token.Token.Provider, {
    value: userToken
  }, /*#__PURE__*/_react.default.createElement(_Auth.Auth.Provider, {
    value: thisAuthentication
  }, /*#__PURE__*/_react.default.createElement(_Profile.Profile.Provider, {
    value: thisUserProfile
  }, app)));
};

var _default = Authorization;
exports.default = _default;
Authorization.propTypes = {
  app: _propTypes.default.element
};
Authorization.defaultProps = {
  app: /*#__PURE__*/_react.default.createElement("div", {
    id: "authorization-holder"
  }, "Authorizer Goes Here")
};