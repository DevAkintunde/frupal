Drupal library to make decoupled Drupal easier to manage/build from the frontend by implementing communication channels to the backend.

Quite a few functions will be implemented over time.... and my list for now may include many or all of the following:

A login function.
Json function to call the all json endpoints.
A Rest function, an alternative to Json function where a rest endpoint is needed.
Search function.
Contact form submit function.
Flagging function.
User registration function.
Password reset function.
A Pager UI
Except for the UI components (referred to as module, sticking to Drupal definations) all functions will be designed to return an object response which will include the default Json response for the endpoint and additional details like logs or status message/code where necessary.

This is will be available on npm once I start pushing to this repository.


Important Notice: To use this library, the aspect of your app that really
on this library's functionality must be wrapped in the Authorisation module,
else it won't work as expected. If your whole App is dependednt on the drupal,
it's a good idea to put your App.js file inside the Authorisation module of the
library.
Like This:
<Authorization app={<App />} />

How to Use

Create a config file in the root of your react app and
set your basic remote configurations as stated below:
config file should be named as: frupal.config.js

Its important to export your default configurations as follows

Minimum config is:
export const frupal = {
  remote: {
    uri: "http://backendWebsiteUri.com",
  }
};
Backend URI is the minimum allowed to use the library in your project.

When only your backend uri is set, it is assumed that all
Json Api call is drupal default of jsonapi.
That is: http://backendWebsiteUri.com/jsonapi
If the Json Api point has however been changed manually or using
drupal modules like 'Json Default Extras' module, please specify
your new Json Api endpoint as below:

export const frupal = {
  remote: {
    uri: "http://backendWebsiteUri.com",
    jsonapi: "newJsonEndpoint",
    restapi: "restapi",
    subrequests: true,
    entityRouter: true,
  },
  authenticationMethod: "access_token",
  saveTokenToLocalStorage: true,
};
A default endpoint is set for rest call @ restapi; 
that is: http://backendWebsiteUri.com/restapi
You can change this as well like you changed jsonapi.

Extras:
Your preferred authentication method may be specified here. This 
will be used to process access control for authenticated users.
If none is specified, all access restricted api call will be done
with access_token. Only access_token is supported for now.
You will probably need to install a drupal module to exports access_token on
the login response to take advantage of this. The drupal getjwtonlogin is a good bet.

set saveTokenToLocalStorage = true for an optional process to save your access_token
to the browser Local Storage. It is saved as sessionToken and can easily be
retrieved with localStorage.getItem("sessionToken").
If you wish to save another kind of token rather than access_token, set your default
authenticationMethod in frupal.config.js and this token key|value pair will be 
saved to localStorage.
sessionToken is JSON stringified JSON.stringify().
Note: it is a good idea to save your sessionToken so <Authorization /> can 
always fetch from there to keep track of returning signed in users.

if you are using Entity Router Module for routing uri
and subrequests Module for simultaneous multiple requests,
then set either or both as true. This is disabled by default.

Default Drupal profile fields (User entity fields) are exported if 
you are using the Login() function and can be imported to your App with:
import Profile from "frupal/Login";
and providing context
const { profile } = useContext(Profile);
Custom profile properties can be optionally inserted by doing
setProfile(...profile, user_badge:'Colonel')
and swapping the context above with the one below.
const { profile, setProfile } = useContext(Profile);

If you which to automatically include custom profile field to your app,
include such fields in the config file as below:

profile_fields: ["field_first_name", "field_last_name", "[]field_phone_nos"]

Please follow this partner for this to work
1. Only drupal machine names are valid.
2. Multiple value fields should be preceeded with a square bracket in front
    []field_phone_nos
3. Referenced fields should be preceeded with a square bracket contianing 'relation'
   in front.
    [relation]field_tags

Your complete config file may look like the below:

export const frupal = {
  remote: {
    uri: "http://backendWebsiteUri.com",
    jsonapi: "jsonapi",
    restapi: "restapi",
    subrequests: true,
    entityRouter: true,
  },
  profile_fields: ["field_fname", "field_lname", "[]field_phone_nos", [relation]field_tags],
  authenticationMethod: "csrf_token",
  saveTokenToLocalStorage: true,
};

