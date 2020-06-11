import React from "react";
import ReactDOM from "react-dom";
import {App} from "./components/app/app.jsx";

const init = () => {
  const settings = {
    optionsAmount: 500,
  };

  ReactDOM.render(
      <App
        optionsAmount = {settings.optionsAmount}
      />,
      document.querySelector(`#root`)
  );
};

init();
