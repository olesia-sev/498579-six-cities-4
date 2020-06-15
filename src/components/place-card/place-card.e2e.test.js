import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {PlaceCard} from "./place-card";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Title button clicked`, () => {
  const onCardTitleClick = jest.fn();

  const placeCard = shallow(
      <PlaceCard
        title="Test title"
        onCardTitleClick={onCardTitleClick}
      />
  );

  const titleButton = placeCard.find(`.place-card__name a`);

  titleButton.props().onClick();

  expect(onCardTitleClick.mock.calls.length).toBe(1);

});
