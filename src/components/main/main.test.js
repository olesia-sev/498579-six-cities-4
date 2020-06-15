import React from "react";
import {Main} from "./main";
import renderer from "react-test-renderer";

const settings = {
  optionsAmount: 10,
  placeCardTitles: [
    `Beautiful apartment`,
    `Wood place`,
    `Big bed apartment`
  ],
};

it(`Card should have a title`, () => {
  const tree = renderer
    .create(<Main
      optionsAmount = {settings.optionsAmount}
      cardTitles = {settings.placeCardTitles}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
