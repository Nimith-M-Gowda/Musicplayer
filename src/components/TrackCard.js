import React from "react";
import { Card, CardColumns } from "react-bootstrap";

export default function TrackCard({ image, name, album, releaseDate }) {
  return (
    <CardColumns>
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>Track Name : {name} </Card.Title>
          <Card.Text>
            <h3>Album Name</h3> : {album}
            <h3>Release Date</h3> : {releaseDate}
          </Card.Text>
        </Card.Body>
      </Card>
    </CardColumns>
  );
}
