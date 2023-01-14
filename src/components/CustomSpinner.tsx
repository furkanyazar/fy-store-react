import React from "react";
import { Container, Row, Spinner } from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <Container className="my-3">
      <Row className="justify-content-md-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Row>
    </Container>
  );
};
export default CustomSpinner;
