import React from 'react';
import BaseWage from './base-wage';
import { Controller, useWatch } from 'react-hook-form';
import { Input, Switch } from 'rizzui';
import cn from '@/utils/class-names';
import RemoveIcon from '@/components/icons/remove';
//@ts-ignore
import { v4 } from 'uuid';

export default function Consecutive({
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
  const CheckingWatch = useWatch({
    control,
    name: 'overtime.consecutive.isChecked',
  });
  const watchConsecutiveList = useWatch({
    control,
    name: `overtime.consecutive.consecutiveList`,
  });

  const deleteItem = (id: string) => {
    const currentConsecutiveList = getValues(
      'overtime.consecutive.consecutiveList'
    );
    const updatedConsecutiveList = currentConsecutiveList.filter(
      (item: any) => item.id !== id
    );
    setValue('overtime.consecutive.consecutiveList', updatedConsecutiveList);
  };

  const addItem = () => {
    const uniqueId = v4();
    const newItem = {
      startOn: 8,
      startAfter: 7,
      baseWage: {
        type: 'X base wage',
        hours: 1.5,
      },
      id: uniqueId,
    };
    const oldItems = getValues('overtime.consecutive.consecutiveList');
    setValue('overtime.consecutive.consecutiveList', [...oldItems, newItem]);
  };
  return (
    <div className="rounded-xl bg-[#f9f9f9]">
      <div className="flex items-center gap-4 border-b border-[#dcdcdc] px-5">
        <Switch {...register('overtime.consecutive.isChecked')} />
        <div className="h-[60px] text-[17px] font-bold leading-[60px]">
          Consecutive days overtime
        </div>
      </div>
      {watchConsecutiveList.map((consecutive: any, index: number) => {
        return (
          <div
            key={consecutive.id}
            className={cn(
              'relative flex items-center border-b border-[#dcdcdc] p-5',
              !CheckingWatch && 'opacity-50'
            )}
          >
            {watchConsecutiveList.length > 1 && (
              <button
                disabled={!CheckingWatch}
                type="button"
                onClick={() => deleteItem(consecutive.id)}
                className="absolute right-2.5 top-2.5 transition duration-100 hover:opacity-80"
              >
                <RemoveIcon />
              </button>
            )}
            <div className="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-4">
              <div className="leading-10">Start on the</div>
              <div className="flex items-center gap-3">
                <input
                  disabled={!CheckingWatch}
                  {...register(
                    `overtime.consecutive.consecutiveList[${index}].startOn`
                  )}
                  type="number"
                  className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                />
                consecutive day
              </div>
              <div className="leading-10">Start after</div>
              <div className="flex items-center gap-3">
                <input
                  disabled={!CheckingWatch}
                  {...register(
                    `overtime.consecutive.consecutiveList[${index}].startAfter`
                  )}
                  type="number"
                  className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                />
                Hours/week
              </div>
              <div className="leading-10">
                {watchConsecutiveList[index].baseWage.type === '+ base wage'
                  ? 'Additional'
                  : 'Multiplier'}
              </div>
              <div className="flex items-center gap-3">
                <input
                  disabled={!CheckingWatch}
                  {...register(
                    `overtime.consecutive.consecutiveList[${index}].baseWage.hours`
                  )}
                  type="number"
                  className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                />
                <BaseWage
                  getValues={getValues}
                  setValue={setValue}
                  control={control}
                  object={`consecutive.consecutiveList[${index}]`}
                  watch="overtime.consecutive.isChecked"
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className={cn('px-5', !CheckingWatch && 'opacity-50')}>
        <button
          disabled={!CheckingWatch}
          onClick={addItem}
          className="my-3 text-blue-6 hover:text-blue-5"
        >
          + Add consecutive rule
        </button>
      </div>
    </div>
  );
}
