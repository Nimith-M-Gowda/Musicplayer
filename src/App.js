import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import Form from "./components/Form";
import useAccesstoken from "./hooks/useAccesstoken";
import Cards from "./components/Cards";
import Modals from "./components/Modals";

function App() {
  const [accesstoken, setAccesstoken] = useState("");
  const [searchTerm, setSearchterm] = useState("");
  const [searchResults, setSearchresults] = useState("");
  const [artistId, setArtistid] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = useAccesstoken();

  useEffect(() => setAccesstoken(token), [token]);
  useEffect(() => {
    if (searchTerm.length > 1) getArtist(searchTerm);
  }, [searchTerm]);

  const getArtist = (nameSearch) => {
    axios(
      `https://api.spotify.com/v1/search?q=${nameSearch}&type=artist&limit=10`,
      {
        headers: {
          Authorization: "Bearer " + accesstoken,
          Accept: "application/json",
        },
        method: "GET",
      }
    )
      .then((response) => {
        console.log(response?.data?.artists?.items);
        setSearchresults(response.data.artists.items);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderResults = (searchResults) => {
    return searchResults.map((eachartist, index) => (
      <div
        className="container"
        onClick={() => {
          handleShow();
          setArtistid(eachartist.id);
        }}
      >
        <Cards
          key={index}
          name={eachartist.name}
          image={eachartist?.images[0]?.url}
          followers={eachartist.followers.total}
          popularity={eachartist.popularity}
          spotifyProfile={eachartist.external_urls.spotify}
        />
      </div>
    ));
  };

  return show ? (
    <Modals show={show} onHide={handleClose} Id={artistId} />
  ) : (
    <div className="App">
      <Form setSearchterm={setSearchterm} />
      {searchResults && renderResults(searchResults)}
    </div>
  );
}

export default App;
