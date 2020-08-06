import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Sorting from "./sorting";
import {NameSpace} from "../../reducer/name-space";
import {cardDataArray} from "../../utils/test.utils";
import {SORT_TYPES} from "../../utils/utils";
import {ActionCreator} from "../../reducer/app/app";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`Sorting test`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      offers: cardDataArray,
    },
    [NameSpace.APP]: {
      activeSortingType: SORT_TYPES.POPULAR,
      isSortingListOpened: false,
    },
  });

  it(`Sorting list should open on click correctly`, () => {
    const sorting = mount(
        <Provider store={store}>
          <Sorting />
        </Provider>
    );

    const spy = jest.spyOn(ActionCreator, `toggleSorting`);

    const sortingOpener = sorting.find(`.places__sorting-type`);
    sortingOpener.simulate(`click`);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(`Sorting should change on sorting type click`, () => {
    const sorting = mount(
        <Provider store={store}>
          <Sorting />
        </Provider>
    );

    const spy = jest.spyOn(ActionCreator, `sortOffers`);

    const sortingTypeItem = sorting.find(`li.places__option`).at(2);
    sortingTypeItem.simulate(`click`);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
