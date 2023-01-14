import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import moment from "moment";

const ListExample = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to={"/"} className="text-decoration-none">
          <Navbar.Brand>FY Store</Navbar.Brand>
        </Link>
        <Navbar.Text>All rights reserved. FY Store © {moment().get("years")}</Navbar.Text>
      </Container>
    </Navbar>
  );
};
export default ListExample;
