import React from "react";
import renderer from "react-test-renderer";
import {Footer} from "./footer";
import {BrowserRouter as Router} from "react-router-dom";

it(`Footer should be rendered`, () => {
  const tree = renderer
    .create(
        <Router>
          <Footer />
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
