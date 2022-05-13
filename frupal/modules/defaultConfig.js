"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.frupalProfileFields = exports.frupal = void 0;

var _frupal = require("../../../frupal.config");

var index = "/";
var uri = _frupal.frupal && _frupal.frupal.remote && _frupal.frupal.remote.uri ? _frupal.frupal.remote.uri : null;
var jsonApi = uri && _frupal.frupal && _frupal.frupal.remote && _frupal.frupal.remote.jsonapi ? uri + "/" + _frupal.frupal.remote.jsonapi + "/" : uri + "/jsonapi/";
var restApi = uri && _frupal.frupal && _frupal.frupal.remote && _frupal.frupal.remote.restapi ? uri + "/" + _frupal.frupal.remote.restapi + "/" : uri + "/restapi/";
var subrequests = uri && _frupal.frupal && _frupal.frupal.remote && _frupal.frupal.remote.subrequests === true ? uri + "/subrequests/" : "";
var entityRouter = uri && _frupal.frupal && _frupal.frupal.remote && _frupal.frupal.remote.entityRouter === true ? uri + "/entity/router?format=jsonapi&path=" : ""; //combine above as config

var config = {
  remote: {
    index: index,
    uri: uri,
    json: jsonApi,
    rest: restApi,
    subrequests: subrequests,
    entityRouter: entityRouter
  },
  authenticationMethod: _frupal.frupal && _frupal.frupal.authenticationMethod ? _frupal.frupal.authenticationMethod : "access_token",
  saveTokenToLocalStorage: true
};
var frupal = uri ? config : null;
exports.frupal = frupal;
var frupalProfileFields = _frupal.frupal && _frupal.frupal.profile_fields ? _frupal.frupal.profile_fields : null;
exports.frupalProfileFields = frupalProfileFields;