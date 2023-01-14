import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { CouldNotBeLoaded } from "../constants/messages";

import Category from "../models/category";

import CategoryService from "../services/categoryService";

import CustomSpinner from "../components/CustomSpinner";

const Header = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState<boolean>(false);

  const categoryService = new CategoryService();

  useEffect(() => {
    if (!categoriesLoaded) {
      fetchCategories();
    }
  }, [categoriesLoaded]);

  const fetchCategories = () => {
    categoryService
      .getList()
      .then((response) => {
        if (response.data.success) {
          setCategories(response.data.data);
        }
      })
      .catch((errorResponse) => {
        if (!axios.isCancel(errorResponse)) {
          toast.error("Categories" + CouldNotBeLoaded);
        }
      })
      .finally(() => {
        setCategoriesLoaded(true);
      });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link to={"/"} className="text-decoration-none">
          <Navbar.Brand>FY Store</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to={"/"} className="text-decoration-none">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {categoriesLoaded ? (
                categories.map((category) => (
                  <Link to={"/"} className="text-decoration-none">
                    <NavDropdown.Item key={category.id}>{category.name}</NavDropdown.Item>
                  </Link>
                ))
              ) : (
                <CustomSpinner />
              )}
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link>Login</Nav.Link>
            <Nav.Link>Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Header;
