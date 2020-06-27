import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCard} from "./place-card";
import {cardDataArray} from "../../utils/test.utils";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Place card test`, () => {
  it(`Active card saved in state`, () => {
    const evt = {
      preventDefault: jest.fn(),
    };

    const setActiveOffer = jest.fn();
    const placeCard = shallow(
        <PlaceCard
          offer={cardDataArray[0]}
          setActiveOffer={setActiveOffer}
        />
    );

    const offerTitle = placeCard.find(`.place-card__name a`);
    offerTitle.simulate(`click`, evt);

    expect(evt.preventDefault).toHaveBeenCalledTimes(1);
    expect(setActiveOffer).toHaveBeenCalledTimes(1);
    expect(setActiveOffer).toHaveBeenCalledWith(cardDataArray[0]);
  });
});
