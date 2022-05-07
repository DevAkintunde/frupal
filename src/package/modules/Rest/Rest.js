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
      return res.json();
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
