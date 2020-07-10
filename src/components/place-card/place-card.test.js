import React from "react";
import {PlaceCard} from "./place-card";
import renderer from "react-test-renderer";
import {cardDataArray, theme} from "../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";

it(`PlaceCard should be rendered`, () => {
  const tree = renderer
    .create(
        <Router>
          <PlaceCard
            theme={theme}
            offer={cardDataArray[0]}
          />
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