For development purpose, you may consider the below config 
to create a dynamic configuration that differs between
local development and deployment.

const prod = {
  remote: {
    uri: "https://mellywood.com",
    jsonapi: "jsonapi",
    restapi: "restapi",
    subrequests: true,
    entityRouter: true,
  },
  profile_fields: [
    "field_fname",
    "field_lname",
    "[]field_phone_nos",
    "[relation]field_tags]",
  ],
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
    "field_fname",
    "field_lname",
    "[]field_phone_nos",
    "[relation]field_tags]",
  ],
};
export const frupal = process.env.NODE_ENV === "development" ? dev : prod;

Custom profile entity fields (that is any field not part of drupal core)
should be added into the frupal object variable in the frupal.config.js
file as an array of fields with a key set as 'profile_fields'

Example: {profiles_fields: ['field_first_name, 'field_last_name',
[]field_phone_numbers, [relation]field_tags]}

Note: 
1. All fields should be drupal field IDs.
2. Fields that allows multiple values should be preceeded
    with '[]' to denote it as an array.
3. Entity reference fields should be preceeded with
    '[relation]' to denote it as such. (Feature yet to be implemented).
4. Every other field will be treated as single value field.
Note: unless the 'Token' module is called and set, you will have no
accss to the Profile module.

The Login() Function.
Please note that there's no way to check if a user is already logged in.
You have to create a logic to handle that check yourself.

5 variables may be provided for the Login function as named below:

username, mail, password, loginType, action.
At least one of username or mail (email) is needed with password to process
signing in a user. When the email option is enabled, you'll have to explicitly
set it using loginType= 'email' for it to be enabled.
You most likely need the 'Rest Email Login' drupal module for this to work,
as the endpoint is used to communicate with the backend.
That is: 'mysite.com/user/email-login?_format=json'

Last but not the least, if you intend to execute a function if login is successful,
or at any other statusCode response;
please place your function in the 'action' property as an object with the key|values
as action: { statusCode: 200, func: processLoggedInAction }.
statusCode may be ignored if you only want to execute the function on successful logged In
at code 200.
Full Login function sample should look like below: 
Login({
      username: "myName", //optional if loginType is set
      mail: "myEmail@gmail.com", //optional. must be provided if loginType is set
      password: "myPassword.",
      loginType: 'email', //optional
      saveTokenToLocalStorage: true, //optional
      action: { 
                statusCode: 200, //optional, defaults to 200
                func: loggedInAction 
              } //optional
    }).then((response) => {
      console.log(response); //process whatever you want to do with the response.
    });
Login response is returned as an object 
{
  json: "returned jsonapi response",
  log: "Any accompanying logging/message/notice/error",
  statusCode: "200", //server response status code,
  token: {}, //preferred logged in token with key and type.
              //only available if authenticationMethod is set in frupal.config.js
  
}
Site-wide token may be optionly set from Login() response by calling useContext and
re-exporting response to token as follow:
const { setToken } = useContext(Token);
setToken(response.token) // if authenticationMethod is set in frupal.config.js,
otherwise use the approach below.
setToken({
        type: "access_token",
        key: response.json.access_token,
      });
All available token can be seen in the response.json of the returned response.

The Json() Function
By default Json() functions accepts an endpoint variable to fetch your json call, or an object with an endpoint key within to fetch your call.
endpoint should be in the below format:
{
       endpoint: "node/article",
       headers: {
         "Content-Type": "application/vnd.api+json",
         Accept: "application/vnd.api+json",
       },
       body: {},
       method: "get",
};
Every other key is optional and are just available if your desire to make custom modifications. You will need the body option if your making a POST, PATCH or DELETE requests.
Use: Json().then((response) => console.log(response)) to return your expected results

The Rest() Function
The Rest Function only accepts a string endpoint as variable.

The ER() Function. Using Drupal Entity Router module.
Like Rest(), ER() Function only accepts a string endpoint as variable; this would be the uri, or pathauto (if enabled) uri, of the entity.

Th SR() Function
Yet to be implemented.