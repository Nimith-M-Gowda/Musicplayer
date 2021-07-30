import React from "react";
import { Card, CardColumns } from "react-bootstrap";

export default function Cards({
  image,
  name,
  followers,
  spotifyProfile,
  popularity,
}) {
  return (
    <CardColumns>
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>Name : {name} </Card.Title>
          <Card.Text>
            {" "}
            <h3>Followers </h3> :{followers}{" "}
          </Card.Text>

          <Card.Link href={spotifyProfile}>Spotify Profile</Card.Link>

          <Card.Text>
            <h3>Popularity</h3> : {popularity}
          </Card.Text>
        </Card.Body>
      </Card>
    </CardColumns>
  );
}
