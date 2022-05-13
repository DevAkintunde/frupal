import { frupal as userConfig } from "../../../frupal.config";

const index = "/";
const uri =
  userConfig && userConfig.remote && userConfig.remote.uri
    ? userConfig.remote.uri
    : null;
const jsonApi =
  uri && userConfig && userConfig.remote && userConfig.remote.jsonapi
    ? uri + "/" + userConfig.remote.jsonapi + "/"
    : uri + "/jsonapi/";
const restApi =
  uri && userConfig && userConfig.remote && userConfig.remote.restapi
    ? uri + "/" + userConfig.remote.restapi + "/"
    : uri + "/restapi/";
const subrequests =
  uri &&
  userConfig &&
  userConfig.remote &&
  userConfig.remote.subrequests === true
    ? uri + "/subrequests/"
    : "";
const entityRouter =
  uri &&
  userConfig &&
  userConfig.remote &&
  userConfig.remote.entityRouter === true
    ? uri + "/entity/router?format=jsonapi&path="
    : "";
//combine above as config
const config = {
  remote: {
    index: index,
    uri: uri,
    json: jsonApi,
    rest: restApi,
    subrequests: subrequests,
    entityRouter: entityRouter,
  },
  authenticationMethod:
    userConfig && userConfig.authenticationMethod
      ? userConfig.authenticationMethod
      : "access_token",
  saveTokenToLocalStorage: true,
};
export const frupal = uri ? config : null;

export const frupalProfileFields =
  userConfig && userConfig.profile_fields ? userConfig.profile_fields : null;
