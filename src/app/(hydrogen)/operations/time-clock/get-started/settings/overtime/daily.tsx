import React from 'react';
import BaseWage from './base-wage';
import { Controller, useWatch } from 'react-hook-form';
import { Switch } from 'rizzui';
import cn from '@/utils/class-names';
import RemoveIcon from '@/components/icons/remove';
//@ts-ignore
import { v4 } from 'uuid';

export default function Daily({
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
    name: 'overtime.daily.isChecked',
  });
  const watchDailyList = useWatch({
    control,
    name: `overtime.daily.dailyList`,
  });

  const deleteItem = (id: string) => {
    const currentDailyList = getValues('overtime.daily.dailyList');
    const updatedDailyList = currentDailyList.filter(
      (item: any) => item.id !== id
    );
    setValue('overtime.daily.dailyList', updatedDailyList);
  };

  const addItem = () => {
    const uniqueId = v4();
    const newItem = {
      days: {
        sunday: false,
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
      },
      startAfter: 8,
      baseWage: {
        type: 'X base wage',
        hours: 1.5,
      },
      id: uniqueId,
    };
    const oldItems = getValues('overtime.daily.dailyList');
    setValue('overtime.daily.dailyList', [...oldItems, newItem]);
  };

  return (
    <div className="rounded-xl bg-[#f9f9f9]">
      <div className="flex items-center gap-4 border-b border-[#dcdcdc] px-5">
        <Switch {...register('overtime.daily.isChecked')} />
        <div className="h-[60px] text-[17px] font-bold leading-[60px]">
          Daily overtime
        </div>
      </div>
      {watchDailyList.map((daily: any, index: number) => {
        return (
          <div
            key={daily.id}
            className={cn(
              'relative flex items-center border-b border-[#dcdcdc] p-5',
              !CheckingWatch && 'opacity-50'
            )}
          >
            {watchDailyList.length > 1 && (
              <button
                disabled={!CheckingWatch}
                type="button"
                onClick={() => deleteItem(daily.id)}
                className="absolute right-2.5 top-2.5 transition duration-100 hover:opacity-80"
              >
                <RemoveIcon />
              </button>
            )}
            <div className="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-4">
              <div className="leading-10">On days</div>
              <div className="flex w-full items-center gap-2">
                {Object.keys(daily.days).map((day) => {
                  return (
                    <div
                      key={day}
                      className="relative flex flex-col items-center justify-center "
                    >
                      <Controller
                        name={`overtime.daily.dailyList[${index}].days.${day}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <>
                            <input
                              disabled={!CheckingWatch}
                              defaultChecked={value}
                              onChange={(e) => onChange(e.target.checked)}
                              id={'daily' + day}
                              name={'daily' + day}
                              type="checkbox"
                              className="peer flex h-8 w-8 appearance-none items-center justify-center rounded-full border border-[#b9b9b9] text-[15px] font-normal text-black transition duration-100 hover:cursor-pointer hover:bg-gray-1 checked:hover:!bg-blue-5 focus:shadow-none focus:ring-transparent"
                            />
                            <label
                              htmlFor={'daily' + day}
                              className="absolute left-1/2 top-1.5 -translate-x-1/2 cursor-pointer select-none text-[15px] peer-checked:border-none peer-checked:font-bold peer-checked:text-white "
                            >
                              {day.charAt(0).toUpperCase()}
                            </label>
                          </>
                        )}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="leading-10">Start after</div>
              <div className="flex items-center gap-3">
                <input
                  disabled={!CheckingWatch}
                  {...register(`overtime.daily.dailyList[${index}].startAfter`)}
                  type="number"
                  className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                />
                Hours/week
              </div>
              <div className="leading-10">
                {watchDailyList[index].baseWage.type === '+ base wage'
                  ? 'Additional'
                  : 'Multiplier'}
              </div>
              <div className="flex items-center gap-3">
                <input
                  disabled={!CheckingWatch}
                  {...register(
                    `overtime.daily.dailyList[${index}].baseWage.hours`
                  )}
                  type="number"
                  className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                />
                <BaseWage
                  getValues={getValues}
                  setValue={setValue}
                  control={control}
                  object={`daily.dailyList[${index}]`}
                  watch="overtime.daily.isChecked"
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
          + Add daily rule
        </button>
      </div>
    </div>
  );
}
