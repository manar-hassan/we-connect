import React from 'react';
import BaseWage from './base-wage';
import { Controller, useWatch } from 'react-hook-form';
import { Switch } from 'rizzui';
import cn from '@/utils/class-names';
import RemoveIcon from '@/components/icons/remove';
//@ts-ignore
import { v4 } from 'uuid';

export default function PayPeriod({
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
    name: 'overtime.payPeriod.isChecked',
  });
  const watchPayPeriodList = useWatch({
    control,
    name: `overtime.payPeriod.payPeriodList`,
  });


  return (
    <div className="rounded-xl bg-[#f9f9f9]">
      <div className="flex items-center gap-4 border-b border-[#dcdcdc] px-5">
        <Switch {...register('overtime.payPeriod.isChecked')} />
        <div className="h-[60px] text-[17px] font-bold leading-[60px]">
          Pay period overtime
        </div>
      </div>
      {watchPayPeriodList.map((payPeriod: any, index: number) => {
        return (
          <div
            key={payPeriod.id}
            className={cn(
              'relative flex items-center p-5 pb-0',
              !CheckingWatch && 'opacity-50'
            )}
          >
            <div className="grid grid-cols-[max-content_1fr] gap-x-5 gap-y-4">
              <div className="leading-10">Start after</div>
              <div className="flex items-center gap-3">
                <input
                  disabled={!CheckingWatch}
                  {...register(
                    `overtime.payPeriod.payPeriodList[${index}].startAfter`
                  )}
                  type="number"
                  className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                />
                Hours/week
              </div>
              <div className="leading-10">
                {watchPayPeriodList[index].baseWage.type === '+ base wage'
                  ? 'Additional'
                  : 'Multiplier'}
              </div>
              <div className="flex items-center gap-3">
                <input
                  disabled={!CheckingWatch}
                  {...register(
                    `overtime.payPeriod.payPeriodList[${index}].baseWage.hours`
                  )}
                  type="number"
                  className="flex h-10 w-[60px] items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                />
                <BaseWage
                  getValues={getValues}
                  setValue={setValue}
                  control={control}
                  object={`payPeriod.payPeriodList[${index}]`}
                  watch="overtime.payPeriod.isChecked"
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className={cn('px-5', !CheckingWatch && 'opacity-50')}>
        <button
          disabled={!CheckingWatch}
          className="my-3 text-blue-6 hover:text-blue-5"
        >
          Go to payroll settings
        </button>
      </div>
    </div>
  );
}
