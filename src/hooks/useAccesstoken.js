import React, { useState, useEffect } from "react";
import axios from "axios";

function useAccesstoken() {
  const [data, setdata] = useState("");
  useEffect(() => {
    axios("https://accounts.spotify.com/api/token", {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            process.env.REACT_APP_CLIENT_ID +
              ":" +
              process.env.REACT_APP_CLIENT_SECRET
          ),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    })
      .then((response) => {
        console.log(
          "🚀 ~ file: useAccesstoken.js ~ line 22 ~ .then ~ response",
          response
        );

        setdata(response.data.access_token);
      })

      .catch((e) => {
        setdata(e);
      });
  }, []);

  return data;
}

export default useAccesstoken;
