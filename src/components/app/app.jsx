import React from "react";
import {Main} from '../main/main';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {optionsAmount} = props;

  return <Main
    optionsAmount = {optionsAmount}
  />;
};

export {App};
