import React from "react";
import { useState, useEffect, useMemo } from "react";
import { frupal } from "../defaultConfig";
import { frupalProfileFields } from "../defaultConfig";
import PropTypes from "prop-types";
import { Token } from "./Token";
import { Auth } from "./Auth";
import { Profile } from "./Profile";

const Authorization = ({ app }) => {
  const uri = frupal.remote.uri;
  const json = frupal.remote.json;
  const authMethod =
    frupal && frupal.authenticationMethod ? frupal.authenticationMethod : null;

  const sessionToken = JSON.parse(localStorage.getItem("sessionToken"));
  //sessionToken is used for all types of authentication available to the drupal website
  //session token is set as 'session' while 'access_token' is used for authenticated users.
  const [token, setToken] = useState({
    type:
      sessionToken && sessionToken.type ? sessionToken.type : "anon_session",
    key: sessionToken && sessionToken.key ? sessionToken.key : "",
  });
  const userToken = useMemo(() => ({ token, setToken }), [token]);

  const [isAuth, setIsAuth] = useState(false);
  const thisAuthentication = useMemo(() => ({ isAuth, setIsAuth }), [isAuth]);

  const [profile, setProfile] = useState({
    isAuth: false,
    uuid: "",
    display_name: "",
    mail: "",
    name: "",
    preferred_langcode: "en",
  });
  const thisUserProfile = useMemo(() => ({ profile, setProfile }), [profile]);

  useEffect(() => {
    const getUserUUId = async () => {
      let profileRelations;
      if (frupalProfileFields && frupalProfileFields.length > 0) {
        frupalProfileFields.forEach((field) => {
          if (field.includes("[relation]")) {
            profileRelations = profileRelations
              ? profileRelations + "," + field
              : profileRelations;
          }
        });
      }
      const response = await fetch(json, {
        method: "GET",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-type": "application/vnd.api+json",
          Authorization: "Bearer " + token.key,
        },
      });
      const outputData = await response.json();
      if (
        outputData &&
        outputData.meta &&
        outputData.meta.links.me &&
        outputData.meta.links.me.meta.id
      ) {
        let thisUUid = outputData.meta.links.me.meta.id;

        fetch(
          json +
            "user/user/" +
            thisUUid +
            (profileRelations ? "?include=" + profileRelations : ""),
          {
            method: "GET",
            headers: {
              Accept: "application/vnd.api+json",
              "Content-type": "application/vnd.api+json",
              Authorization: "Bearer " + token.key,
            },
          }
        )
          .then((res) => {
            return res.json();
          })
          .then((resJson) => {
            // console.log(resJson);
            if (resJson && resJson.data && resJson.data.attributes.mail) {
              let profilefields = {};
              if (frupalProfileFields && frupalProfileFields.length > 0) {
                frupalProfileFields.forEach((field) => {
                  if (field.includes("[relation]")) {
                    //To be implemented;
                  } else {
                    if (resJson.data.attributes[field]) {
                      profilefields = {
                        ...profilefields,
                        [field]:
                          resJson.data.attributes[field].length &&
                          Array.isArray(resJson.data.attributes[field]) &&
                          resJson.data.attributes[field].length > 0
                            ? resJson.data.attributes[field].join(", ")
                            : resJson.data.attributes[field],
                      };
                    }
                  }
                });
              }
              setProfile({
                isAuth: true,
                uuid: resJson.data.id,
                display_name: resJson.data.attributes.display_name,
                name: resJson.data.attributes.name,
                mail: resJson.data.attributes.mail,
                login: resJson.data.attributes.login,
                timezone: resJson.data.attributes.timezone,
                preferred_langcode: resJson.data.attributes.preferred_langcode,
                ...profilefields,
              });
            }
          });
      }
    };
    if (isAuth) {
      getUserUUId();
    }
  }, [isAuth, token, json]);

  // console.log(profile);

  useEffect(() => {
    const saveTokenToLocalStorage =
      frupal && frupal.saveTokenToLocalStorage ? true : false;
    // const anonHeader = {
    //   "Content-type": "application/json",
    // "X-CSRF-Token": token && token.key ? token.key : "",
    // withCredentials: true,
    // };

    const bearerHeader = {
      "Content-type": "application/json",
      Authorization: "Bearer " + (token && token.key ? token.key : ""),
    };
    const checkLoggedInStatus = async () => {
      const response = await fetch(uri + "/user/login_status?_format=json", {
        method: "GET",
        headers: bearerHeader,
      });
      const outputData = await response.json();
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
    };

    if (!isAuth) {
      checkLoggedInStatus();
    } else if (!token || !token.key) {
      setIsAuth(false);
    }

    function getAnonymousSession() {
      fetch(uri + "/session/token", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => {
          return res.text();
        })
        .then((resText) => {
          setToken({
            type: "anon_session",
            key: resText,
          });
          if (saveTokenToLocalStorage) {
            localStorage.setItem(
              "sessionToken",
              JSON.stringify({
                type: "anon_session",
                key: resText,
              })
            );
          }
        });
    }
  }, [token, isAuth, uri, authMethod]);

  return (
    <Token.Provider value={userToken}>
      <Auth.Provider value={thisAuthentication}>
        <Profile.Provider value={thisUserProfile}>{app}</Profile.Provider>
      </Auth.Provider>
    </Token.Provider>
  );
};
export default Authorization;

Authorization.propTypes = {
  app: PropTypes.element,
};

Authorization.defaultProps = {
  app: <div id="authorization-holder">Authorizer Goes Here</div>,
};
