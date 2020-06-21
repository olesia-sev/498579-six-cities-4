import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCard} from "./place-card";
import {cardDataArray} from "../../utils/test.utils";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Place card test`, () => {
  it(`Title button clicked`, () => {
    const onCardTitleClick = jest.fn();

    const placeCard = shallow(
        <PlaceCard
          offer={cardDataArray[0]}
          onCardTitleClick={onCardTitleClick}
        />
    );

    const titleButton = placeCard.find(`.place-card__name a`);
    titleButton.simulate(`click`);

    expect(onCardTitleClick.mock.calls.length).toBe(1);
  });

  it(`Hovered card saved in state`, () => {
    const onCardMouseEnter = jest.fn();
    const placeCard = shallow(
        <PlaceCard
          offer={cardDataArray[0]}
          setActiveOffer={onCardMouseEnter}
        />
    );

    const offer = placeCard.find(`.place-card`);
    offer.simulate(`mouseenter`);

    expect(onCardMouseEnter).toHaveBeenCalledTimes(1);
    expect(onCardMouseEnter).toHaveBeenCalledWith(cardDataArray[0]);
  });
});
