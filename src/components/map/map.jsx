import React, {useEffect, useMemo, useRef} from "react";
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from "react-redux";
import {offersTypeArray, offerType} from "../../prop-types/prop-types";
import {getActiveCity, getFilteredOffers} from "../../reducer/data/selectors";
import {getHoveredOffer} from "../../reducer/app/selectors";

const mapConfig = {
  zoomControl: false,
  marker: true,
  mapIcon: {
    iconUrl: `/img/pin.svg`,
    iconSize: [30, 30]
  },
  mapActiveIcon: {
    iconUrl: `/img/pin-active.svg`,
    iconSize: [30, 30]
  }
};

const icon = leaflet.icon(mapConfig.mapIcon);
const iconActive = leaflet.icon(mapConfig.mapActiveIcon);

const renderMap = (city, zoom) => {
  const map = leaflet.map(`map`, mapConfig);

  map.setView(city, zoom);

  leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);

  return map;
};

const Map = React.memo(function Map({offers, hoveredOffer, activeCity}) {
  const mapRef = useRef(null);

  const currentCityOffers = useMemo(() => offers.filter(
      (offer) => offer.cityId === activeCity.id),
  [activeCity, offers]
  );

  useEffect(() => {
    if (activeCity) {
      mapRef.current = renderMap(
          [activeCity.location.latitude, activeCity.location.longitude],
          activeCity.location.zoom
      );
    }

    return () => {
      mapRef.current.remove();
    };
  }, [activeCity]);

  useEffect(() => {
    const coords = currentCityOffers.map((offer) => offer.coords);

    const placemarks = [];

    for (let i = 0; i < coords.length; i++) {
      const isActive = hoveredOffer && coords[i] === hoveredOffer.coords;
      const placemark = leaflet.marker(coords[i], {icon: isActive ? iconActive : icon})
        .addTo(mapRef.current);

      placemarks.push(placemark);
    }

    return () => {
      placemarks.forEach((placemark) => {
        mapRef.current.removeLayer(placemark);
      });
    };
  }, [currentCityOffers, hoveredOffer]);

  return (
    <div id="map" />
  );
});

Map.propTypes = {
  offers: offersTypeArray,
  hoveredOffer: offerType,
  activeCity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  return {
    offers: getFilteredOffers(state),
    hoveredOffer: getHoveredOffer(state),
    activeCity: getActiveCity(state),
  };
};

export default connect(mapStateToProps)(Map);
