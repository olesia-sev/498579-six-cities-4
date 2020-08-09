import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import PlaceCard from "./place-card";
import {cardDataArray, theme} from "../../utils/test.utils";
import Property from "../property/property";
import {BrowserRouter as Router} from "react-router-dom";
import {NameSpace} from "../../reducer/name-space";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`Place card test`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      activeCityId: `Amsterdam`,
      offers: cardDataArray,
    },
  });

  it(`Title's link is correct`, () => {
    const placeCard = mount(
        <Router>
          <Provider store={store}>
            <PlaceCard
              theme={theme}
              offer={cardDataArray[0]}
            >
              <Property offers={cardDataArray}/>
            </PlaceCard>
          </Provider>
        </Router>
    );
    expect(placeCard.find(`.place-card__name Link`).props().to).toBe(`/offers/${cardDataArray[0].id}`);
  });

  it(`Place card has proper classes according to its theme`, () => {
    const placeCard = mount(
        <Router>
          <Provider store={store}>
            <PlaceCard
              theme={theme}
              offer={cardDataArray[0]}
            >
              <Property offers={cardDataArray}/>
            </PlaceCard>
          </Provider>
        </Router>
    );
    expect(placeCard.find(`article`).hasClass(`cities__place-card place-card`)).toBe(true);
    expect(placeCard.find(`.place-card__image-wrapper`).hasClass(`cities__image-wrapper`)).toBe(true);
  });

});
