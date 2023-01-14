import React from "react";
import { Routes, Route } from "react-router";
import { Helmet } from "react-helmet";
import { ToastContainer } from "react-toastify";

import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Helmet titleTemplate="%s | FyStore" defaultTitle="FyStore" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
    </>
  );
}
export default App;
