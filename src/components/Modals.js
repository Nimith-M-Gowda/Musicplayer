import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import TrackCard from "./TrackCard";
import useAccesstoken from "../hooks/useAccesstoken";
function Modals({ show, onHide, Id }) {
  const [topTracks, setToptracks] = useState("");
  const [artistId, setArtistid] = useState("");
  const [accesstoken, setAccesstoken] = useState("");

  const token = useAccesstoken();

  useEffect(() => {
    setArtistid(Id);
    setAccesstoken(token);
  }, [Id, token]);

  useEffect(() => {
    if (!!artistId && !!accesstoken) {
      console.log(
        "🚀 ~ file: Modals.js ~ line 19 ~ useEffect ~ accesstoken",
        accesstoken
      );
      getToptracks(artistId, accesstoken);
    }
  }, [accesstoken, artistId]);
  const getToptracks = (Id, token) => {
    console.log("🚀 ~ file: Modals.js ~ line 24 ~ getToptracks ~ token", token);
    axios(`https://api.spotify.com/v1/artists/${Id}/top-tracks?market=ES`, {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        setToptracks(response?.data?.tracks);
        console.log("top tracks are", response?.data?.tracks);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTrackslist = (tracks) => {
    console.log(
      "🚀 ~ file: Modals.js ~ line 47 ~ getTrackslist ~ tracks",
      tracks
    );
    return tracks.map((eachtracks, index) => (
      <div className="container">
        <TrackCard
          key={index}
          name={eachtracks?.name}
          releaseDate={eachtracks?.album?.release_date}
          image={eachtracks?.album?.images[0]?.url}
          album={eachtracks?.album?.name}
        />
      </div>
    ));
  };
  return topTracks ? (
    getTrackslist(topTracks)
  ) : (
    <Modal show={show} onHide={onHide}>
      <Modal.Title>Get Artist Top Tracks </Modal.Title>
      <Modal.Body>LOADING</Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Modals;
