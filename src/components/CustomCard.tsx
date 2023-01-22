import React from "react";
import { Card } from "react-bootstrap";

const CustomCard = ({ title, description, imgSrc }: Props) => {
  return (
    <Card>
      <Card.Img variant="top" src={imgSrc} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description.length > 60
            ? description.substring(0, description.substring(0, 60).lastIndexOf(" ")) + "..."
            : description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default CustomCard;

interface Props {
  title: string;
  description: string;
  imgSrc: string;
}
