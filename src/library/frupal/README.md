# Frupal, a Drupal React JS library

A Drupal library to make decoupled Drupal easier to manage/build from the frontend by implementing common communication channels to the backend.

All modules/functions/features may be imported from 'frupal/modules'

(This ReadMe is still a little scattered at the moment; sorry!!!)

Quite a few functions will be implemented over time.... and my list for now may include many, all or more of the following:

#### A login function

#### Json function to call the all json endpoints.

#### A Rest function, an alternative to Json function where a rest endpoint is needed.

#### Search function.

#### Contact form submit function.

#### Flagging function.

#### User registration function.

#### Password reset function.

#### A Pager UI

Except for the UI components (components are often referred to as module, in staying true to Drupal definations), all functions will be designed to return an object response which will include the default Json response for the endpoint and additional details like logs or status message/code where necessary.

Frupal is will be available on npm soon after I start pushing to this repository.

#### Important Notice:

To use the authenticated (logged in user specific processes) specific context and functions of this library, the aspect of your app that required authentication must be wrapped in the Authorisation module, else it won't work as expected. If your whole App is dependednt on the drupal and required authenticated user access, it's a good idea to put your App.js file inside the Authorisation module of the
library.
Like This:
<Authorization app={<App />} />
This allows 'profile' context amongs others to be available for use by simply importing React context API. Maybe i'll attach an issue or page to show this feature at work soon.

## How to Use

Create a config file, as frupal.config.js, in the root of your react app and set your basic remote configurations as stated below:
<code>
export const frupal = {
remote: {
uri: "http://backendWebsiteUri.com",
jsonapi: "yourJsonApiEndpoint", //default is jsonapi
restapi: "restapi",
subrequests: true,
entityRouter: true,
},
authenticationMethod: "access_token",
saveTokenToLocalStorage: true,
};
</code>
While must of the options are optional, it is important to export your Minimum default config as:
<code>
export const frupal = {
remote: {
uri: "http://backendWebsiteUri.com",
}
};
</code>
Backend URI is the minimum allowed to use the library in your project.

When only your backend uri is set, it is assumed that all Json Api call is drupal default of 'jsonapi'.
That is: http://backendWebsiteUri.com/jsonapi
If the Json Api point has however been changed manually or using drupal modules like 'Json Default Extras' module, please specify your new Json Api endpoint as below:
<code>
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
</code>
A default endpoint is set for rest call @ restapi; that is: http://backendWebsiteUri.com/restapi
You can change this as well like you changed jsonapi.

#### Extras:

Your preferred authentication method may be specified here. This will be used to process access control for authenticated users. If none is specified, all access restricted api call will be done with access_token. Only access_token is implemented for now though. You will probably need to install a drupal module to export access_token on the login response to take advantage of this feature. The drupal 'getjwtonlogin' module is a good bet if you use JWT module for authentication.

set saveTokenToLocalStorage = true for an optional process to save your access_token to the browser Local Storage. It is saved as sessionToken and can easily be retrieved with localStorage.getItem("sessionToken"). An option to save this in sessionStorage may be implement later.
If you wish to save another kind of token rather than access_token, set your default authenticationMethod in frupal.config.js and this token key|value pair will be saved to localStorage. sessionToken is JSON stringified JSON.stringify().
Note: it is a good idea to save your sessionToken so <Authorization /> can always fetch from there to keep track of returning signed in users.

if you are using 'Entity Router' Module for routing uri and subrequests Module for simultaneous multiple requests, then set either or both as true. Entity Router feature is disabled by default however the Subrequest module feature is yet to be implemented. Pardon me.

Default Drupal profile fields (User entity fields) will be retruned with your response if you are using the Login() function (see below sections) and can be imported to your App with the profile context by...

<code>import Profile from "frupal/Authorization";</code>
and providing context
<code>const { profile } = useContext(Profile);</code>

Custom profile properties can be optionally inserted by doing
<code>setProfile(...profile, user_badge:'Colonel')</code>
and swapping the context above with the one below.
<code>const { profile, setProfile } = useContext(Profile);</code>

If you which to automatically include custom profile field to your app however, include such fields in the config file as below:

profile_fields: ["field_first_name", "field_last_name", "field_phone_nos"]

Please follow this partner for this to work

