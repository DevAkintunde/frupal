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
