import React from "react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta name="description" content="Not Found page." />
      </Helmet>
      <p>Not found!</p>
    </>
  );
};
export default NotFound;
