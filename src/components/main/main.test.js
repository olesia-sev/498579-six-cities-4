import React from "react";
import {Main} from "./main";
import renderer from "react-test-renderer";
import {optionsAmount, cardDataArray, emptyFunction} from "../../utils/test.utils";

it(`Main should be rendered`, () => {
  const tree = renderer
    .create(<Main
      setActiveOffer = {emptyFunction}
      optionsAmount = {optionsAmount}
      offers = {cardDataArray}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
