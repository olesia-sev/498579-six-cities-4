import React from "react";
import renderer from "react-test-renderer";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Map from "./map";
import {cardDataArray, citiesArray} from "../../utils/test.utils";
import {NameSpace} from "../../reducer/name-space";

const mockStore = configureStore([]);

it(`Map container should be rendered`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      offers: cardDataArray,
      cities: citiesArray,
      activeCityId: citiesArray[0].id,
    },
    [NameSpace.APP]: {
      hoveredOffer: undefined,
    },
  });

  const tree = renderer
    .create(<Router>
      <Provider store={store}>
        <Map/>
      </Provider>
    </Router>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
