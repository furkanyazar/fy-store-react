import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Form, ListGroup, Nav, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { CouldNotBeLoaded } from "../constants/messages";

import Product from "../models/product";
import Category from "../models/category";

import ProductService from "../services/productService";
import CategoryService from "../services/categoryService";

import CustomCard from "../components/CustomCard";
import CustomSpinner from "../components/CustomSpinner";
import DynamicQuery from "../models/dynamicQuery";

const Shop = ({ productsLoaded, setProductsLoaded }: Props) => {
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoaded, setCategoriesLoaded] = useState<boolean>(false);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const productService = new ProductService();
  const categoryService = new CategoryService();

  useEffect(() => {
    return () => {
      productService.cancelToken.cancel();
      categoryService.cancelToken.cancel();
    };
  }, []);

  useEffect(() => {
    if (!productsLoaded) {
      fetchProducts()
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.data);
            setFilteredProducts(response.data.data);
          }
        })
        .catch((errorResponse) => {
          if (!axios.isCancel(errorResponse)) {
            toast.error("Products" + CouldNotBeLoaded);
          }
        })
        .finally(() => setProductsLoaded(true));
    }
  }, [productsLoaded]);

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

  useEffect(() => {
    if (productsLoaded && categoriesLoaded) {
      setDataLoaded(true);
    } else {
      setDataLoaded(false);
    }
  }, [productsLoaded, categoriesLoaded]);

  const fetchProducts = () => {
    if (categoryId) {
      const query: DynamicQuery = {
        Filter: {
          Field: "categoryId",
          Operator: "eq",
          Value: categoryId,
        },
      };

      return productService.getListByDynamic(query);
    }

    return productService.getList();
  };

  const fetchCategories = () => categoryService.getList();

  const searchInputOnChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredProducts(
      products.filter((product) => product.name.toLowerCase().includes(e.currentTarget.value.toLowerCase()))
    );
  };

  const categoryListOnClickEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    navigate("/shop/" + e.currentTarget.value);
    setProductsLoaded(false);
  };

  return (
    <>
      <Helmet>
        <title>Shop</title>
        <meta name="description" content="Shop page." />
      </Helmet>
      {dataLoaded ? (
        <Container className="my-5">
          <Row className="g-4">
            <Col className="col-3">
              <Nav className="flex-column">
                <Nav.Item>
                  <ListGroup as="ul">
                    {categories.map((category) => (
                      <ListGroup.Item
                        key={category.id}
                        as="li"
                        active={category.id === parseInt(categoryId)}
                        value={category.id}
                        onClick={categoryListOnClickEvent}
                      >
                        {category.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Nav.Item>
              </Nav>
            </Col>
            <Col>
              <Row className="mb-3">
                <Form.Control placeholder="Search" onChange={searchInputOnChangeEvent} />
              </Row>
              <Row xs={1} md={2} lg={3} className="g-4">
                {filteredProducts
                  .sort((a, b) => b.id - a.id)
                  .map((product) => (
                    <Col key={product.id}>
                      <Link to={"/shop"} className="text-decoration-none text-black">
                        <CustomCard
                          title={product.name}
                          description={product.description}
                          imgSrc="../assets/img/react.png"
                        />
                      </Link>
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <CustomSpinner />
      )}
    </>
  );
};
export default Shop;

interface Props {
  productsLoaded: boolean;
  setProductsLoaded: Function;
}
