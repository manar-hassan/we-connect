import React from 'react';

import Weekly from './weekly';
import Daily from './daily';
import Partial from './partial';
import Consecutive from './consecutive';
import PayPeriod from './pay-period';

export default function Overtime({
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
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="font-bold">Overtime settings</div>
        <p className="opacity-50">
          Select the overtime rules that best fits your business needs
        </p>
      </div>

      <Weekly
        control={control}
        getValues={getValues}
        setValue={setValue}
        register={register}
      />

      <Daily
        control={control}
        getValues={getValues}
        setValue={setValue}
        register={register}
      />

      <Partial
        control={control}
        getValues={getValues}
        setValue={setValue}
        register={register}
      />

      <Consecutive
        control={control}
        getValues={getValues}
        setValue={setValue}
        register={register}
      />

      <PayPeriod
        control={control}
        getValues={getValues}
        setValue={setValue}
        register={register}
      />
    </div>
  );
}
