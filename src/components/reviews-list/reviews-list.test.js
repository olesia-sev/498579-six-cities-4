import React from "react";
import renderer from "react-test-renderer";
import {ReviewsList} from "./reviews-list";
import {cardDataArray} from "../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";

it(`Reviews list should be rendered`, () => {
  const tree = renderer
    .create(<Router>
      <ReviewsList reviews={cardDataArray[0].reviews} />
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
