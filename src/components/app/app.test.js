import React from "react";
import {App} from "./app";
import renderer from "react-test-renderer";
import {optionsAmount, cardDataArray} from "../../utils/test.utils";

it(`App should be rendered`, () => {
  const tree = renderer
    .create(<App
      optionsAmount = {optionsAmount}
      offers = {cardDataArray}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