1. Only drupal machine names are valid.
2. Referenced fields should be preceeded with a square bracket containing 'relation'
   in front.
   [relation]field_tags //Note: yet to be implemented.

Your complete config file may look like the below:
<code>
export const frupal = {
remote: {
uri: "http://backendWebsiteUri.com",
jsonapi: "jsonapi",
restapi: "restapi",
subrequests: true,
entityRouter: true,
},
profile_fields: ["field_fname", "field_lname", "field_phone_nos", [relation]field_tags],
authenticationMethod: "csrf_token", //if using drupal csrf_token
saveTokenToLocalStorage: true,
};
</code>

For development purpose, you may consider the below config to create a dynamic configuration that environment specific configuration between local development and remote deployment.

<code>
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
   "field_phone_nos",
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
   "field_phone_nos",
   "[relation]field_tags]",
   ],
};
export const frupal = process.env.NODE_ENV === "development" ? dev : prod;
</code>

#### Note:

Unless the 'Token' module is called and set, you will have no access to the functionality of the Profile context.

## The Login() Function.

Please note that there's no way to check if a user is already logged in. You have to create a logic to handle that check yourself.

5 variables may be provided for the Login function as named below:
<code>username, mail, password, loginType, action.</code>

At least one of username or mail (email) is needed with password to process signing in a user. When the email option is enabled, you'll have to explicitly set it using loginType= 'email' for it to be enabled.
You most likely need the 'Rest Email Login' drupal module for this to work, as the endpoint is used to communicate with the backend. That is: 'mysite.com/user/email-login?\_format=json'

Last but not the least, if you intend to execute a function if login is successful, or at any other statusCode response; please place your function in the 'action' property as an object with the key|values as action:
<code>{ statusCode: 200, func: processLoggedInAction }.</code>
statusCode may be ignored if you only want to execute the function on successful logged In at code 200. Full Login function sample should look like below:
<code>
Login({
username: "myName", //optional if loginType is set to email
mail: "myEmail@gmail.com", //optional. Must be provided if loginType is set to email
password: "myPassword.",
loginType: 'email', //optional
saveTokenToLocalStorage: true, //optional
action: {
statusCode: 200, //optional, defaults to 200
func: loggedInAction //you can import a callback function to be processed at a specific code response of your choice.
} //optional
}).then((response) => {
console.log(response); //process whatever you want to do with the response.
});
</code>

Login response is returned as an object
<code>
{
json: "returned jsonapi response",
log: "Any accompanying logging/message/notice/error",
statusCode: "200", //server response status code,
token: {}, //preferred logged in token with key and type. //only available if authenticationMethod is set in frupal.config.js
}
</code>

Site-wide token may be optionly set from Login() response by calling useContext and
re-exporting response to token as follow:
<code>
const { setToken } = useContext(Token);
setToken(response.token) // if authenticationMethod is set in frupal.config.js, otherwise use the approach below.
setToken({
type: "access_token", //if you're using access_token or provide any other you are using
key: response.json.access_token,
});
</code>
All available token can be seen in the response.json of the returned response.

## The Json() Function

By default Json() functions accepts an endpoint variable to fetch your async json call, or an object, or an array of objects for simultaneous asyncronous calls to endpoint(s). All object must have an endpoint key to work.
Your object variable should be in the below format:
<code>
{
endpoint: "node/article", //required
headers: {
"Content-Type": "application/vnd.api+json",
Accept: "application/vnd.api+json",
},
body: {},
method: "get",
};
</code>
Every key is optional except the endpoint, and are just available if you desire to make custom modifications. You will likely need the body option if you are making a POST, PATCH or DELETE requests.
Simultaneous or multiple asyc request should be in objects in arrays:
Json([
{endpoint: 'node/article', id: "req9", waitFor: "", },
{endpoint: 'node/page',id: "req9", waitFor: "",}
])
All request will be returned as one. Use 'id' to identify each request; if unspecified, the response will be assigned serially.
Note: The 'waitFor' will be used to implement dependent async calls but this feature is yet to be implemented.
Use: Json().then((response) => console.log(response)) to return your expected results when you need the data response.

## The Rest() Function

The Rest Function only accepts a string endpoint as variable.

## The ER() Function.

Using Drupal Entity Router module. Like Rest(), ER() Function only accepts a string endpoint as variable; this would be the url, or pathauto (if enabled) url, of the entity.

## Th SR() Function

Yet to be implemented.
