import React, { useState, useEffect } from "react";

function Playlist() {
  const [accessToken, setAccessToken] = useState("");
  const [accessURL, setAccessURL] = useState("");

  useEffect(() => {
    console.log("the accesstoken is", accessToken);
    getTokenfromWindowhref();
  }, [accessToken, accessURL]);

  const getTokenfromWindowhref = async () => {
    const TokenMatch = window.location.href.match(/access_token=([^&]*)/);
    if (TokenMatch) {
      await setAccessToken(TokenMatch[1]);
      return TokenMatch;
    }
    setAccessToken("");
    return;
  };

  const getAuthorizeToken = () => {
    if (accessToken) {
      setAccessToken(accessToken);
    } else {
      getTokenfromWindowhref();
      if (accessToken) {
        console.group("inside func IF ");
      } else {
        const url = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
        setAccessURL(url);
        window.location.href = url;
      }
    }
  };
  {
    return !!accessToken ? (
      <div>
        {" "}
        <button>You are now connected to Spotify</button>
      </div>
    ) : (
      <div>
        <button
          onClick={() => {
            getAuthorizeToken();
          }}
        >
          Connect to Spotify and get playlist{" "}
        </button>
      </div>
    );
  }
}

export default Playlist;
