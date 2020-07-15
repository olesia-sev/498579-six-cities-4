import React from "react";
import renderer from "react-test-renderer";
import {MainEmpty} from "./main-empty";

it(`Empty main page should be rendered`, () => {
  const tree = renderer
    .create(
        <MainEmpty />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
