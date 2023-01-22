import React from "react";
import { Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Not Found page." />
      </Helmet>
      <Container className="my-3">
        <Row>Not found page.</Row>
      </Container>
    </>
  );
};
export default NotFound;
