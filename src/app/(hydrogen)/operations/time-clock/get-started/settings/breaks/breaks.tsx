import React, { useEffect, useState } from 'react';
import Type from './type';
import Duration from './duration';
import { AnimatePresence, motion } from 'framer-motion';
import { Controller, useWatch } from 'react-hook-form';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import Limits from '../general/limits';
import RemoveIcon from '@/components/icons/remove';
import cn from '@/utils/class-names';
import PlusIcon from '@/components/icons/plus';
import X from '@/components/icons/x';
export default function Breaks({
  control,
  register,
  getValues,
  setValue,
}: {
  control: any;
  register: any;
  getValues: any;
  setValue: any;
}) {
  const [manualCount, setManualCount] = useState(getValues('breaks.manual'));

  useEffect(() => {
    setValue('breaks.manual', manualCount);
  }, [manualCount, setValue]);

  const deleteItemHandler = (item: any) => {
    const newArray = manualCount.filter((el: any) => el !== item);
    setManualCount(newArray);
  };

  const handleInputChange = (index: number, newValue: string) => {
    setManualCount((prevManualCount: any) => {
      const updatedManualCount = [...prevManualCount];
      updatedManualCount[index].breakName = newValue;
      return updatedManualCount;
    });
  };

  const addItemHandler = () => {
    const uniqueIdX = uuidv4();
    const newItem = {
      breakName: '',
      type: 'Unpaid',
      duration: '15 minutes',
      uniqueId: uniqueIdX,
    };
    setManualCount((old: any) => [...old, newItem]);
  };

  const addAutoItem = () => {
    const uniqueId = uuidv4();
    const newItem = {
      duration: '15 minutes',
      hours: '9 hours',
      uniqueId: uniqueId,
    };
    const oldItems = getValues('breaks.automatic');
    setValue('breaks.automatic', [...oldItems, newItem]);
  };

  const deleteAutoItem = (id: string) => {
    const allItems = getValues('breaks.automatic');
    const filtered = allItems.filter((el: any) => el.uniqueId !== id);
    setValue('breaks.automatic', filtered);
  };

  const breaksWatch = useWatch({
    control: control,
    name: 'breaks.chosen',
  });

  const autoWatch = useWatch({
    control,
    name: 'breaks.automatic',
  });

  const manualWatch = useWatch({
    control,
    name: 'breaks.manual',
  });

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-1 border-b border-[#eee] pb-5">
        <input
          type="radio"
          id="disabled"
          name="breaks"
          value="disabled"
          {...register('breaks.chosen')}
        />
         
        <label htmlFor="disabled" className="cursor-pointer text-sm font-bold">
          Disabled
        </label>
      </div>
      <div className="flex flex-col items-start gap-1 border-b border-[#eee] pb-5">
        <div className="flex items-center gap-1">
          <input
            type="radio"
            id="manual"
            name="breaks"
            value="manual"
            {...register('breaks.chosen')}
          />
           
          <label htmlFor="manual" className="cursor-pointer text-sm font-bold">
            Manual breaks
          </label>
        </div>
        <p className="mb-5 opacity-50">
          Manually added breaks allow users to track their break time during
          their work day with a dedicated &quot;take a break&quot; button
        </p>
        <div
          className={cn(
            'flex w-full flex-col gap-5 ',
            breaksWatch !== 'manual' && 'cursor-not-allowed opacity-50'
          )}
        >
          {manualCount.map((item: any, index: any) => (
            <Controller
              key={item.uniqueId}
              name="breaks.manual"
              control={control}
              render={() => (
                <div key={item.uniqueId} className="flex w-fit gap-2">
                  <div className="flex items-center gap-1">
                    <label htmlFor="break-name">Type</label>
                    <input
                      disabled={breaksWatch !== 'manual'}
                      defaultValue={item.breakName}
                      type="text"
                      id="break-name"
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      className="flex h-10 w-[192px] items-center justify-between rounded-xl border border-gray-3 bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 focus:ring-transparent active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <label htmlFor="type">Type</label>
                    <Type
                      item={item}
                      setManualCount={setManualCount}
                      index={index}
                      control={control}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <label htmlFor="duration">Duration</label>
                    <Duration
                      item={item}
                      setManualCount={setManualCount}
                      index={index}
                      control={control}
                      getValues={getValues}
                      setValue={setValue}
                    />
                  </div>
                  <button
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={
                      breaksWatch !== 'manual' || manualWatch.length === 1
                    }
                    onClick={() => deleteItemHandler(item)}
                  >
                    <RemoveIcon />
                  </button>
                </div>
              )}
            />
          ))}

          <button
            disabled={breaksWatch !== 'manual'}
            onClick={addItemHandler}
            className="h-10 w-fit rounded-full border bg-white px-4 text-blue-5 transition duration-200 hover:bg-gray-1 active:bg-gray-2 disabled:cursor-not-allowed"
          >
            Add break type
          </button>
        </div>
      </div>
      <div className="flex flex-col items-start gap-1 pb-5">
        <div className="flex items-center gap-1">
          <input
            type="radio"
            id="automatic"
            name="breaks"
            value="automatic"
            {...register('breaks.chosen')}
          />
           
          <label
            htmlFor="automatic"
            className="cursor-pointer text-sm font-bold"
          >
            Automatic breaks
          </label>
        </div>
        <p className="mb-5 opacity-50">
          Set automatic unpaid breaks for your users
        </p>
        <div
          className={cn(
            'flex flex-col gap-1.5',
            breaksWatch !== 'automatic' && 'cursor-not-allowed opacity-50'
          )}
        >
          {getValues('breaks.automatic').map((item: any, index: number) => (
            <Controller
              key={item.uniqueId}
              name="breaks.automatic"
              control={control}
              render={() => (
                <motion.div key={item.uniqueId} className="flex w-fit gap-2">
                  <div className="flex items-center gap-1">
                    <label htmlFor="type">
                      {index === 0 ? 'Deduct' : 'And another'}
                    </label>
                    <Duration
                      item={item}
                      index={index}
                      auto={true}
                      getValues={getValues}
                      setValue={setValue}
                      control={control}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <label htmlFor="duration">
                      {index === 0
                        ? 'break time after daily total of'
                        : 'after'}
                    </label>
                    <Limits
                      object="breaks.automatic"
                      getValues={getValues}
                      setValue={setValue}
                      control={control}
                      auto={true}
                      index={index}
                    />
                  </div>
                  {autoWatch.length - 1 === index && (
                    <button
                      onClick={addAutoItem}
                      className="flex h-6 w-6 items-center justify-center self-center rounded-full bg-blue-6 text-white"
                    >
                      <PlusIcon />
                    </button>
                  )}
                  {autoWatch.length > 1 && (
                    <button onClick={() => deleteAutoItem(item.uniqueId)}>
                      <X />
                    </button>
                  )}
                </motion.div>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
