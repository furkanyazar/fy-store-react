import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

import CustomCarouselItem from "../models/customCarouselItem";

const CustomCarousel = ({ carouselItems }: Props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => setIndex(selectedIndex);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      {carouselItems.map((carouselItem, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={carouselItem.imgSrc} />
          <Carousel.Caption>
            <h3>{carouselItem.title}</h3>
            <p>
              {carouselItem.description.length > 70
                ? carouselItem.description.substring(0, carouselItem.description.substring(0, 70).lastIndexOf(" ")) +
                  "..."
                : carouselItem.description}
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default CustomCarousel;

interface Props {
  carouselItems: CustomCarouselItem[];
}
