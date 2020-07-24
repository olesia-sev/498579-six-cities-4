import React, {useEffect, useMemo, useRef} from "react";
import PropTypes from 'prop-types';
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

const icon = leaflet.icon(mapConfig.mapIcon);
const iconActive = leaflet.icon(mapConfig.mapActiveIcon);

const renderMap = () => {
  const map = leaflet.map(`map`, mapConfig);

  map.setView(mapConfig.city, mapConfig.zoom);

  leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);

  return map;
};

const Map = React.memo(function Map({offers, hoveredOffer, activeCityId}) {
  const mapRef = useRef(null);

  const currentCityOffers = useMemo(() => offers.filter(
      (offer) => offer.cityId === activeCityId),
  [activeCityId, offers]
  );

  useEffect(() => {
    mapRef.current = renderMap();
    return () => {
      mapRef.current.remove();
    };
  }, []);

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
  activeCityId: PropTypes.number.isRequired,
};

const mapStateToProps = ({hoveredOffer, offers, activeCityId}) => {
  return {hoveredOffer, offers, activeCityId};
};

export default connect(mapStateToProps)(Map);
