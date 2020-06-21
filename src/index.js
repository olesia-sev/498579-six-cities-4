import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";
import offers from './mocks/offers';

const init = () => {
  const settings = {
    optionsAmount: 500,
    offers,
  };

  ReactDOM.render(
      <App {...settings}/>,
      document.querySelector(`#root`)
  );
};

init();
