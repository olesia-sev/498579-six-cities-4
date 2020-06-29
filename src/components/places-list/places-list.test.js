import React from "react";
import renderer from "react-test-renderer";
import {PlacesList} from "./places-list";
import {cardDataArray} from "../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";

it(`Places list should be rendered`, () => {
  const tree = renderer
    .create(<Router><PlacesList offers = {cardDataArray} /></Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
