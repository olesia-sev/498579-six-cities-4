import React from "react";
import {Review} from "./review";
import renderer from "react-test-renderer";
import {cardDataArray} from "../../utils/test.utils";

it(`Review should be rendered`, () => {
  const tree = renderer
    .create(
        <Review review={cardDataArray[0].reviews[0]} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
