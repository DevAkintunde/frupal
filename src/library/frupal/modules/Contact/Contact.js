import { frupal } from "../../defaultConfig";

export const Contact = (data) => {
  const json = frupal.remote.json;
  // const data = {
  //   form: "feedback",
  //   name: "person submitting the form",
  //   mail: "email of user submitting the form",
  //   subject: "subject of message",
  //   message: "message body",
  //   profile: "authenticated profile object data",
  // };

  return fetch(
    json +
      (data && data.form
        ? "contact_message/" + data.form
        : "contact_message/feedback"),
    {
      method: "POST",
      headers: {
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type:
            data && data.form
              ? "contact_message--" + data.form
              : "contact_message--feedback",
          attributes: {
            mail:
              data && data.profile && data.profile.mail
                ? data.profile.mail
                : data && data.mail
                ? data.mail
                : "",
            name:
              data && data.profile && data.profile.display_name
                ? data.profile.display_name
                : data && data.name
                ? data.name
                : "Guest",
            subject: data && data.subject ? data.subject : "General",
            message: data && data.message ? data.message : "",
          },
        },
      }),
    }
  )
    .then((res) => {
      // console.log(res);
      if (res.status !== 201) {
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
        log: "Unable to submit this form.",
      };
    });
};
