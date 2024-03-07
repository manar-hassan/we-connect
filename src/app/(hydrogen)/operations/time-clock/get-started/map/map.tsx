'user client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import PunchClock from './punch-clock';
import { Avatar, Tooltip } from 'rizzui';
import GPSIconSec from '@/components/icons/gps-sec';

const containerStyle = {
  width: '100%',
  height: '88%',
};

function Map({
  mapData,
  activity,
  job,
}: {
  mapData: any;
  activity: string;
  job: string;
}) {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [user, setUser] = useState({
    attendances: [],
  });
  const [allUsers, setAllUsers] = useState(mapData);
  const [center, setCenter] = useState({
    lat: 30.033333,
    lng: 31.233334,
  });
  const [zoom, setZoom] = useState(3);

  const { isLoaded } = useJsApiLoader({
    //@ts-ignore
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map: any) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const getAddress = (
    latitude: string,
    longitude: string,
    callback: (_: string) => void
  ) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results && results[0]) {
          callback(results[0].formatted_address);
        } else {
          console.error('Address not found');
        }
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  };

  useEffect(() => {
    if (user) {
      setAddresses([]);
      //@ts-ignore
      user.attendances.forEach((attendance: any, index: number) => {
        getAddress(
          attendance.latitude,
          attendance.longitude,
          (address: string) => {
            setAddresses((prevAddresses) => [...prevAddresses, address]);
          }
        );
      });
    }
  }, [user]);

  useEffect(() => {
    filterData();
  }, [activity, job, mapData]);

  useEffect(() => {
    if (allUsers && allUsers[0]?.attendances?.length > 0) {
      setZoom(11);
      setCenter({
        lat: parseFloat(allUsers[0].attendances[0].latitude),
        lng: parseFloat(allUsers[0].attendances[0].longitude),
      });
    } else {
      setZoom(3);
      setCenter({
        lat: 30.033333,
        lng: 31.233334,
      });
    }
  }, [allUsers]);

  const filterData = () => {
    if (activity === 'All activity' && job === 'All jobs') {
      setAllUsers(mapData);
    } else if (activity !== 'All activity' && job === 'All jobs') {
      setAllUsers(
        mapData.map((user: any) => {
          return {
            ...user,
            attendances: user.attendances.filter(
              (attendance: any) => attendance.type === activity
            ),
          };
        })
      );
    } else if (activity === 'All activity' && job !== 'All jobs') {
      setAllUsers(
        mapData.map((user: any) => {
          return {
            ...user,
            attendances: user.attendances.filter(
              (attendance: any) => attendance.project === job
            ),
          };
        })
      );
    } else {
      setAllUsers(
        mapData.map((user: any) => {
          return {
            ...user,
            attendances: user.attendances.filter(
              (attendance: any) =>
                attendance.project === job && attendance.type === activity
            ),
          };
        })
      );
    }
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
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
        {allUsers.map((user: any, userIndex: number) => {
          if (!user.hideMarker) {
            return user.attendances.map((attendance: any, index: number) => {
              const position = {
                lat: parseFloat(attendance.latitude),
                lng: parseFloat(attendance.longitude),
              };
              return (
                <OverlayView
                  key={index}
                  position={position}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <Tooltip
                    key={index} // Add a unique key for each Tooltip component
                    placement="top"
                    tooltipArrowClassName="[&>path]:fill-white"
                    className="bg-white text-primary"
                    content={() => (
                      <div className="w-[200px] overflow-hidden p-1">
                        <div className="flex w-full items-center justify-between gap-1">
                          <div className="font-bold">{attendance.time}</div>
                          <div className="whitespace-nowrap">
                            {attendance.type}
                          </div>
                          <div
                            style={{ backgroundColor: `${attendance.color}` }}
                            className="truncate rounded-full px-2 leading-[26px] text-white"
                          >
                            {attendance.project}
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-1 border-t px-1 pt-2">
                          <div>
                            <GPSIconSec />
                          </div>
                          <div className="ml-2 truncate">
                            {addresses[index]}
                          </div>
                        </div>
                      </div>
                    )}
                  >
                    <div className="flex flex-col items-center">
                      <Avatar
                        src="https://www.gravatar.com/avatar/4aa8e08b85fd2e9c33948aec2c2fb8d3.png?s=200&d=mp"
                        name=""
                        size="sm"
                        color="info"
                        className="outline outline-1 outline-white"
                      />
                      <div className="mt-0.5 h-[18px] w-10 rounded-[10px] border border-white bg-blue-6 text-center text-sm font-bold text-white">
                        {attendance.type === 'Clocked in' ? 'in' : 'out'}
                      </div>
                    </div>
                  </Tooltip>
                </OverlayView>
              );
            });
          } else {
            return null; // Return null if hideMarker is true
          }
        })}

        <PunchClock
          allUsers={allUsers}
          setAllUsers={setAllUsers}
          user={user}
          setUser={setUser}
          addresses={addresses}
        />
      </>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
