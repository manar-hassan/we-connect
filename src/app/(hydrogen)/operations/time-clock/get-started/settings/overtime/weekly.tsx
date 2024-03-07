import React from 'react';
import BaseWage from './base-wage';
import { Switch } from 'rizzui';
import cn from '@/utils/class-names';
import { useWatch } from 'react-hook-form';

export default function Weekly({
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
  const Watch = (name: string) =>
    useWatch({
      control,
      name,
    });
  return (
    <div className="rounded-xl bg-[#f9f9f9]">
      <div className="flex items-center gap-4 border-b border-[#dcdcdc] px-5">
        <Switch {...register('overtime.weekly.isChecked')} />
        <div className="h-[60px] text-[17px] font-bold leading-[60px]">
          Weekly overtime
        </div>
      </div>
      <div
        className={cn(
          'flex items-center p-5',
          !Watch('overtime.weekly.isChecked') && 'opacity-50'
        )}
      >
        <div className="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-4">
          <div className="leading-10">Start after</div>
          <div className="flex items-center gap-3">
            <input
              disabled={!Watch('overtime.weekly.isChecked')}
              {...register('overtime.weekly.startAfter')}
              type="number"
              className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
            />
            Hours/week
          </div>
          <div className="leading-10">
            {Watch('overtime.weekly.baseWage.type') === '+ base wage'
              ? 'Additional'
              : 'Multiplier'}
          </div>
          <div className="flex items-center gap-3">
            <input
              disabled={!Watch('overtime.weekly.isChecked')}
              {...register('overtime.weekly.baseWage.hours')}
              type="number"
              className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
            />
            <BaseWage
              getValues={getValues}
              setValue={setValue}
              control={control}
              object="weekly"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
