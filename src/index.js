import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";

const init = () => {
  const settings = {
    optionsAmount: 500,
    placeCardTitles: [
      `Beautiful & luxurious apartment at great location`,
      `Wood and stone place`,
      `Nice, cozy, warm big bed apartment`
    ],
  };

  ReactDOM.render(
      <App
        optionsAmount = {settings.optionsAmount}
        cardTitles = {settings.placeCardTitles}
      />,
      document.querySelector(`#root`)
  );
};

init();
