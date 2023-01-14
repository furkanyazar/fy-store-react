import React from "react";
import { Card } from "react-bootstrap";

const CustomCard = ({ imgSrc, imgAlt, title, description }: Props) => {
  return (
    <Card>
      <Card.Img variant="top" src={imgSrc} alt={imgAlt} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default CustomCard;

interface Props {
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}
