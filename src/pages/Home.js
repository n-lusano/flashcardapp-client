import React, { useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  // NB RICORDA CHE AL POSTO DI HOMEPAGE VA LA LINGUA SELEZIONATA as props
  return (
    <div>
      <Jumbotron>
        <h1>Selected/default language here</h1>
      </Jumbotron>
    </div>
  );
};

export default Home;
