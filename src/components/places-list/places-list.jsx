import React, {PureComponent} from 'react';
import {offersTypeArray} from '../../prop-types/prop-types';
import {PlaceCard} from '../place-card/place-card';

class PlacesList extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  setActiveOffer(offer) {
    this.setState(() => {
      return {activeCard: offer};
    });
  }

  render() {
    const {offers} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {
          offers.map((offer) => (
            <PlaceCard
              key={offer.id}
              offer={offer}
              setActiveOffer={this.setActiveOffer.bind(this)}
            />
          ))
        }
      </div>
    );
  }
}

PlacesList.propTypes = {
  offers: offersTypeArray,
};

const MemoizedPlacesList = React.memo(PlacesList);

export {MemoizedPlacesList as PlacesList};
