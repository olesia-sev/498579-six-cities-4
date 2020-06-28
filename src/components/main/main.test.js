import React from "react";
import {Main} from "./main";
import renderer from "react-test-renderer";
import {optionsAmount, cardDataArray} from "../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";

it(`Main should be rendered`, () => {
  const tree = renderer
    .create(<Router>
      <Main
        optionsAmount = {optionsAmount}
        offers = {cardDataArray}
      />
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
