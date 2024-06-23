import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './map.css';

// Define URLs for flag icons
const iconUrls = {
  India: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3/in.svg',
  Australia: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3/au.svg',
  NewYork: 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.6/flags/4x3/us.svg',
};

// Function to create custom icon with flag and cone
const createCustomIcon = (iconUrl) => {
  return L.divIcon({
    html: `<div class="custom-icon-wrapper">
             <img src="${iconUrl}" class="flag-icon" />
             <div class="pointer"></div>
           </div>`,
    className: 'custom-div-icon',
    iconSize: [40, 60], // size of the icon
    iconAnchor: [20, 60], // point of the icon which will correspond to marker's location
  });
};

// Array of locations with latitude, longitude, name, and country
const locations = [
  { lat: -33.74354553222656, lng: 150.84788513183594, name: 'Australia', country: 'Australia' },
  { lat: 28.39245622746987, lng: 77.31137073362416, name: 'India', country: 'India' },
  { lat: 40.7128, lng: -74.0060, name: 'New York', country: 'NewYork' },
];

const WorldMap = () => {
  return (
    <MapContainer center={[20, 0]} zoom={2} className="map-container">
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
      />
      {locations.map((location, idx) => (
        <Marker
          key={idx}
          position={[location.lat, location.lng]}
          icon={createCustomIcon(iconUrls[location.country])}
        >
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default WorldMap;
  