import React from "react";
import renderer from "react-test-renderer";
import FavouriteButton from "./favourite-button";
import {cardDataArray, favButtonTheme} from "../../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../../reducer/name-space";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

it(`FavouriteButton should be rendered`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      offers: cardDataArray,
    },
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <FavouriteButton
              id={cardDataArray[0].id}
              theme={favButtonTheme}
              saved={true}
            />
          </Provider>
        </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
