import React from "react";
import {App} from "./app";
import renderer from "react-test-renderer";

const settings = {
  optionsAmount: 10,
  placeCardTitles: [
    `Beautiful flat`,
    `Wood flat`,
    `Big bed flat`
  ],
};

it(`App should be rendered`, () => {
  const tree = renderer
    .create(<App
      optionsAmount = {settings.optionsAmount}
      cardTitles = {settings.placeCardTitles}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
