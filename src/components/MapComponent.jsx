import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  // Coordinates for Nandanvan Vyakti Nagar, Nagpur
  const center = {
    lat: 20.868110,  // Latitude for Nandanvan Vyakti Nagar, Nagpur
    lng: 76.203930   // Longitude for Nandanvan Vyakti Nagar, Nagpur
  };

  // Google Maps container style
  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  return (
    <div>
      <h2>Map - Nandanvan Vyakti Nagar, Nagpur</h2>
      <LoadScript googleMapsApiKey="AIzaSyD_5B_pMeeqKWGtBbBUV1rnvryclRPGWpM">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}  // Zoom level (15 is a good value for local area)
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;
