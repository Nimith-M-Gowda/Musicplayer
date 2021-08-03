import React from "react";
import { Card, CardColumns } from "react-bootstrap";

export default function TrackCard({ image, name, numberOfTracks }) {
  return (
    <CardColumns>
      <Card>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>Track Name : {name} </Card.Title>
          <Card.Text>
            <h3>Number of Tracks</h3> : {numberOfTracks}
          </Card.Text>
        </Card.Body>
      </Card>
    </CardColumns>
  );
}
