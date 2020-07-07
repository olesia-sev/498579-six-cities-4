import React from "react";
import renderer from "react-test-renderer";
import {cardDataArray} from "../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";
import {Map} from "./map";

it(`Map container should be rendered`, () => {
  const tree = renderer
    .create(<Router>
      <Map
        offers = {cardDataArray}
      />
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
