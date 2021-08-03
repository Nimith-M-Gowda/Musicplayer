import React, { useState, useEffect } from "react";
import PlaylistCard from "./PlaylistCard";

function Playlist() {
  const [authorizeCode, setAuthorizecode] = useState("");
  const [accessURL, setAccessURL] = useState("");
  const [refreshtoken, setRefreshtoken] = useState("");
  const [accessToken, setaccessToken] = useState("");
  const [playlist, setPlaylist] = useState("");

  useEffect(() => {
    getTokenfromWindowhref();

    console.log(
      "🚀 ~ file: Playlist.js ~ line 12 ~ Playlist ~ authorizeCode",
      authorizeCode
    );
  }, [authorizeCode, accessURL]);

  useEffect(() => {
    console.log("inside useEffect refreshtoken", refreshtoken);
    if (refreshtoken) {
      getaccessToken();
    }
  }, [refreshtoken]);

  useEffect(() => {
    console.log("access Token is", accessToken);
  }, [accessToken]);

  useEffect(() => {
    console.log("playslist is ", playlist);
  }, [playlist]);
  const getTokenfromWindowhref = async () => {
    console.log("inside getTokenfromWindowhref");
    const TokenMatch = window.location.href.match(/code=([^&]*)/);
    if (TokenMatch) {
      await setAuthorizecode(TokenMatch[1]);

      if (!refreshtoken) {
        console.log("refreshtoken in getTokenfromWindowhref", refreshtoken);
        getrefreshtoken();
      }
      return TokenMatch;
    }
    setAuthorizecode("");
    return;
  };

  const getrefreshtoken = () => {
    fetch("https://accounts.spotify.com/api/token", {
      body: `client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&grant_type=authorization_code&code=${authorizeCode}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })
      .then((res) => res.json())
      .then((result) => setRefreshtoken(result.refresh_token))
      .catch((err) => console.log(err));
  };

  const getPlayList = async () => {
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => setPlaylist(result.items))
      .catch((err) => console.log(err));
  };

  const getaccessToken = () => {
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
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
      body: `grant_type=refresh_token&refresh_token=${refreshtoken}`,
    })
      .then((res) => res.json())
      .then((result) => setaccessToken(result.access_token))
      .catch((err) => console.log(err));
  };

  const renderPlaylist = (playlist) => {
    return playlist.map((data, item) => (
      <div>
        <PlaylistCard
          key={item}
          image={data.images[0].url}
          name={data.name}
          numberOfTracks={data.tracks.total}
        />
      </div>
    ));
  };

  const getAuthorizeCode = () => {
    if (authorizeCode) {
      console.group("inside IF ");
      setAuthorizecode(authorizeCode);
    } else {
      console.group("inside else ");
      getTokenfromWindowhref();
      if (authorizeCode) {
        console.group("inside IF 2");
      } else {
        console.group("inside else 2 ");
        const url = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&scope=playlist-modify-public&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
        setAccessURL(url);
        window.location.href = url;
      }
    }
  };
  {
    return !!authorizeCode ? (
      <div>
        {" "}
        <div>
          <button>You are now connected to Spotify</button>
        </div>
        <button onClick={() => getPlayList()}>Pull the playlist NOW</button>
        {playlist && renderPlaylist(playlist)}
      </div>
    ) : (
      <div>
        <button
          onClick={() => {
            getAuthorizeCode(authorizeCode);
          }}
        >
          Connect to Spotify and get playlist{" "}
        </button>
      </div>
    );
  }
}

export default Playlist;
