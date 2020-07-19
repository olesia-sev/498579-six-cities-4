import React, {useEffect} from "react";
import leaflet from 'leaflet';
import {shallowEqual, useSelector} from "react-redux";

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
    if (activeCard && coords[i] === activeCard.coords) {
      leaflet
        .marker(coords[i], {icon: iconActive})
        .addTo(map);
    } else {
      leaflet
        .marker(coords[i], {icon})
        .addTo(map);
    }
  }
  return map;
};

const Map = React.memo(function Map() {

  const offers = useSelector((state) => {
    return state.offers.filter((offer) => offer.cityId === state.activeCityId);
  }, shallowEqual);

  const hoveredOffer = useSelector((state) => {
    return state.hoveredOffer;
  }, shallowEqual);

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

});

export default Map;
