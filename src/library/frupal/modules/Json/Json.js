import { frupal } from "../defaultConfig";

export const Json = (data) => {
  // only GET, POST, PATCH and DELETE are support.
  const json = frupal.remote.json;
  //   console.log(data);
  //   const data = {
  //     endpoint: "node/article",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/vnd.api+json",
  //     },
  //     body: {},
  //     method: "get",
  //     id: "req1",
  //     waitFor: "", // will be available once the dependency feature of async calls have been implemented.
  //   };

  //case 1; check if input data is a single object
  if (
    data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    data !== null
  ) {
    //convert imported headers toLowerCase to compare and avoid duplicates with defaults.
    let importedHeaders = {};
    if (data.headers && data.headers.length > 0) {
      let importedHeadersKeys = Object.keys(data.headers);
      importedHeadersKeys.forEach((key) => {
        if (data.headers[key]) {
          importedHeaders = {
            ...importedHeaders,
            [key.toLowerCase()]: data.headers[key].toLowerCase(),
          };
        }
      });
    }

    let headers = {
      accept: "application/vnd.api+json",
      "content-type": "application/vnd.api+json",
      ...importedHeaders,
    };
    let body = data.body ? JSON.stringify(data.body) : null;

    const getMethod = {
      method: "GET",
      headers: headers,
    };
    const postMethod = {
      method: "POST",
      headers: headers,
      body: body,
    };
    const patchMethod = {
      method: "PATCH",
      headers: headers,
      body: body,
    };
    const deleteMethod = {
      method: "DELETE",
      headers: headers,
      body: body,
    };

    const methodCall =
      data.method && data.method.toLowerCase() === "post"
        ? postMethod
        : data.method && data.method.toLowerCase() === "patch"
        ? patchMethod
        : data.method && data.method.toLowerCase() === "delete"
        ? deleteMethod
        : getMethod;

    return fetch(json + (data.endpoint ? data.endpoint : ""), methodCall)
      .then((res) => {
        if (!data.endpoint) {
          return { log: "No endpoint specified." };
        } else {
          if (res.status === 200) {
            return res.json();
          } else {
            return {
              status: res.status,
              statusText: res.statusText ? res.statusText : null,
            };
          }
        }
      })
      .then((resjson) => {
        return resjson;
      });
  }
  //case 2; check if imported data is an array of multiple objects
  else if (data && Array.isArray(data) && typeof data !== "string") {
    //case 2... allow to wait for dependent async to be implemented later;
    let promises = [];
    let promisesId = [];
    data.forEach((thisCall) => {
      let importedHeaders = {};
      if (thisCall.headers && thisCall.headers.length > 0) {
        let importedHeadersKeys = Object.keys(thisCall.headers);
        importedHeadersKeys.forEach((key) => {
          if (thisCall.headers[key]) {
            importedHeaders = {
              ...importedHeaders,
              [key.toLowerCase()]: thisCall.headers[key].toLowerCase(),
            };
          }
        });
      }

      let headers = {
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        ...importedHeaders,
      };
      let body = thisCall.body ? JSON.stringify(thisCall.body) : null;

      const getMethod = {
        method: "GET",
        headers: headers,
      };
      const postMethod = {
        method: "POST",
        headers: headers,
        body: body,
      };
      const patchMethod = {
        method: "PATCH",
        headers: headers,
        body: body,
      };
      const deleteMethod = {
        method: "DELETE",
        headers: headers,
        body: body,
      };

      const methodCall =
        thisCall.method && thisCall.method.toLowerCase() === "post"
          ? postMethod
          : thisCall.method && thisCall.method.toLowerCase() === "patch"
          ? patchMethod
          : thisCall.method && thisCall.method.toLowerCase() === "delete"
          ? deleteMethod
          : getMethod;

      let promiseCall = () =>
        new Promise(function (resolve) {
          resolve(fetch(json + thisCall.endpoint, methodCall));
        });
      promises.push(
        promiseCall().then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            return {
              status: res.status,
              statusText: res.statusText ? res.statusText : null,
            };
          }
        })
      );
      if (thisCall.id) {
        promisesId.push(thisCall.id);
      } else {
        promisesId.push(promisesId.length + 1);
      }
    });
    let getPromises = async () => {
      const reservedPromisesId = promisesId;
      promisesId = await Promise.all(promises);
      let requestedData = {};
      for (let i = 0; i < promisesId.length; i++) {
        requestedData = {
          [reservedPromisesId[i]]: promisesId[i],
          ...requestedData,
        };
      }
      return requestedData;
    };
    return getPromises();
  }
  //case 3; check if imported data is just an endpoint uri string
  else if (data) {
    return fetch(json + data, {
      method: "GET",
      headers: {
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
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
          log: "Endpoint not found.",
        };
      });
  }
  //case 4; export base /jsonapi endpoint if empty data
  else {
    return fetch(json, {
      method: "GET",
      headers: {
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((resjson) => {
        return resjson;
      });
  }
};
