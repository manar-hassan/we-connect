import RightIcon from '@/components/icons/right-icon';
import cn from '@/utils/class-names';
import { Controller } from 'react-hook-form';
import { Input } from 'rizzui';
import Limits from '../general/limits';

const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export default function Reminders({
  control,
  watch,
  setValue,
  getValues,
  register,
}: {
  control: any;
  watch: any;
  setValue: any;
  getValues: any;
  register: any;
}) {
  return (
    <div>
      <div className="mb-3 font-bold">Reminders active on:</div>
      <div className="mb-8 flex w-full items-center gap-2">
        {days.map((day) => (
          <div
            key={day}
            className="relative flex flex-col items-center justify-center "
          >
            <Controller
              name={`reminders.${day}`}
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <input
                    defaultChecked={value}
                    onChange={(e) => onChange(e.target.checked)}
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
                </>
              )}
            />
          </div>
        ))}
      </div>

      <div className="mb-3 font-bold">Employee reminders</div>
      <div className="grid grid-cols-[1fr_150px] gap-x-16 gap-y-4">
        <Controller
          name="reminders.clockIn"
          control={control}
          render={({ field: { value, onChange } }) => (
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
                  id="clockIn"
                  className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                />
                <RightIcon inputId="clockIn" />
                <label
                  htmlFor="clockIn"
                  className="cursor-pointer text-primary"
                >
                  Remind employees to <b>clock in</b> at:
                </label>
              </div>
              <Input
                disabled={!watch('reminders.clockIn.isChecked')}
                type="time"
                name="reminders.clockIn.time"
                {...register('reminders.clockIn.time')}
                rounded="pill"
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                className={cn(
                  'h-10 w-full rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent peer-disabled:!opacity-50 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4 ',
                  !watch('reminders.clockIn.isChecked') &&
                    '!bg-white opacity-50'
                )}
              />
            </>
          )}
        />

        <Controller
          name="reminders.clockOut"
          control={control}
          render={({ field: { value, onChange } }) => (
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
                  id="clockOut"
                  className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                />
                <RightIcon inputId="clockOut" />
                <label
                  htmlFor="clockOut"
                  className="cursor-pointer text-primary"
                >
                  Remind employees to <b>clock out</b> at:
                </label>
              </div>
              <Input
                disabled={!watch('reminders.clockOut.isChecked')}
                type="time"
                name="reminders.clockOut.time"
                {...register('reminders.clockOut.time')}
                rounded="pill"
                onChange={(e) => {
                  onChange(e.target.value);
                }}
                className={cn(
                  'h-10 w-full  rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent peer-disabled:!opacity-50 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4 ',
                  !watch('reminders.clockOut.isChecked') &&
                    '!bg-white opacity-50'
                )}
              />
            </>
          )}
        />

        <Controller
          name="reminders.dailyLimit"
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
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
                  Employees will be notified when the limit is exceeded
                </div>
              </div>
              <Limits
                value={value}
                setValue={setValue}
                control={control}
                object="reminders.dailyLimit"
                getValues={getValues}
              />
            </>
          )}
        />
      </div>
    </div>
  );
}
