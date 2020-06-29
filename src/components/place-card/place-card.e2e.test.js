import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCard} from "./place-card";
import {cardDataArray} from "../../utils/test.utils";
import {PlaceCardDetail} from "../place-card-detail/place-card-detail";

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`Place card test`, () => {
  it(`Title's link is correct`, () => {

    const placeCard = shallow(
        <PlaceCard
          offer={cardDataArray[0]}
        >
          <PlaceCardDetail offers={cardDataArray}/>
        </PlaceCard>
    );

    expect(placeCard.find(`Link`).props().to).toBe(`/offers/${cardDataArray[0].id}`);

  });
});
