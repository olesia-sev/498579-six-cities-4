import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";

const init = () => {
  const settings = {
    optionsAmount: 500,
    cardTitles: [
      `Beautiful & luxurious apartment at great location`,
      `Wood and stone place`,
      `Nice, cozy, warm big bed apartment`,
      `Nice, cozy, warm big bed apartment`
    ],
  };

  ReactDOM.render(
      <App {...settings}/>,
      document.querySelector(`#root`)
  );
};

init();
