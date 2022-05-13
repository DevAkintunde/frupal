import { frupal } from "../defaultConfig";

// const Rest = frupal.remote.rest;
export const Rest = (endpoint) => {
  // only GET is support.
  const rest = frupal.remote.rest;

  return fetch(rest + endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return {
          status: res.status,
          statusText: res.statusText ? res.statusText : null,
        };
      }
    })
    .then((resjson) => {
      return resjson;
    })
    .catch(() => {
      return {
        log: "No endpoint specified, or endpoint not found.",
      };
    });
};
