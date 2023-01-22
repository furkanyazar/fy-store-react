import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { setShowLoginModal, setShowRegisterModal } from "../store/slices/modalSlice";

import { CouldNotBeLoaded } from "../constants/messages";

import Category from "../models/category";
import CategoryService from "../services/categoryService";

import CustomSpinner from "../components/CustomSpinner";
import LoginModal from "../components/Modals/LoginModal";
import RegisterModal from "../components/Modals/RegisterModal";

const Header = ({ setProductsLoaded }: Props) => {
  const dispatch = useAppDispatch();

  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  const categoryService = new CategoryService();

  useEffect(() => {
    return () => {
      categoryService.cancelToken.cancel();
    };
  }, []);

  useEffect(() => {
    if (!categoriesLoaded) {
      fetchCategories()
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
        .finally(() => setCategoriesLoaded(true));
    }
  }, [categoriesLoaded]);

  const fetchCategories = () => categoryService.getList();

  const toggleExpanded = () => setExpanded(!expanded);

  const handleShowLoginModal = () => {
    dispatch(setShowLoginModal(true));
    toggleExpanded();
  };

  const handleShowRegisterModal = () => {
    dispatch(setShowRegisterModal(true));
    toggleExpanded();
  };

  const handleClickShop = () => {
    setProductsLoaded(false);
    toggleExpanded();
  };

  return (
    <>
      <LoginModal />
      <RegisterModal />

      <Navbar bg="light" expand="lg" sticky="top" onToggle={setExpanded} expanded={expanded}>
        <Container>
          <Link to={"/"}>
            <Navbar.Brand onClick={toggleExpanded}>FY Store</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/"}>
                <Nav.Link as={"div"} onClick={toggleExpanded}>
                  Home
                </Nav.Link>
              </Link>
              <Link to={"/shop"}>
                <Nav.Link as={"div"} onClick={handleClickShop}>
                  Shop
                </Nav.Link>
              </Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                {categoriesLoaded ? (
                  categories.map((category) => (
                    <Link key={category.id} to={"/shop/" + category.id}>
                      <NavDropdown.Item as={"div"} onClick={handleClickShop}>
                        {category.name}
                      </NavDropdown.Item>
                    </Link>
                  ))
                ) : (
                  <CustomSpinner />
                )}
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleShowLoginModal}>Login</Nav.Link>
              <Nav.Link onClick={handleShowRegisterModal}>Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;

interface Props {
  setProductsLoaded: Function;
}
