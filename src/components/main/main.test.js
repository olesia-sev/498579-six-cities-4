import React from "react";
import {Main} from "./main";
import renderer from "react-test-renderer";
import {number, cardDataArray} from "../../utils/test.utils";

it(`Main should be rendered`, () => {
  const tree = renderer
    .create(<Main
      optionsAmount = {number}
      offers = {cardDataArray}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
