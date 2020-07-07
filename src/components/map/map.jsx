import React, {useEffect} from "react";
import leaflet from 'leaflet';
import {offersTypeArray} from "../../prop-types/prop-types";

const mapConfig = {
  center: [52.38333, 4.9],
  zoom: 12,
  zoomControl: false,
  marker: true,
  city: [52.38333, 4.9],
  mapIcon: {
    iconUrl: `/img/pin.svg`,
    iconSize: [30, 30]
  }
};

const renderMap = (coords) => {
  const icon = leaflet.icon(mapConfig.mapIcon);
  const map = leaflet.map(`map`, mapConfig);
  map.setView(mapConfig.city, mapConfig.zoom);

  leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);

  for (let i = 0; i < coords.length; i++) {
    leaflet
      .marker(coords[i], {icon, title: `marker-default`})
      .addTo(map);
  }
  return map;
};

const Map = ({offers}) => {

  useEffect(() => {

    const coords = [];
    offers.map((offer) => (
      coords.push(offer.coords)
    ));

    const map = renderMap(coords);

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
};

export {Map};
