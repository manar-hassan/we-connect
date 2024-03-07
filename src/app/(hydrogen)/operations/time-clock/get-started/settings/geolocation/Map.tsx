// @ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import {
  Circle,
  GoogleMap,
  useJsApiLoader,
} from '@react-google-maps/api';
import { SetStateAction } from 'jotai';

const containerStyle = {
  width: '100%',
  height: '100%',
};

type Position = {
  name: string;
  lat: number;
  lng: number;
};

function Map({
  siteAddress,
  setSiteAddress,
  fence,
}: {
  siteAddress: Position;
  setSiteAddress: React.Dispatch<SetStateAction<Position>>;
  fence: number;
}) {
  const center = {
    lat: siteAddress.lat,
    lng: siteAddress.lng,
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(mapInstance: any) {
    setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const geocodeLatLng = (position: Position) => {
    const geocoder = new window.google.maps.Geocoder();
    console.log(geocoder);

    console.log(position)

    geocoder.geocode({ location: position }, (results: any, status) => {
      if (status === 'OK') {
        if (results[0]) {
          setSiteAddress({
            name: results[0].formatted_address,
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          });
        } else {
          console.error('No results found');
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  };

  const [zoom, setZoom] = useState(3);

  useEffect(() => {
    if (fence < 525 && siteAddress.lat !== 0) {
      setZoom(18);
    } else if (fence > 525 && fence < 1050) {
      setZoom(17);
    } else if (fence >= 1050 && fence < 2100) {
      setZoom(16);
    } else if (fence >= 2100) {
      setZoom(15);
    } else {
      setZoom(3);
    }
  }, [fence, siteAddress]);

  return isLoaded ? (
    <GoogleMap
      center={center}
      mapContainerStyle={containerStyle}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_BOTTOM,
        },
      }}
    >
      <>
        {center.lat !== 0 && (
          <Circle
            center={center}
            draggable={true}
            onDragEnd={(e) => {
              const position: Position = {
                lat: e.latLng?.lat(),
                lng: e.latLng?.lng(),
              };
              geocodeLatLng(position);
            }}
            radius={fence * 0.2}
            options={{
              strokeColor: '#2998ff',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#2998ff',
              fillOpacity: 0.35,
            }}
          />
        )}
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
