import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import CustomCarousel from "../components/CustomCarousel";
import CustomCard from "../components/CustomCard";

import CustomCarouselItem from "../models/customCarouselItem";

const exampleItems: CustomCarouselItem[] = [
  { imgSrc: "../assets/img/react.png", imgAlt: "", title: "Carousel title", description: "Lorem ipsum." },
  { imgSrc: "../assets/img/react.png", imgAlt: "", title: "Carousel title", description: "Lorem ipsum." },
  { imgSrc: "../assets/img/react.png", imgAlt: "", title: "Carousel title", description: "Lorem ipsum." },
];

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page." />
      </Helmet>
      <CustomCarousel items={exampleItems} />
      <Container className="my-5">
        <Row xs={1} md={2} lg={3} className="g-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <Col key={idx}>
              <Link to={"/"} className="text-decoration-none text-black">
                <CustomCard imgSrc="../assets/img/react.png" imgAlt="" title="Card title" description="Lorem ipsum." />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
export default Home;
