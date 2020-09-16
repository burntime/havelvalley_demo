import 'ol/ol.css';
import { Map, View, Feature, Overlay} from 'ol';
import { fromLonLat } from 'ol/proj'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';

import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import {Icon, Style} from 'ol/style';

window.valley = window.valley || {};

const initMap = (mapEntrysArray) => {
  console.log('initMap', mapEntrysArray);

  const mapFeatureArray = [];
  mapEntrysArray.forEach((entry, key)=> {
    mapFeatureArray.push(new Feature({
      geometry: new Point(fromLonLat([entry.lon, entry.lat])),
      name: entry.name
    }));
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: '../img/marker.png',
    }),
  });

  mapFeatureArray.forEach((entry) => {
    entry.setStyle(iconStyle);
  });

  const vectorSource = new VectorSource({
    features: mapFeatureArray,
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const map = new Map({
    target: 'valleyMap',
    layers: [
      new TileLayer({ source: new OSM() }),
      vectorLayer
    ],
    view: new View({
      center: fromLonLat([12.5530253, 52.411105]),
      zoom: 14
    })
  });

  const popupElement = document.getElementById('valleyMapPopup');
  const $popupElement = $('#valleyMapPopup');

  const popup = new Overlay({
    element: popupElement,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -50],
  });

  map.addOverlay(popup);

  map.on('click', (event) => {
    const feature = map.forEachFeatureAtPixel(event.pixel, (feature) => {
      return feature;
    });

    if (feature) {
      const coordinates = feature.getGeometry().getCoordinates();
      popup.setPosition(coordinates);

      $popupElement.popover({
        placement: 'top',
        html: true,
        content: feature.get('name'),
      });
      $popupElement.popover('show');
    } else {
      $popupElement.popover('dispose');
    }
  });
}

window.valley.initMap = initMap;
