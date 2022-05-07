const prod = {
  remote: {
    uri: "https://mellywood.com",
    jsonapi: "jsonapi",
    restapi: "restapi",
    subrequests: true,
    entityRouter: true,
  },
};
const dev = {
  remote: {
    uri: "http://mellywood.local",
    jsonapi: "jsonapi",
    restapi: "restapi",
    subrequests: true,
    entityRouter: true,
  },
  profile_fields: [
    "field_first_name",
    "field_last_name",
    "field_phone_numbers",
    "[relation]field_tags]", //to be implemented
  ],
  // authenticationMethod: "access_token",
  saveTokenToLocalStorage: true, //access_token is saved by default if authenticationMethod not set in frupal.config.js
};

export const frupal = process.env.NODE_ENV === "development" ? dev : prod;
