import React from "react";
import renderer from "react-test-renderer";
import {FavouritesItem} from "./favourites-item";
import {cardDataArray} from "../../utils/test.utils";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {NameSpace} from "../../reducer/name-space";


const mockStore = configureStore([]);

it(`FavouritesItem should be rendered`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      offers: cardDataArray,
    },
  });

  const tree = renderer
    .create(
        <Router>
          <Provider store={store}>
            <FavouritesItem favourites={cardDataArray} city={cardDataArray[0].cityId} />
          </Provider>
        </Router>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
