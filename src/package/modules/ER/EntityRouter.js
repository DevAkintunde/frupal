import { frupal } from "../defaultConfig";

export const ER = (endpoint) => {
  const entityRouter = frupal.remote.entityRouter;

  return fetch(entityRouter + endpoint, {
    method: "GET",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-type": "application/vnd.api+json",
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
