'user client';
import PlusIcon from '@/components/icons/plus';
import cn from '@/utils/class-names';
import breadcrumbs from '@public/geolocation/geolocation-breadcrumbs.webp';
import clockInOut from '@public/geolocation/geolocation-clock-in-out.webp';
import off from '@public/geolocation/geolocation-off.webp';
import Image from 'next/image';
import mapPlaceholder from '@public/geolocation/geofence-map-placeholder.png';
import { Controller, useWatch } from 'react-hook-form';
import GPSIcon from '@/components/icons/gps';
import BackgroundICon from '@/components/icons/geolocation-placeholder';
import { Switch } from 'rizzui';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Circle, GoogleMap } from '@react-google-maps/api';
import Button from '@/app/(hydrogen)/shared/button';
const ModalMap = dynamic(() => import('./modal'), {
  ssr: false,
});

const geolocationData = [
  {
    image: breadcrumbs,
    header: 'Breadcrumbs (live-tracking)',
    text: "Track users' live location and route while they're on the clock",
  },
  {
    image: clockInOut,
    header: 'Clock in & out',
    text: "Track users' clock in and clock out locations",
  },
  {
    image: off,
    header: 'Off',
    text: "Don't track users' location at all",
  },
];
export default function Geolocation({
  register,
  getValues,
  control,
  setValue,
}: {
  register: any;
  getValues: any;
  control: any;
  setValue: any;
}) {
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(mapInstance: any) {
    setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  const watchEnableLocation = useWatch({
    control: control,
    name: 'geolocation.enableLocation',
  });

  const WatchGeolocationName = useWatch({
    control,
    name: 'geolocation.geolocationName',
  });
  const [modalState, setModalState] = useState(false);
  const sites = useWatch({
    control,
    name: 'geolocation.sites',
  });
  const lastSite = sites[sites.length - 1];
  console.log(lastSite);
  const center = {
    lat: lastSite?.siteAddress?.lat || 0,
    lng: lastSite?.siteAddress?.lng || 0,
  };

  return (
    <div className="-ml-[129px] w-[858px]">
      <p className="text-xl font-bold">Geolocation</p>
      <p className="mb-6 mt-2">
        By enabling geolocation, you will receive the location where a clock in
        or clock out were performed
      </p>
      <div className=" grid grid-cols-3 items-stretch gap-6">
        {geolocationData.map((item) => (
          <label
            key={item.header}
            htmlFor={item.header}
            className={cn(
              'min-w-[270px] cursor-pointer rounded-2xl border  p-4',
              WatchGeolocationName === item.header && 'border-blue-3 bg-blue-1'
            )}
          >
            <Image
              src={item.image}
              alt={item.header}
              className="mb-4"
              width={283}
              height={146}
            />
            <div className="flex items-center gap-1">
              <input
                type="radio"
                id={item.header}
                name="geolocation"
                value={item.header}
                {...register('geolocation.geolocationName')}
              />
              <label htmlFor={item.header} className="font-bold">
                {item.header}
              </label>
            </div>
            <p className="mt-2 text-secondary">{item.text}</p>
          </label>
        ))}
      </div>
      <motion.div
        animate={{
          height: WatchGeolocationName === 'Clock in & out' ? 'auto' : '0',
        }}
        className="w-full overflow-hidden pt-6 "
      >
        <div className="relative left-1/2 flex w-fit -translate-x-1/2 items-center gap-4 rounded-[18px] bg-gray-1 p-4">
          <div>
            Users must enable location <br /> sharing in order to clock in & out
          </div>
          <Controller
            name="geolocation.enableLocation"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Switch
                defaultChecked={value}
                onChange={(e) => onChange(e.target.checked)}
                className=" ring-transparent  "
              />
            )}
          />
        </div>
      </motion.div>
      <div className="mb-4 mt-11 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">Geo fence sites</p>
          <p>
            Ensure your users can clock in and out only when they’re physically
            in the work location.
          </p>
        </div>
        <Button
          variant={lastSite ? 'primary' : 'secondary'}
          onClick={() => setModalState(true)}
          disabled={
            getValues('geolocation.geolocationName') === 'Off' ||
            (getValues('geolocation.geolocationName') === 'Clock in & out' &&
              !watchEnableLocation)
          }
        >
          {lastSite ? (
            'Edit site'
          ) : (
            <>
              <PlusIcon color="currentColor" /> <span>Add sites</span>
            </>
          )}
        </Button>
      </div>
      <div
        className={cn(
          'relative h-[270px] overflow-hidden rounded-[18px]',
          getValues('geolocation.geolocationName') === 'Off' ||
            (getValues('geolocation.geolocationName') === 'Clock in & out' &&
              !watchEnableLocation)
            ? 'cursor-not-allowed opacity-50'
            : ''
        )}
      >
        {lastSite ? (
          <GoogleMap
            center={center}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            zoom={
              lastSite.fence < 525
                ? 18
                : lastSite.fence > 525 && lastSite.fence < 1050
                ? 17
                : lastSite.fence >= 1050 && lastSite.fence < 2100
                ? 16
                : lastSite.fence >= 2100
                ? 15
                : 3
            }
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              zoomControl: false,
            }}
          >
            <>
              <Circle
                center={center}
                radius={lastSite.fence * 0.2}
                options={{
                  strokeColor: '#2998ff',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#2998ff',
                  fillOpacity: 0.35,
                }}
              />
            </>
          </GoogleMap>
        ) : (
          <>
            <Image src={mapPlaceholder} alt="map placeholder" />
            <div className="absolute left-1/2 top-1/2 flex  -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[18px] bg-white p-6 shadow-4">
              <div className="relative">
                <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
                  <GPSIcon dimensions="48" color="#c1c5ca" />
                </span>
                <BackgroundICon />
              </div>
              <p className="mt-4 text-secondary">
                Add sites to view them on the Geo fence map
              </p>
            </div>
          </>
        )}
      </div>

      <ModalMap
        modalState={modalState}
        setModalState={setModalState}
        getValues={getValues}
        setValue={setValue}
        register={register}
        control={control}
      />
    </div>
  );
}
