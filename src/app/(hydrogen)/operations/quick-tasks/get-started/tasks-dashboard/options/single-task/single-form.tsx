import cn from '@/utils/class-names';
import AssignTo from './assign-to';
import PlusSecIcon from '@/components/icons/plus-sec';
import Button from '@/app/(hydrogen)/shared/button';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useWatch } from 'react-hook-form';
import Calender from '@/app/(hydrogen)/operations/time-clock/get-started/settings/payroll/calender';
import { Input, Tooltip } from 'rizzui';
import SelectLabel from './select-label';
import Separator from '@/app/(hydrogen)/shared/separator';
import X from '@/components/icons/x';
import MapPinMissingIcon from '@/components/icons/mpa-pin-missing-icon';
import DropList from '@/app/(hydrogen)/shared/drop-list';
import RightIcon from '@/components/icons/right-icon';

export default function SingleForm({
  register,
  errors,
  setValue,
  control,
  openDetails,
  setOpenDetails,
  getValues,
  setTap,
}: any) {
  const handleOpenDetails = () => {
    setOpenDetails(true);
  };
  const watchAssignTo = useWatch({
    control,
    name: 'assignTo',
  });
  const watchFrequency = useWatch({
    control,
    name: 'frequency',
  });
  return (
    <AnimatePresence>
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[max-content_1fr] items-center gap-3">
          <div className="contents ">
            <label htmlFor="taskTitle" className="shrink-0">
              Task title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="taskTitle"
              placeholder="Type here"
              {...register('taskTitle')}
              className={cn(
                ' w-full rounded-xl border-gray-200 outline-none placeholder:text-sm focus:border-blue-6 focus:outline-none focus:ring-transparent',
                errors.taskTitle && 'border-red-600'
              )}
            />
          </div>
          {openDetails && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="contents"
            >
              <label htmlFor="description" className="shrink-0 self-start pt-2">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                placeholder="Type here"
                {...register('description')}
                className={cn(
                  ' min-h-[150px] focus:border-blue-6 w-full self-start rounded-xl border-gray-200 outline-none placeholder:text-sm focus:outline-none focus:ring-transparent'
                )}
              />
            </motion.div>
          )}
          <div className="contents">
            <label className="shrink-0">
              Assign to <span className="text-red-600">*</span>
            </label>
            <AssignTo
              setValue={setValue}
              error={errors.assignTo}
              variable="assignTo"
            />
          </div>

          {watchAssignTo.length > 1 && (
            <div className="contents">
              <div></div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    id="group"
                    value="group"
                    {...register('taskDistribution')}
                  />
                   
                  <label
                    htmlFor="group"
                    className="cursor-pointer text-sm font-bold"
                  >
                    Group task
                  </label>
                </div>
                <div className="flex items-center gap-1 ">
                  <input
                    type="radio"
                    id="individual"
                    value="individual"
                    {...register('taskDistribution')}
                  />
                   
                  <label
                    htmlFor="individual"
                    className="cursor-pointer text-sm font-bold"
                  >
                    Separate task for each user
                  </label>
                </div>
              </div>
            </div>
          )}

          {openDetails && (
            <>
              <div className="contents ">
                <label htmlFor="location" className="shrink-0">
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="location"
                    placeholder="Type Location"
                    {...register('location')}
                    className={cn(
                      ' w-full rounded-xl  border-gray-200 pr-8 outline-none placeholder:text-sm focus:border-blue-6 focus:outline-none focus:ring-transparent'
                    )}
                  />
                  <Tooltip
                    tooltipArrowClassName=" [&>path]:fill-gray-10"
                    className="relative z-[1000] rounded-md bg-gray-10 p-2 "
                    placement="top"
                    showArrow={false}
                    content={() => (
                      <div className="w-52">
                        Choose from the address options list to link this
                        location to a map navigation app
                      </div>
                    )}
                  >
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer ">
                      <MapPinMissingIcon />
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="contents">
                <label>Frequency</label>
                <div className="flex flex-col gap-2 ">
                  <div className="grid grid-cols-2 gap-2 rounded-md bg-[#f8f8f8] p-1">
                    <label
                      htmlFor="one-off"
                      className={cn(
                        'flex h-8 cursor-pointer items-center justify-center rounded',
                        watchFrequency === 'one-off' &&
                          'bg-white text-blue-6 shadow-sm'
                      )}
                    >
                      <input
                        type="radio"
                        id="one-off"
                        value="one-off"
                        {...register('frequency')}
                        className="hidden"
                      />
                      One-off task
                    </label>
                    <label
                      htmlFor="recurring"
                      className={cn(
                        'flex h-8 cursor-pointer items-center justify-center rounded',
                        watchFrequency === 'recurring' &&
                          'bg-white text-blue-6 shadow-sm'
                      )}
                    >
                      <input
                        type="radio"
                        id="recurring"
                        value="recurring"
                        {...register('frequency')}
                        className="hidden"
                      />
                      Recurring task
                    </label>
                  </div>
                </div>
                {watchFrequency === 'one-off' ? (
                  <>
                    {' '}
                    <div className="contents">
                      <div>Start date</div>
                      <div className="grid grid-cols-2 gap-1">
                        <Calender
                          setValue={setValue}
                          buttonStyling="rounded-xl "
                          formVariable="start.date"
                          control={control}
                        />
                        <div className="flex items-center gap-1">
                          <Input
                            type="time"
                            {...register('start.time')}
                            className="h-10 w-full rounded-xl border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4"
                          />
                          <button
                            type="button"
                            onClick={() => setValue('start.date', null)}
                          >
                            <X />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="contents">
                      <div>End date</div>
                      <div className="grid grid-cols-2 gap-1">
                        <Calender
                          setValue={setValue}
                          buttonStyling="rounded-xl "
                          formVariable="end.date"
                          control={control}
                        />
                        <div className="flex items-center gap-1">
                          <Input
                            type="time"
                            {...register('end.time')}
                            className="h-10 w-full rounded-xl border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4"
                          />
                          <button
                            type="button"
                            onClick={() => setValue('end.date', null)}
                          >
                            <X />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="contents">
                      <div></div>
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <div>Starting from</div>
                          <Calender
                            setValue={setValue}
                            buttonStyling="rounded-xl "
                            formVariable="recStart"
                          />
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                          <DropList
                            getValues={getValues}
                            setValue={setValue}
                            object="recFreq"
                            data={['daily', 'weekly', 'monthly']}
                            buttonClassName="p-2 min-w-[90px]"
                          />
                          <div>Every</div>
                          <DropList
                            getValues={getValues}
                            setValue={setValue}
                            object="recEvery"
                            data={[1, 2, 3]}
                          />
                          <div>at</div>
                          <Input
                            type="time"
                            {...register('recTime')}
                            className="h-10 w-full rounded-xl border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4 [&_.is-focus]:border-blue-5 [&_.is-focus]:ring-transparent [&_.is-focus]:delay-0 [&_.is-focus]:duration-0 [&_.is-focus]:hover:!border-blue-5 [&_span]:hover:!border-gray-4"
                          />
                        </div>
                        <div className="mb-3 flex items-center gap-2">
                          <div>End repeat</div>
                          <DropList
                            getValues={getValues}
                            setValue={setValue}
                            object="recEndStatus"
                            data={['after', 'on']}
                            buttonClassName="w-[85px]"
                          />
                          <input
                            {...register('recTasks', {
                              setValueAs: (value: string) => parseInt(value),
                            })}
                            type="number"
                            className="flex h-10 w-14 items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                          />
                          <div>Tasks</div>
                        </div>
                        <div className="relative flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="notify"
                            {...register('notify')}
                            className="relative border border-[#b9b9b9] font-normal transition duration-100  hover:cursor-pointer hover:bg-gray-1 focus:border-blue-6  focus:shadow-none focus:ring-transparent"
                          />
                          <RightIcon inputId="notify" />
                          <label
                            htmlFor="notify"
                            className="cursor-pointer text-primary"
                          >
                            Notify me when this task recurrence starts
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="contents">
                      <div>Due</div>
                      <div className="flex items-center gap-2">
                        <input
                          {...register('recDue.count', {
                            setValueAs: (value: string) => parseInt(value),
                          })}
                          type="number"
                          className="flex h-10 w-14 items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
                        />
                        <DropList
                          getValues={getValues}
                          setValue={setValue}
                          object="recDue.time"
                          data={['minutes', 'hours', 'days']}
                          buttonClassName="w-[104px]"
                        />
                        <div className="shrink-0">
                          After the task&apos;s start time
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="contents">
                  <div>Label</div>
                  <SelectLabel setValue={setValue} getValues={getValues} />
                </div>
                <Separator horizontal className="col-span-2 my-2" />
                <div className="col-span-2 flex items-center justify-between">
                  <div className="text-base">Sub tasks</div>
                  <Button onClick={() => setTap('subtasks')}>
                    Add sub tasks
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {!openDetails && (
          <Button
            onClick={handleOpenDetails}
            variant="secondary"
            className="w-fit"
          >
            <PlusSecIcon /> Add more details
          </Button>
        )}

        {/*         <button type="button" onClick={() => setOpenDetails(false)}>
          close details
        </button> */}
      </div>
    </AnimatePresence>
  );
}
