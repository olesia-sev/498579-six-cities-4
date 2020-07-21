import React, {useEffect} from "react";
import leaflet from 'leaflet';
import {connect} from "react-redux";
import {offersTypeArray, offerType} from "../../prop-types/prop-types";

const mapConfig = {
  center: [52.38333, 4.9],
  zoom: 12,
  zoomControl: false,
  marker: true,
  city: [52.38333, 4.9],
  mapIcon: {
    iconUrl: `/img/pin.svg`,
    iconSize: [30, 30]
  },
  mapActiveIcon: {
    iconUrl: `/img/pin-active.svg`,
    iconSize: [30, 30]
  }
};

const renderMap = (coords, activeCard) => {
  const icon = leaflet.icon(mapConfig.mapIcon);
  const iconActive = leaflet.icon(mapConfig.mapActiveIcon);
  const map = leaflet.map(`map`, mapConfig);
  map.setView(mapConfig.city, mapConfig.zoom);

  leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);

  for (let i = 0; i < coords.length; i++) {
    const isActive = activeCard && coords[i] === activeCard.coords;
    leaflet.marker(coords[i], {icon: isActive ? iconActive : icon})
      .addTo(map);
  }
  return map;
};

const Map = ({offers, hoveredOffer}) => {
  useEffect(() => {

    const coords = [];
    offers.map((offer) => (
      coords.push(offer.coords)
    ));

    const map = renderMap(coords, hoveredOffer);

    return () => {
      map.remove();
    };
  }, [offers]);

  return (
    <div id="map" />
  );
};

Map.propTypes = {
  offers: offersTypeArray,
  hoveredOffer: offerType,
};

const mapStateToProps = (state) => {
  const currentCityOffers = state.offers.filter((offer) => offer.cityId === state.activeCityId);
  return {
    offers: currentCityOffers,
    hoveredOffer: state.hoveredOffer,
  };
};

export default connect(mapStateToProps)(Map);
