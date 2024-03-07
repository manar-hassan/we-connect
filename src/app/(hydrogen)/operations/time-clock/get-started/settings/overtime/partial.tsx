import React from 'react';
import BaseWage from './base-wage';
import { Controller, useWatch } from 'react-hook-form';
import { Input, Switch } from 'rizzui';
import cn from '@/utils/class-names';
import RemoveIcon from '@/components/icons/remove';
//@ts-ignore
import { v4 } from 'uuid';

export default function Partial({
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
    name: 'overtime.partial.isChecked',
  });
  const watchPartialList = useWatch({
    control,
    name: `overtime.partial.partialList`,
  });

  const deleteItem = (id: string) => {
    const currentPartialList = getValues('overtime.partial.partialList');
    const updatedPartialList = currentPartialList.filter(
      (item: any) => item.id !== id
    );
    setValue('overtime.partial.partialList', updatedPartialList);
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
      between: '08:00',
      to: '11:00',
      baseWage: {
        type: 'X base wage',
        hours: 1.5,
      },
      id: uniqueId,
    };
    const oldItems = getValues('overtime.partial.partialList');
    setValue('overtime.partial.partialList', [...oldItems, newItem]);
  };
  return (
    <div className="rounded-xl bg-[#f9f9f9]">
      <div className="flex items-center gap-4 border-b border-[#dcdcdc] px-5">
        <Switch {...register('overtime.partial.isChecked')} />
        <div className="h-[60px] text-[17px] font-bold leading-[60px]">
          Partial day overtime
        </div>
      </div>
      {watchPartialList.map((partial: any, index: number) => {
        return (
          <div
            key={partial.id}
            className={cn(
              'relative flex items-center border-b border-[#dcdcdc] p-5',
              !CheckingWatch && 'opacity-50'
            )}
          >
            {watchPartialList.length > 1 && (
              <button
                type="button"
                disabled={!CheckingWatch}
                onClick={() => deleteItem(partial.id)}
                className="absolute right-2.5 top-2.5 transition duration-100 hover:opacity-80"
              >
                <RemoveIcon />
              </button>
            )}
            <div className="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-4">
              <div className="leading-10">On days</div>
              <div className="flex w-full items-center gap-2">
                {Object.keys(partial.days).map((day) => {
                  return (
                    <div
                      key={day}
                      className="relative flex flex-col items-center justify-center "
                    >
                      <Controller
                        name={`overtime.partial.partialList[${index}].days.${day}`}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                          <>
                            <input
                              disabled={!CheckingWatch}
                              defaultChecked={value}
                              onChange={(e) => onChange(e.target.checked)}
                              id={'partial' + day}
                              name={'partial' + day}
                              type="checkbox"
                              className="peer flex h-8 w-8 appearance-none items-center justify-center rounded-full border border-[#b9b9b9] text-[15px] font-normal text-black transition duration-100 hover:cursor-pointer hover:bg-gray-1 checked:hover:!bg-blue-5 focus:shadow-none focus:ring-transparent"
                            />
                            <label
                              htmlFor={'partial' + day}
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
              <div className="leading-10">Between</div>
              <div className="flex items-center gap-3">
                <Controller
                  name={`overtime.partial.partialList[${index}].between`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      type="time"
                      disabled={!CheckingWatch}
                      name={`overtime.partial.partialList[${index}].between`}
                      defaultValue={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      rounded="pill"
                      className="h-10 w-fit rounded-2xl border-gray-3 bg-white text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4"
                    />
                  )}
                />
                <div>To</div>
                <Controller
                  name={`overtime.partial.partialList[${index}].to`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      type="time"
                      disabled={!CheckingWatch}
                      name={`overtime.partial.partialList[${index}].to`}
                      defaultValue={value}
                      onChange={(e) => {
                        onChange(e.target.value);
                      }}
                      rounded="pill"
                      className="h-10 w-fit rounded-2xl border-gray-3 bg-white text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4"
                    />
                  )}
                />
              </div>
              <div className="w-[67px] leading-10">
                {watchPartialList[index].baseWage.type === '+ base wage'
                  ? 'Additional'
                  : 'Multiplier'}
              </div>
              <div className="flex items-center gap-3">
                <input
                  disabled={!CheckingWatch}
                  {...register(
                    `overtime.partial.partialList[${index}].baseWage.hours`
                  )}
                  type="number"
                  className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                />
                <BaseWage
                  getValues={getValues}
                  setValue={setValue}
                  control={control}
                  object={`partial.partialList[${index}]`}
                  watch="overtime.partial.isChecked"
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
