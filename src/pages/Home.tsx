import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { CouldNotBeLoaded } from "../constants/messages";

import Product from "../models/product";
import FeaturedProduct from "../models/featuredProduct";
import CustomCarouselItem from "../models/customCarouselItem";

import ProductService from "../services/productService";
import FeaturedProductService from "../services/featuredProductService";

import CustomCarousel from "../components/CustomCarousel";
import CustomCard from "../components/CustomCard";
import CustomSpinner from "../components/CustomSpinner";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoaded, setProductsLoaded] = useState<boolean>(false);
  const [featuredProductsLoaded, setFeaturedProductsLoaded] = useState<boolean>(false);
  const [carouselItems, setCarouselItems] = useState<CustomCarouselItem[]>([]);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);

  const productService = new ProductService();
  const featuredProductService = new FeaturedProductService();

  useEffect(() => {
    return () => {
      productService.cancelToken.cancel();
      featuredProductService.cancelToken.cancel();
    };
  }, []);

  useEffect(() => {
    if (!productsLoaded) {
      fetchProducts()
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.data);
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
    if (!featuredProductsLoaded) {
      fetchFeaturedProducts()
        .then((response) => {
          if (response.data.success) {
            const featuredProducts: FeaturedProduct[] = response.data.data;
            const items = featuredProducts
              .sort((a, b) => b.productId - a.productId)
              .map((featuredProduct) => {
                return {
                  title: featuredProduct.name,
                  description: featuredProduct.description,
                  imgSrc: featuredProduct.imageUrl,
                };
              });
            setCarouselItems(items);
          }
        })
        .catch((errorResponse) => {
          if (!axios.isCancel(errorResponse)) {
            toast.error("Featured products" + CouldNotBeLoaded);
          }
        })
        .finally(() => setFeaturedProductsLoaded(true));
    }
  }, [featuredProductsLoaded]);

  useEffect(() => {
    if (productsLoaded && featuredProductsLoaded) {
      setDataLoaded(true);
    } else {
      setDataLoaded(false);
    }
  }, [productsLoaded, featuredProductsLoaded]);

  const fetchProducts = () => productService.getList();

  const fetchFeaturedProducts = () => featuredProductService.getList();

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page." />
      </Helmet>
      {dataLoaded ? (
        <>
          <CustomCarousel carouselItems={carouselItems} />
          <Container className="my-5">
            <Row xs={1} md={2} lg={3} className="g-4">
              {products
                .sort((a, b) => b.id - a.id)
                .slice(0, 6)
                .map((product) => (
                  <Col key={product.id}>
                    <Link to={"/"} className="text-decoration-none text-black">
                      <CustomCard
                        title={product.name}
                        description={product.description}
                        imgSrc="../assets/img/react.png"
                      />
                    </Link>
                  </Col>
                ))}
            </Row>
          </Container>
        </>
      ) : (
        <CustomSpinner />
      )}
    </>
  );
};
export default Home;
