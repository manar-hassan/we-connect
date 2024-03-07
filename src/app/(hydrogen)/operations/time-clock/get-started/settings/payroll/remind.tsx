import React from 'react';
import DropList from '../../../../../shared/drop-list';
import { Input } from 'rizzui';
import { Controller, useWatch } from 'react-hook-form';
import cn from '@/utils/class-names';
import RightIcon from '@/components/icons/right-icon';

const period = ['Same day as', 'Days', 'Weeks'];
const AB = ['After', 'Before'];

export default function Remind({
  control,
  getValues,
  setValue,
  register,
  remindName,
  cycleWatch,
}: any) {
  const watchPeriod = useWatch({
    control: control,
    name: `payroll.${remindName}.period`,
  });

  const watchIfRemindChecked = useWatch({
    control: control,
    name: `payroll.${remindName}.isChecked`,
  });

  const w = useWatch({
    control: control,
    name: `payroll.${remindName}.times`,
  });

  console.log(w);

  return (
    <div>
      <Controller
        name={`payroll.${remindName}.isChecked`}
        control={control}
        render={({ field: { value, onChange } }) => (
          <div className="mb-5 flex items-center gap-2">
            <input
              type="checkbox"
              disabled={cycleWatch === 'No predefined cycle'}
              defaultChecked={value}
              onChange={(e) => onChange(e.target.checked)}
              id={remindName}
              className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
            />
            <RightIcon inputId={remindName} />
            <label
              htmlFor={remindName}
              className={cn(
                'cursor-pointer font-bold tracking-wider text-black',
                cycleWatch === 'No predefined cycle' &&
                  'cursor-default opacity-50'
              )}
            >
              Remind users to review their timesheets
            </label>
          </div>
        )}
      />
      <div
        className={cn('flex flex-col', !watchIfRemindChecked && 'opacity-70')}
      >
        <div className="mb-2 ml-6 flex w-full items-center gap-2 whitespace-nowrap text-primary">
          {watchPeriod !== 'Same day as' && (
            <Controller
              name={`payroll.${remindName}.times`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <input
                  disabled={!watchIfRemindChecked}
                  defaultValue={value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  type="number"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border-gray-3 text-center text-primary transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                />
              )}
            />
          )}

          <DropList
            getValues={getValues}
            setValue={setValue}
            data={period}
            object={`payroll.${remindName}.period`}
            buttonClassName={cn(
              'w-[85px]',
              watchPeriod === 'Same day as' && 'w-[220px]'
            )}
            panelClassName={cn(watchPeriod === 'Same day as' && 'w-[220px]')}
            disabled={!watchIfRemindChecked}
          />
          {watchPeriod !== 'Same day as' && (
            <DropList
              getValues={getValues}
              setValue={setValue}
              data={AB}
              object={`payroll.${remindName}.AB`}
              buttonClassName="w-[85px]"
              panelClassName="w-[85px]"
              disabled={!watchIfRemindChecked}
            />
          )}
          <div className="">payroll cycle end - send reminder at</div>
          <Controller
            name={`payroll.${remindName}.time`}
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                type="time"
                disabled={!watchIfRemindChecked}
                name={`payroll.${remindName}.time`}
                defaultValue={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                rounded="lg"
                className="h-10 w-fit rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4"
              />
            )}
          />
        </div>

        <div className="ml-6 flex items-center gap-4 whitespace-nowrap">
          <div>Reminder text</div>
          <input
            disabled={!watchIfRemindChecked}
            {...register(`payroll.${remindName}.reminderText`)}
            type="text"
            className=" h-10 w-full rounded-xl border-gray-3 text-left text-[14px] text-primary transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
          />
        </div>
      </div>
    </div>
  );
}
