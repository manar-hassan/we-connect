import Button from '@/app/(hydrogen)/shared/button';
import BackgroundICon from '@/components/icons/geolocation-placeholder';
import GPSIcon from '@/components/icons/gps';
import PlusIcon from '@/components/icons/plus';
import X from '@/components/icons/x';
import React, { useState } from 'react';
import { Modal } from 'rizzui';
import RangeSlider from '@/components/ui/range-slider';
import { Autocomplete } from '@react-google-maps/api';
import AvailableJobs from './available-jobs';
import cn from '@/utils/class-names';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import RightIcon from '@/components/icons/right-icon';
import EditIcon from '@/components/icons/edit';
import DeleteIcon from '@/components/icons/delete';
import { useWatch } from 'react-hook-form';
import Map from './Map';

export default function ModalMap({
  modalState,
  setModalState,
  getValues,
  setValue,
  register,
  control,
}: {
  modalState: boolean;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  getValues: any;
  setValue: any;
  register: any;
  control: any;
}) {
  const [showForm, setShowForm] = useState(false);
  const sites = useWatch({
    control,
    name: 'geolocation.sites',
  });
  const [fence, setFence] = useState(492);
  const [siteName, setSiteName] = useState('');
  const [siteAddress, setSiteAddress] = useState<{
    name: string;
    lat: number;
    lng: number;
  }>({
    name: '',
    lat: 0,
    lng: 0,
  });
  const [availableJobs, setAvailableJobs] = useState(['']);
  const [searchResult, setSearchResult] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [errors, setErrors] = useState({
    siteName: false,
    siteAddress: false,
    availableJobs: false,
  });
  const [editedSiteID, setEditedSiteId] = useState('');

  const resetValues = () => {
    setSiteName('');
    setSiteAddress({
      name: '',
      lat: 0,
      lng: 0,
    });
    setAvailableJobs(['']);
    setFence(492);
    setErrors({
      siteName: false,
      siteAddress: false,
      availableJobs: false,
    });
    setIsEdit(false);
    setShowForm(false);
    setEditedSiteId('');
  };

  const submitSite = () => {
    if (siteName === '') {
      setErrors((prev) => ({
        ...prev,
        siteName: true,
      }));
    }
    if (
      siteAddress.lat === 0 ||
      siteAddress.lng === 0 ||
      siteAddress.name === ''
    ) {
      setErrors((prev) => ({
        ...prev,
        siteAddress: true,
      }));
    }
    if (availableJobs.length === 0) {
      setErrors((prev) => ({
        ...prev,
        availableJobs: true,
      }));
    }
    if (
      siteName === '' ||
      siteAddress.lat === 0 ||
      siteAddress.lng === 0 ||
      siteAddress.name === '' ||
      availableJobs.length === 0
    ) {
      return;
    }
    if (isEdit) {
      const editedSite = {
        siteName,
        siteAddress,
        fence,
        availableJobs,
        id: editedSiteID,
      };
      const allSites = sites.map((site: any) => {
        if (site.id === editedSite.id) {
          const returnedSite = { ...site, ...editedSite };
          console.log(returnedSite);
          return returnedSite;
        } else {
          return site;
        }
      });
      setValue('geolocation.sites', allSites);
      resetValues();
      return;
    }
    const id = uuidv4();
    const newSite = {
      siteName,
      siteAddress,
      fence,
      availableJobs,
      id,
      isChecked: true,
    };
    setValue('geolocation.sites', [...sites, newSite]);
    resetValues();
  };

  const handleCloseForm = () => {
    resetValues();
  };

  function onLoad(autocomplete: any) {
    setSearchResult(autocomplete);
  }
  const onPlaceChanged = () => {
    //@ts-ignore
    const place = searchResult.getPlace();
    setSiteAddress({
      name: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    });
    setErrors((prev) => ({
      ...prev,
      siteAddress: false,
    }));
  };

  const handleDeleteSite = (id: string) => {
    const restSites = sites.filter((site: any) => site.id !== id);
    setValue('geolocation.sites', restSites);
    resetValues();
  };

  const handleEditSite = (site: any) => {
    setIsEdit(true);
    setSiteName(site.siteName);
    setSiteAddress(site.siteAddress);
    setAvailableJobs(site.availableJobs);
    setFence(site.fence);
    setEditedSiteId(site.id);
    setShowForm(true);
  };

  return (
    <Modal
      isOpen={modalState}
      onClose={() => {
        setModalState(false);
        resetValues();
      }}
      customSize="1450px"
      className="flx max-h-[calc(100vh-64px)] min-h-[176px] flex-col rounded-3xl shadow-4 "
    >
      <div className="relative flex min-h-max items-center justify-center gap-2 border-b border-gray-2 py-4 text-gray-6">
        <GPSIcon color="currentColor" dimensions="20" /> Geo fence sites editor
        <button
          className="absolute right-4 top-4"
          onClick={() => {
            setModalState(false);
            resetValues();
          }}
        >
          <X />
        </button>
      </div>
      <div className="h-full min-h-0 w-full flex-1 overflow-auto">
        <div className="grid grid-cols-[450px_1fr]">
          <div className="relative flex h-[75vh] flex-col border-r border-gray-2">
            <div className="flex items-center justify-between border-b border-gray-2 p-4">
              <span>Sites (0)</span>
              <Button onClick={() => setShowForm(true)}>
                <PlusIcon /> Add site
              </Button>
            </div>
            {!showForm && sites.length === 0 ? (
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center  ">
                <div className="relative">
                  <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2">
                    <GPSIcon dimensions="48" color="#c1c5ca" />
                  </span>
                  <BackgroundICon />
                </div>
                <p className="mt-4 font-bold">No sites to display</p>{' '}
                <p className="mt-4 whitespace-nowrap text-secondary">
                  Add sites to view them on the Geo fence map
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  className="mt-4"
                  variant="secondary"
                >
                  <PlusIcon /> Add site
                </Button>
              </div>
            ) : (
              !showForm &&
              sites.length > 0 && (
                <div className="p-4">
                  {sites.map((site: any, index: number) => {
                    return (
                      <div
                        key={site.id}
                        className="mb-2 flex w-full items-center justify-between rounded-2xl border p-4"
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative flex items-center gap-2">
                            <input
                              type="checkbox"
                              {...register(
                                `geolocation.sites[${index}].isChecked`
                              )}
                              id={`${site.id}-checked`}
                              className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                            />
                            <RightIcon inputId={`${site.id}-checked`} />
                          </div>
                          {site.siteAddress.name}
                        </div>
                        <div className="flex items-center gap-2 text-secondary">
                          <button
                            onClick={() => handleEditSite(site)}
                            className="transition duration-100 hover:opacity-70"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDeleteSite(site.id)}
                            className="transition duration-100 hover:opacity-70"
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )}

            {showForm && (
              <div className="p-4">
                <div className="flex flex-col gap-5 rounded-2xl bg-gray-1 p-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="site-name">Site name</label>
                    <input
                      value={siteName}
                      onChange={(e) => {
                        setSiteName(e.target.value);
                        setErrors((prev) => ({
                          ...prev,
                          siteName: false,
                        }));
                      }}
                      type="text"
                      placeholder="Enter site name"
                      id="site-name"
                      className={cn(
                        'h-10 w-full rounded-lg border border-[#d9d9d9] bg-white px-2.5 py-0 placeholder:text-sm focus:border-blue-6 focus:outline-none focus:ring-transparent',
                        errors.siteName && 'border-red-500'
                      )}
                    />
                    {errors.siteName && (
                      <span className="-mt-1 text-sm text-red-500">
                        Please insert site name
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="site-address">Site address</label>
                    <div
                      className={cn(
                        'flex items-center rounded-lg border border-[#d9d9d9] bg-white px-1 focus-within:border-blue-6',
                        errors.siteAddress && 'border-red-500'
                      )}
                    >
                      <Autocomplete
                        onLoad={onLoad}
                        onPlaceChanged={onPlaceChanged}
                        className="flex-1"
                      >
                        <input
                          value={siteAddress?.name}
                          onChange={(e) => {
                            setSiteAddress((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }));
                            setErrors((prev) => ({
                              ...prev,
                              siteAddress: false,
                            }));
                          }}
                          type="text"
                          id="site-address"
                          placeholder="Enter location"
                          className={cn(
                            'h-10 w-full border-none  px-2.5 py-0 placeholder:text-sm focus:outline-none focus:ring-transparent'
                          )}
                        />
                      </Autocomplete>
                      <GPSIcon color="currentColor" dimensions="20" />
                    </div>
                    {errors.siteAddress && (
                      <span className="-mt-1 text-sm text-red-500">
                        You have to insert an address
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div>Fence size {fence} Feet</div>
                    <RangeSlider
                      min={246}
                      max={2461}
                      value={fence}
                      onChange={(value: any) => {
                        setFence(value);
                      }}
                      className="[&_.rc-slider-handle]:border-blue-6 [&_.rc-slider-handle]:bg-blue-6 [&_.rc-slider-handle]:hover:border-blue-6  [&_.rc-slider-track]:bg-blue-6"
                    />{' '}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div>Available jobs</div>
                    <div className="-mt-1 mb-2 text-xs leading-4 text-secondary">
                      Determine which jobs can be utilized in this site
                    </div>
                    <AvailableJobs
                      setAvailableJobs={setAvailableJobs}
                      availableJobs={availableJobs}
                      errors={errors}
                      setErrors={setErrors}
                    />
                    {errors.availableJobs && (
                      <span className="-mt-1 text-sm text-red-500">
                        You have to select at least one job
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-1">
                    <button
                      onClick={() => handleDeleteSite(editedSiteID)}
                      className="text-red"
                    >
                      Delete site
                    </button>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCloseForm}
                        className="text-blue-6 hover:text-blue-5"
                      >
                        Discard
                      </button>
                      <Button onClick={submitSite} variant="secondary">
                        Save site
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="h-full w-full">
            <Map
              siteAddress={siteAddress}
              setSiteAddress={setSiteAddress}
              fence={fence}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
