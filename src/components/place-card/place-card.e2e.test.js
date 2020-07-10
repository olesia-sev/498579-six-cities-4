import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCard} from "./place-card";
import {cardDataArray, theme} from "../../utils/test.utils";
import {Property} from "../property/property";
import {BrowserRouter as Router} from "react-router-dom";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Place card test`, () => {
  it(`Title's link is correct`, () => {
    const placeCard = mount(
        <Router>
          <PlaceCard
            theme={theme}
            offer={cardDataArray[0]}
          >
            <Property offers={cardDataArray}/>
          </PlaceCard>
        </Router>
    );
    expect(placeCard.find(`Link`).props().to).toBe(`/offers/${cardDataArray[0].id}`);
  });

  it(`Place card has proper classes according to its theme`, () => {
    const placeCard = mount(
        <Router>
          <PlaceCard
            theme={theme}
            offer={cardDataArray[0]}
          >
            <Property offers={cardDataArray}/>
          </PlaceCard>
        </Router>
    );
    expect(placeCard.find(`article`).hasClass(`cities__place-card place-card`)).toBe(true);
    expect(placeCard.find(`.place-card__image-wrapper`).hasClass(`cities__image-wrapper`)).toBe(true);
  });

});
