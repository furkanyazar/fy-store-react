import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

import CustomCarouselItem from "../models/customCarouselItem";

const CustomCarousel = ({ items }: Props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => setIndex(selectedIndex);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {items.map((item, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={item.imgSrc} alt={item.imgAlt} />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default CustomCarousel;

interface Props {
  items: CustomCarouselItem[];
}
