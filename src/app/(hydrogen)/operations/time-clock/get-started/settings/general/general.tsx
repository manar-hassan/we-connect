import QuestionMarkTooltip from '@/app/(hydrogen)/shared/qestion-mark-tooltip';
import RightIcon from '@/components/icons/right-icon';
import { Controller } from 'react-hook-form';
import { Input } from 'rizzui';
import Limits from './limits';
import { motion } from 'framer-motion';
import ShowPayRates from './show-pay-rates';
import TimeFormat from './time-format';
import TimeZone from './time-zone';
import CanDays from './can-lock-days';
export default function General({
  control,
  watch,
  setValue,
  getValues,
}: {
  control: any;
  watch: any;
  setValue: any;
  getValues: any;
}) {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  return (
    <div className="flex flex-col items-start gap-7">
      <div className="flex items-stretch gap-7">
        <div className="items-evenly flex flex-col justify-around whitespace-nowrap">
          <div className="flex items-center gap-2">
            Work days:{' '}
            <QuestionMarkTooltip text="Work days and work hours will affect absences hour calculations in the employee timesheet" />
          </div>
          <div>Work hours: </div>
        </div>
        <div className="grid w-full grid-cols-7 gap-2.5">
          {days.map((day) => (
            <div
              key={day}
              className="relative flex flex-col items-center justify-center "
            >
              <Controller
                name={`general.${day}`}
                control={control}
                render={({ field: { value, onChange } }) => (
                  <>
                    <input
                      defaultChecked={value.isChecked}
                      onChange={(e) =>
                        onChange({
                          ...value,
                          isChecked: e.target.checked,
                        })
                      }
                      id={day}
                      type="checkbox"
                      className="peer flex h-8 w-8 appearance-none items-center justify-center rounded-full border border-[#b9b9b9] text-[15px] font-normal text-black transition duration-100 hover:cursor-pointer hover:bg-gray-1 checked:hover:!bg-blue-5 focus:shadow-none focus:ring-transparent"
                    />
                    <label
                      htmlFor={day}
                      className="absolute left-1/2 top-1.5 -translate-x-1/2 cursor-pointer select-none text-[15px] peer-checked:border-none peer-checked:font-bold peer-checked:text-white "
                    >
                      {day.charAt(0).toUpperCase()}
                    </label>
                    <div className="h-4 w-px bg-[#d3d3d3]"></div>
                    <input
                      disabled={!watch(`general.${day}`).isChecked}
                      defaultValue={value.hours}
                      onChange={(e) =>
                        onChange({
                          ...value,
                          hours: parseInt(e.target.value, 10),
                        })
                      }
                      type="number"
                      className="flex h-10 w-full items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                    />
                  </>
                )}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 ">
        <div className="flex items-center gap-2">
          Default work day hours:{' '}
          <QuestionMarkTooltip text="Set the default work hours when adding new shifts" />
        </div>
        <div className="flex items-center gap-1.5">
          From:
          <Controller
            name="general.workFrom"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                type="time"
                name="general.workFrom"
                defaultValue={value}
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                rounded="pill"
                className="h-10 w-fit rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4"
              />
            )}
          />
          To:{' '}
          <Controller
            name="general.workTo"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                type="time"
                name="general.workTo"
                defaultValue={value}
                rounded="pill"
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                className="h-10 w-fit rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4 "
              />
            )}
          />
        </div>
      </div>

      <div className="h-px w-full bg-[#dcdcdc]"></div>

      <div className="flex w-full flex-col gap-4">
        <Controller
          name="general.dailyLimit"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className=" flex w-full items-stretch justify-between">
              <div className="flex flex-col items-start justify-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={value.isChecked}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        isChecked: e.target.checked,
                      })
                    }
                    id="dailyLimit"
                    className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                  />
                  <RightIcon inputId="dailyLimit" />
                  <label
                    htmlFor="dailyLimit"
                    className="cursor-pointer text-primary"
                  >
                    Daily limit
                  </label>
                </div>
                <div className="leading-6 opacity-50">
                  You&apos;ll be notified when a limit is exceeded
                </div>
              </div>
              <Limits
                value={value}
                setValue={setValue}
                control={control}
                object="general.dailyLimit"
                getValues={getValues}
              />
            </div>
          )}
        />

        <Controller
          name="general.autoClockOut"
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className=" flex w-full items-stretch justify-between">
              <div className="flex flex-col items-start justify-start">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={value.isChecked}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        isChecked: e.target.checked,
                      })
                    }
                    id="AutoClockOut"
                    className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                  />
                  <RightIcon inputId="AutoClockOut" />
                  <label
                    htmlFor="AutoClockOut"
                    className="cursor-pointer text-primary"
                  >
                    Auto clock out
                  </label>
                </div>
                <div className="leading-6 opacity-50">
                  Employees exceeding daily limit, will be automatically clocked
                  out
                </div>
              </div>
              <Limits
                value={value}
                setValue={setValue}
                control={control}
                object="general.autoClockOut"
                getValues={getValues}
              />
            </div>
          )}
        />

        <Controller
          name="general.diffScheduleWorked"
          control={control}
          render={({ field: { value, onChange } }) => {
            return (
              <>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={value.isChecked}
                    onChange={(e) =>
                      onChange({
                        ...value,
                        isChecked: e.target.checked,
                      })
                    }
                    id="diffScheduleWorked"
                    className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                  />
                  <RightIcon inputId="diffScheduleWorked" />
                  <label
                    htmlFor="diffScheduleWorked"
                    className="cursor-pointer text-primary"
                  >
                    Show the difference between scheduled and worked time
                  </label>
                </div>
              </>
            );
          }}
        />
        <motion.div
          animate={{
            height: watch('general.diffScheduleWorked.isChecked')
              ? 'auto'
              : '0',
          }}
          className="w-full overflow-hidden rounded-xl"
        >
          <div className="flex flex-col gap-2 bg-gray-1 p-4 ">
            <div>
              <Controller
                name="general.workedMore"
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <div className="relative flex items-center gap-2">
                      <input
                        type="checkbox"
                        defaultChecked={value.isChecked}
                        onChange={(e) =>
                          onChange({
                            ...value,
                            isChecked: e.target.checked,
                          })
                        }
                        id="workedMore"
                        className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                      />
                      <RightIcon inputId="workedMore" />
                      <label
                        htmlFor="workedMore"
                        className="cursor-pointer text-primary"
                      >
                        Highlight if employee worked
                      </label>
                      <input
                        disabled={!watch('general.workedMore.isChecked')}
                        defaultValue={value.hours}
                        onChange={(e) =>
                          onChange({
                            ...value,
                            hours: parseInt(e.target.value, 10),
                          })
                        }
                        type="number"
                        className="flex  h-10 w-14 items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                      />
                      minutes more than scheduled
                    </div>
                  );
                }}
              />
            </div>

            <div>
              <Controller
                name="general.workedLess"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="relative flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked={value.isChecked}
                      onChange={(e) =>
                        onChange({
                          ...value,
                          isChecked: e.target.checked,
                        })
                      }
                      id="workedLess"
                      className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                    />
                    <RightIcon inputId="workedLess" />
                    <label
                      htmlFor="workedLess"
                      className="cursor-pointer text-primary"
                    >
                      Highlight if employee worked
                    </label>
                    <input
                      disabled={!watch('general.workedLess.isChecked')}
                      defaultValue={value.hours}
                      onChange={(e) =>
                        onChange({
                          ...value,
                          hours: parseInt(e.target.value, 10),
                        })
                      }
                      type="number"
                      className="flex h-10 w-14 items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                    />
                    minutes less than scheduled
                  </div>
                )}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="h-px w-full bg-[#dcdcdc]"></div>

      <Controller
        name="general.timesheetLocking"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <div className="flex flex-col items-start justify-start">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  defaultChecked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  id="timesheetLocking"
                  className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                />
                <RightIcon inputId="timesheetLocking" />
                <label
                  htmlFor="timesheetLocking"
                  className="cursor-pointer text-primary"
                >
                  Timesheet locking
                </label>
              </div>
              <div className="leading-6 opacity-50">
                An admin can lock users&apos; timesheets, to prevent users and
                other admins from editing entries after they are locked
              </div>
            </div>
          );
        }}
      />

      <div className="grid w-full grid-cols-2 gap-5 text-sm">
        <div className="flex flex-col gap-2">
          Select who can lock days
          <Controller
            name="general.canLockDays"
            control={control}
            render={({ field: { value } }) => (
              <CanDays setValue={setValue} type="lock" />
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          Select who can unlock days
          <Controller
            name="general.canUnlockDays"
            control={control}
            render={({ field: { value } }) => (
              <CanDays setValue={setValue} type="unLock" />
            )}
          />
        </div>
      </div>

      <div className="h-px w-full bg-[#dcdcdc]"></div>

      <div className=" flex w-full flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex flex-col ">
            Show pay rates{' '}
            <div>
              <span className="leading-6 opacity-50">
                Turn pay rates on/off in the{' '}
              </span>
              <span className="cursor-pointer text-blue-6 hover:underline">
                Company settings
              </span>
            </div>
          </div>
          <Controller
            name="general.showPayRates"
            control={control}
            render={({ field: { value } }) => (
              <ShowPayRates setValue={setValue} getValues={getValues} />
            )}
          />
        </div>
        <div className="flex justify-between">
          Timesheet & payroll export format
          <Controller
            name="general.timeFormat"
            control={control}
            render={() => (
              <TimeFormat setValue={setValue} getValues={getValues} />
            )}
          />
        </div>
        <div className="flex justify-between">
          Time zone
          <Controller
            name="general.timeZone"
            control={control}
            render={() => (
              <TimeZone setValue={setValue} getValues={getValues} />
            )}
          />
        </div>
      </div>
    </div>
  );
}
