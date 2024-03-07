import WorkIcon from '@/components/icons/work';
import React, { useEffect } from 'react';
import DropList from '../../../../../shared/drop-list';
import CycleIcon from '@/components/icons/cycle';
import { Controller, useWatch } from 'react-hook-form';
import PeriodIcon from '@/components/icons/period';
import Calender from './calender';
import RightIcon from '@/components/icons/right-icon';
import { Input } from 'rizzui';
import Remind from './remind';

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const cycle = [
  'No predefined cycle',
  '1 week',
  '2 weeks',
  '4 weeks',
  '1 month',
  'Twice a month',
];

const daysOfMonth = [
  '1st',
  '2nd',
  '3rd',
  '4th',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
  '11th',
  '12th',
  '13th',
  '14th',
  '15th',
  '16th',
  '17th',
  '18th',
  '19th',
  '20th',
  '21th',
  '22th',
  '23th',
  '24th',
  '25th',
  '26th',
  '27th',
  '28th',
  '29th',
  '30th',
  'Last day of month',
];

export default function Payroll({
  control,
  getValues,
  setValue,
  register,
}: any) {
  const cycleWatch = useWatch({
    control: control,
    name: 'payroll.cycle',
  });

  const firstPeriodWatch = useWatch({
    control: control,
    name: 'payroll.stPeriod',
  });

  const secondPeriodWatch = useWatch({
    control,
    name: 'payroll.ndPeriod',
  });
  const stPeriodIndex = daysOfMonth.findIndex((el) => el === firstPeriodWatch);
  const ndPeriodIndex = daysOfMonth.findIndex((el) => el === secondPeriodWatch);

  useEffect(() => {
    if (stPeriodIndex >= ndPeriodIndex) {
      setValue('payroll.ndPeriod', daysOfMonth[stPeriodIndex + 1]);
    }
  }, [firstPeriodWatch, stPeriodIndex, ndPeriodIndex, setValue]);
  return (
    <div className="flex flex-col items-start gap-7">
      <div className="flex w-full flex-col gap-4">
        <div className="grid w-full grid-cols-[24px_1fr_minmax(220px,max-content)] items-center gap-4 rounded-2xl border border-gray-2 p-4">
          <div className="text-blue-6">
            <WorkIcon />
          </div>
          <div className="font-bold">Week starts on</div>
          <div>
            <DropList
              getValues={getValues}
              setValue={setValue}
              data={days}
              object="payroll.weekStarts"
              panelClassName="w-[220px] "
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-[24px_1fr_minmax(220px,max-content)] items-center gap-4 rounded-2xl border border-gray-2 p-4">
          <div className="contents">
            <div className="text-[#32bf90]">
              <CycleIcon />
            </div>
            <div className="font-bold">Payroll cycle</div>
            <div>
              <DropList
                getValues={getValues}
                setValue={setValue}
                data={cycle}
                object="payroll.cycle"
                panelClassName="w-[220px] "
              />
            </div>
          </div>

          {cycleWatch !== 'No predefined cycle' && cycleWatch !== '1 week' && (
            <>
              <div className="col-span-3 h-px w-full bg-gray-2"></div>
              <div className="contents">
                <div className="text-purple-6">
                  <PeriodIcon />
                </div>
                <div className="font-bold">
                  {cycleWatch === 'Pay period ends' ? 'e' : 'End of 1st period'}
                </div>
                <div>
                  {cycleWatch === '2 weeks' || cycleWatch === '4 weeks' ? (
                    <Calender
                      setValue={setValue}
                      buttonStyling="rounded-xl "
                      formVariable="payroll.calender"
                    />
                  ) : cycleWatch === '1 month' ? (
                    <DropList
                      getValues={getValues}
                      setValue={setValue}
                      data={daysOfMonth}
                      object="payroll.monthPeriod"
                      panelClassName="w-[220px] "
                    />
                  ) : (
                    <DropList
                      getValues={getValues}
                      setValue={setValue}
                      data={daysOfMonth.slice(0, 20)}
                      object="payroll.stPeriod"
                      panelClassName="w-[220px] "
                    />
                  )}
                </div>
              </div>
              {cycleWatch === 'Twice a month' && (
                <div className="contents">
                  <div className="text-purple-6">
                    <PeriodIcon />
                  </div>
                  <div className="font-bold">End of 2st period</div>
                  <div>
                    <DropList
                      getValues={getValues}
                      setValue={setValue}
                      data={daysOfMonth.slice(stPeriodIndex + 1)}
                      object="payroll.ndPeriod"
                      panelClassName="w-[220px] "
                    />
                  </div>
                </div>
              )}
              {cycleWatch !== 'Twice a month' && (
                <div className="contents">
                  <div className="col-start-3 -mt-2 text-[12px]  leading-4 opacity-50">
                    We&apos;ll start counting
                    {cycleWatch === '2 weeks'
                      ? '2 weeks'
                      : cycleWatch === '4 weeks'
                      ? '4 weeks'
                      : '1 month'}{' '}
                    <br /> from this date
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="col-span-3 h-px w-full bg-gray-2"></div>

      <div>
        <Controller
          name="payroll.overnights"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="mb-2 flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={value}
                onChange={(e) => onChange(e.target.checked)}
                id="Overnight"
                className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
              />
              <RightIcon inputId="Overnight" />
              <label
                htmlFor="Overnight"
                className="cursor-pointer font-bold tracking-wider text-black"
              >
                Overnight shifts&apos; total hours will be assigned to the day
                the shift started
              </label>
            </div>
          )}
        />

        <div className="mb-2 ml-6 leading-5 opacity-70">
          Work hours, overtime, and breaks will be assigned to the day the shift
          started. When unchecked, all calculations will be according to each
          day, starting midnight.
        </div>

        <div className="ml-6 w-fit cursor-pointer text-blue-6 hover:text-blue-5">
          Learn more
        </div>
      </div>

      <div className="col-span-3 h-px w-full bg-gray-2"></div>

      <Remind
        control={control}
        getValues={getValues}
        setValue={setValue}
        register={register}
        remindName="remindUser"
        cycleWatch={cycleWatch}
      />

      <div className="col-span-3 h-px w-full bg-gray-2"></div>

      <Remind
        control={control}
        getValues={getValues}
        setValue={setValue}
        register={register}
        remindName="remindAdmin"
        cycleWatch={cycleWatch}
      />
    </div>
  );
}
