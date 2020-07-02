import React, {useEffect} from "react";
import leaflet from 'leaflet';
import {offersTypeArray} from "../../prop-types/prop-types";

const renderMap = (coords) => {
  const city = [52.38333, 4.9];
  const icon = leaflet.icon({
    iconUrl: `/img/pin.svg`,
    iconSize: [30, 30]
  });
  const zoom = 12;
  const map = leaflet.map(`map`, {
    center: city,
    zoom,
    zoomControl: false,
    marker: true
  });
  map.setView(city, zoom);

  leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(map);

  for (let i = 0; i < coords.length; i++) {
    leaflet
      .marker(coords[i], {icon})
      .addTo(map);
  }
};

const Map = ({offers}) => {

  useEffect(() => {
    const coords = [];
    offers.map((offer) => (
      coords.push(offer.coords)
    ));
    renderMap(coords);
  });

  return (
    <div id="map" style={{width: `100%`, height: `100%`}} />
  );

};

Map.propTypes = {
  offers: offersTypeArray,
};

export {Map};
