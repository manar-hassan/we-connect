'use client';
import Checkbox from '@/app/(hydrogen)/shared/checkbox';
import AddShift from '@/components/icons/add-shift';
import ArrowDown from '@/components/icons/arrow-down';
import DeleteIcon from '@/components/icons/delete';
import LockIcon from '@/components/icons/lock';
import cn from '@/utils/class-names';
import React, { Fragment, useEffect, useState } from 'react';
import SelectStatus from './selectStatus';
import { IAttendance, IData, IDay } from './types';
import { addMultipleTimes } from '@/utils/addTimes';
import { subtractTimes } from '@/utils/subTwoTimes';
import { useGetJobs } from '@/app/api/time-clock/jobs';
import {
  usePostAttendance,
  useEditAttendance,
  useDeleteAttendance,
} from '@/app/api/time-clock/attendances';
import { formatDate } from '@/utils/format-date';

export default function CustomTable({
  setSelectedShifts,
  setSelectedDays,
  tableData,
  startRange,
  endRange,
  userId,
}: {
  setSelectedShifts: React.Dispatch<React.SetStateAction<IAttendance[]>>;
  setSelectedDays: React.Dispatch<React.SetStateAction<IDay[]>>;
  tableData: IData[];
  startRange: Date;
  endRange: Date;
  userId: number;
}) {
  const { data: jobsData, isLoading, isError } = useGetJobs();
  const jobs = jobsData?.data?.data?.projects;
  const initialTime = '09:00';

  const [data, setData] = useState<IData[]>(tableData);

  const createAttendance = usePostAttendance({
    onSuccess: (res) => console.log(res),
  });
  const editAttendance = useEditAttendance({
    onSuccess: (res) => console.log(res),
  });
  const deleteAttendance = useDeleteAttendance({
    onSuccess: (res) => console.log(res),
  });

  const handleDaySpan = (
    attendancesLength: number,
    attendancesIndex: number
  ) => {
    if (attendancesIndex === 0) {
      return { rowSpan: attendancesLength };
    } else {
      return { style: { display: 'none' } };
    }
  };

  const handleWeekSpan = (
    days: IData['days'],
    attendancesIndex: number,
    dayIndex: number
  ) => {
    let weekLength = 0;
    days.forEach((day) => (weekLength += day.attendances.length));
    if (attendancesIndex === 0 && dayIndex === 0) {
      return { rowSpan: weekLength };
    } else {
      return { style: { display: 'none' } };
    }
  };

  const handleSelectDay = (
    weekIndex: number,
    dayIndex: number,
    checked: boolean
  ) => {
    setData((prev) => {
      return prev.map((week, baseWeekIndex: number) => {
        if (baseWeekIndex === weekIndex) {
          const { days } = week;
          return {
            ...week,
            days: days.map((day, baseDayIndex: number) => {
              if (baseDayIndex === dayIndex) {
                return {
                  ...day,
                  checked,
                };
              } else {
                return day;
              }
            }),
          };
        } else {
          return week;
        }
      });
    });
  };

  const handleSelectAllDays = (checked: boolean) => {
    setData((prev) => {
      return prev.map((week) => {
        const { days } = week;
        return {
          ...week,
          days: days.map((day) => ({
            ...day,
            checked,
          })),
        };
      });
    });
  };

  const handleSelectAllShifts = (checked: boolean) => {
    setData((prev) => {
      return prev.map((week) => {
        const { days } = week;
        return {
          ...week,
          days: days.map((day) => ({
            ...day,
            attendances: day.attendances.map((attendance) => {
              if (typeof attendance.start === 'string') {
                return {
                  ...attendance,
                  checked,
                };
              } else {
                return {
                  ...attendance,
                  checked: false,
                };
              }
            }),
          })),
        };
      });
    });
  };

  const handleAddShift = (weekIndex: number, dayIndex: number) => {
    setData((prev) => {
      return prev.map((week, baseWeekIndex: number) => {
        if (baseWeekIndex === weekIndex) {
          const { days } = week;
          return {
            ...week,
            days: days.map((day, baseDayIndex: number) => {
              if (baseDayIndex === dayIndex) {
                return {
                  ...day,
                  attendances: [...day.attendances, {}],
                };
              } else {
                return day;
              }
            }),
          };
        } else {
          return week;
        }
      });
    });
  };

  const handleRemoveShift = (
    weekIndex: number,
    dayIndex: number,
    attendanceIndex: number,
    attendanceId: number
  ) => {
    setData((prev) => {
      return prev.map((week, baseWeekIndex: number) => {
        if (baseWeekIndex === weekIndex) {
          const { days } = week;
          return {
            ...week,
            days: days.map((day, baseDayIndex: number) => {
              if (baseDayIndex === dayIndex) {
                if (day.attendances.length === 1) {
                  return {
                    ...day,
                    attendances: [
                      {
                        checked: false,
                        status: undefined,
                        color: undefined,
                        employeeNotes: undefined,
                        managerNotes: undefined,
                        start: undefined,
                        end: undefined,
                        totalHours: undefined,
                      },
                    ],
                  };
                } else {
                  return {
                    ...day,
                    attendances: day.attendances.filter(
                      (_, index: number) => index !== attendanceIndex
                    ),
                  };
                }
              } else {
                return day;
              }
            }),
          };
        } else {
          return week;
        }
      });
    });

    deleteAttendance.mutate({
      from: formatDate(startRange),
      to: formatDate(endRange),
      attendancesId: [{ id: attendanceId }],
    });
  };

  const checkIfDayWithNullAttendance = (
    weekIndex: number,
    dayIndex: number
  ) => {
    const day = data[weekIndex].days[dayIndex];
    const { attendances } = day;
    return attendances.some(
      (attendance) => typeof attendance.start !== 'string'
    );
  };

  const handleOnAttendanceChange = (
    weekIndex: number,
    dayIndex: number,
    attendanceIndex: number,
    attendanceInput: keyof IAttendance,
    value: string | boolean,
    fullDate: string
  ) => {
    const date = fullDate.split(' ')[0];
    setData((prev) => {
      return prev.map((week, baseWeekIndex: number) => {
        if (baseWeekIndex === weekIndex) {
          const { days } = week;
          return {
            ...week,
            days: days.map((day, baseDayIndex: number) => {
              if (baseDayIndex === dayIndex) {
                return {
                  ...day,
                  attendances: day.attendances.map(
                    (attendance, baseAttendanceIndex: number) => {
                      if (baseAttendanceIndex === attendanceIndex) {
                        if (
                          attendanceInput === 'start' &&
                          typeof attendance.status !== 'string'
                        ) {
                          createAttendance.mutate({
                            clockIn: `${date} ${value}`,
                            from: formatDate(startRange),
                            to: formatDate(endRange),
                            projectId: jobs[0].id,
                            userId,
                          });
                          return {
                            ...attendance,
                            [attendanceInput]: value as string,
                            status: jobs[0].project_name,
                            color: jobs[0].color,
                          };
                        } else if (
                          (attendanceInput === 'status' ||
                            attendanceInput === 'color') &&
                          typeof attendance.start !== 'string'
                        ) {
                          createAttendance.mutate({
                            clockIn: `${date} ${initialTime}`,
                            from: formatDate(startRange),
                            to: formatDate(endRange),
                            projectId: jobs.find(
                              (job: any) => job.project_name === value
                            ).id,
                            userId,
                          });
                          return {
                            ...attendance,
                            [attendanceInput]: value,
                            start: initialTime,
                          };
                        } else {
                          const sendData: any = {
                            from: formatDate(startRange),
                            to: formatDate(endRange),
                            attendanceId: attendance.id,
                          };
                          if (attendanceInput === 'status') {
                            sendData['projectId'] = jobs.find(
                              (job: any) => job.project_name === value
                            ).id;
                          } else if (attendanceInput === 'start') {
                            sendData['clockIn'] = `${date} ${value}`;
                          } else if (attendanceInput === 'end') {
                            sendData['clockOut'] = `${date} ${value}`;
                          } else if (attendanceInput === 'employeeNotes') {
                            sendData['note'] = String(value);
                          } else if (attendanceInput === 'managerNotes') {
                            sendData['adminNote'] = String(value);
                          }

                          if (
                            attendanceInput !== 'employeeNotes' &&
                            attendanceInput !== 'managerNotes'
                          ) {
                            editAttendance.mutate(sendData);
                          }

                          console.log(sendData);

                          return { ...attendance, [attendanceInput]: value };
                        }
                      } else {
                        return attendance;
                      }
                    }
                  ),
                };
              } else {
                return day;
              }
            }),
          };
        } else {
          return week;
        }
      });
    });
  };

  useEffect(() => {
    const selectedShifts: IAttendance[] = [];
    data.map((week) => {
      const { days } = week;
      days.map((day) => {
        const { attendances } = day;
        attendances.map((attendance) => {
          if (attendance.checked) {
            selectedShifts.push(attendance);
          }
        });
      });
    });
    setSelectedShifts(selectedShifts);
  }, [data, setSelectedShifts]);

  useEffect(() => {
    const selectedDays: IDay[] = [];
    data.map((week) => {
      const { days } = week;
      days.map((day) => {
        if (day.checked) {
          selectedDays.push(day);
        }
      });
    });
    setSelectedDays(selectedDays);
  }, [data, setSelectedDays]);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);

  const calcTotalDaily = (weekIndex: number, dayIndex: number) => {
    const totalDaily: string[] = [];
    data.map((week, baseWeekIndex) => {
      if (baseWeekIndex === weekIndex) {
        week.days.map((day, baseDayIndex) => {
          if (dayIndex === baseDayIndex) {
            day.attendances.map((attendance) => {
              totalDaily.push(attendance.totalHours || '00:00');
            });
          }
        });
      }
    });

    return addMultipleTimes(totalDaily);
  };

  const calcTotalWeekly = (weekIndex: number) => {
    const totalWeekly: string[] = [];
    data.map((week, baseWeekIndex) => {
      if (baseWeekIndex === weekIndex) {
        week.days.map((day, baseDayIndex) => {
          day.attendances.map((attendance) => {
            totalWeekly.push(attendance.totalHours || '00:00');
          });
        });
      }
    });

    return addMultipleTimes(totalWeekly);
  };
  return (
    <table className="relative w-full text-center">
      <thead className="sticky top-0 z-10 ">
        <tr className="h-[50px]  bg-[#F8F8F8]">
          <td className="applied-head ">
            <Checkbox
              id="main-checkbox-days"
              onChange={(e) => handleSelectAllDays(e.target.checked)}
            />
          </td>
          <td className="max-w-[30px]"></td>
          <td className="applied-head">Date</td>
          <td></td>
          <td className="applied-head ">
            <Checkbox
              id="main-checkbox-shift"
              onChange={(e) => handleSelectAllShifts(e.target.checked)}
            />
          </td>
          <td className="applied-head">Status</td>
          <td className="applied-head">Start</td>
          <td className="applied-head">End</td>
          <td className="applied-head">Total hours</td>
          <td className="applied-head">Daily total</td>
          <td className="applied-head">Weekly total</td>
          <td className="applied-head">Total regular</td>
          <td className="">
            <div className="w-9">
              <div className="absolute top-0 mr-3 flex h-[calc(100vh-200px)] w-9 items-center  justify-center whitespace-nowrap bg-gray-2">
                <span className="flex rotate-[270deg] items-center justify-center gap-3">
                  Shift attachments <ArrowDown className="text-secondary" />
                </span>
              </div>
            </div>
          </td>
          <td className="applied-head">Employee notes</td>
          <td className="applied-head">Manager notes</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      {data.map((week, weekIndex) => (
        <tbody key={weekIndex}>
          <tr>
            <td
              colSpan={17}
              className="h-8 w-full bg-gray-2 text-xs font-semibold text-secondary"
            >
              {week.range}
            </td>
          </tr>
          {week.days.map((day, dayIndex) => (
            <Fragment key={dayIndex}>
              {day.attendances.map((attendance, attendanceIndex) => (
                <tr
                  key={attendanceIndex}
                  className={cn(
                    'group  h-10 bg-white',
                    attendanceIndex === day.attendances.length - 1 && 'border-b'
                  )}
                >
                  <td
                    {...handleDaySpan(day.attendances.length, attendanceIndex)}
                    className={cn(
                      'applied-head opacity-0 transition duration-100 group-hover:opacity-100',
                      day.checked && 'opacity-100'
                    )}
                  >
                    <Checkbox
                      id={`${weekIndex}-${dayIndex}-checkbox-days`}
                      checked={day.checked}
                      onChange={(e) =>
                        handleSelectDay(weekIndex, dayIndex, e.target.checked)
                      }
                    />
                  </td>
                  <td
                    {...handleDaySpan(day.attendances.length, attendanceIndex)}
                    className="applied-head max-w-[30px] opacity-0 transition duration-100 group-hover:opacity-100"
                  >
                    <button
                      disabled={checkIfDayWithNullAttendance(
                        weekIndex,
                        dayIndex
                      )}
                      onClick={() => handleAddShift(weekIndex, dayIndex)}
                      className="align-middle disabled:opacity-50"
                    >
                      <AddShift />
                    </button>
                  </td>
                  <td
                    {...handleDaySpan(day.attendances.length, attendanceIndex)}
                    className="applied-head font-bold"
                  >
                    {day.date}
                  </td>
                  <td
                    {...handleDaySpan(day.attendances.length, attendanceIndex)}
                    className="opacity-0 transition duration-100 group-hover:opacity-100"
                  >
                    <button className="rounded bg-blue-1 p-1 ">
                      <LockIcon width={9} height={12} />
                    </button>
                  </td>

                  <td
                    className={cn(
                      'applied-head opacity-0 transition duration-100 group-hover:bg-[#f9f9f9] group-hover:opacity-100',
                      attendance.checked && 'opacity-100'
                    )}
                  >
                    {attendance?.start && (
                      <Checkbox
                        id={`${weekIndex}-${dayIndex}-${attendanceIndex}-checkbox-shift`}
                        checked={attendance.checked}
                        onChange={(e) =>
                          handleOnAttendanceChange(
                            weekIndex,
                            dayIndex,
                            attendanceIndex,
                            'checked',
                            e.target.checked,
                            day.full_date
                          )
                        }
                      />
                    )}
                  </td>
                  <td
                    className={cn(
                      'applied-head transition duration-100 group-hover:bg-[#f9f9f9]'
                    )}
                  >
                    <SelectStatus
                      status={attendance.status}
                      color={attendance.color}
                      handleOnAttendanceChange={handleOnAttendanceChange}
                      weekIndex={weekIndex}
                      dayIndex={dayIndex}
                      attendanceIndex={attendanceIndex}
                      buttonStyling={
                        typeof attendance.status !== 'string'
                          ? 'group-hover:border mx-auto group-hover:border-dashed group-hover:rounded-none'
                          : 'mx-auto'
                      }
                      fullDate={day.full_date}
                    />
                  </td>
                  <td className="applied-head transition duration-100 group-hover:bg-[#f9f9f9]">
                    <input
                      className={cn(
                        'custom-table-time mx-auto block h-[25px] cursor-pointer border-none px-2 py-0 text-sm focus:ring-transparent group-hover:bg-[#f9f9f9]',
                        typeof attendance.start !== 'string'
                          ? 'group-hover:rounded-none group-hover:border group-hover:border-dashed group-hover:border-gray-200 group-hover:px-1.5'
                          : ''
                      )}
                      type="time"
                      id="timeInput"
                      min="00:00"
                      max="23:59"
                      value={attendance.start || ''}
                      onChange={(e) =>
                        handleOnAttendanceChange(
                          weekIndex,
                          dayIndex,
                          attendanceIndex,
                          'start',
                          e.target.value,
                          day.full_date
                        )
                      }
                    />
                  </td>
                  <td className="applied-head transition duration-100 group-hover:bg-[#f9f9f9]">
                    <input
                      disabled={typeof attendance.start !== 'string'}
                      className={cn(
                        'custom-table-time cursor-pointer border-none p-0 text-sm focus:ring-transparent group-hover:bg-[#f9f9f9]',
                        typeof attendance.start !== 'string' &&
                          'ml-auto block cursor-default'
                      )}
                      type="time"
                      id="timeInput"
                      min={attendance.start}
                      max="23:59"
                      value={attendance.end || ''}
                      onChange={(e) =>
                        handleOnAttendanceChange(
                          weekIndex,
                          dayIndex,
                          attendanceIndex,
                          'end',
                          e.target.value,
                          day.full_date
                        )
                      }
                    />
                  </td>
                  <td className="applied-head transition duration-100 group-hover:bg-[#f9f9f9]">
                    {typeof attendance.end === 'string'
                      ? subtractTimes(
                          attendance.end || '00:00',
                          attendance.start || '00:00'
                        )
                      : '00:00'}
                  </td>
                  <td
                    {...handleDaySpan(day.attendances.length, attendanceIndex)}
                    className="applied-head font-bold"
                  >
                    {calcTotalDaily(weekIndex, dayIndex)}
                  </td>
                  <td
                    {...handleWeekSpan(week.days, attendanceIndex, dayIndex)}
                    className="applied-head font-bold"
                  >
                    {calcTotalWeekly(weekIndex)}
                  </td>
                  <td
                    {...handleWeekSpan(week.days, attendanceIndex, dayIndex)}
                    className="applied-head font-bold"
                  >
                    {calcTotalWeekly(weekIndex)}
                  </td>
                  <td className="group-hover:bg-[#f9f9f9]"></td>
                  <td className="applied-head transition duration-100 group-hover:bg-[#f9f9f9]">
                    {attendance.start ? (
                      <input
                        type="text"
                        className="h-[25px] w-[114px] border-none border-[#d9d9d9] text-center text-sm focus:bg-white focus:ring-transparent group-hover:border-dashed group-hover:bg-[#f9f9f9]"
                        value={attendance.employeeNotes || ' '}
                        onChange={(e) =>
                          handleOnAttendanceChange(
                            weekIndex,
                            dayIndex,
                            attendanceIndex,
                            'employeeNotes',
                            e.target.value,
                            day.full_date
                          )
                        }
                        onBlur={(e) =>
                          editAttendance.mutate({
                            from: formatDate(startRange),
                            to: formatDate(endRange),
                            //@ts-ignore
                            attendanceId: attendance.id,
                            note: e.target.value,
                          })
                        }
                      />
                    ) : (
                      '--'
                    )}
                  </td>
                  <td className="applied-head transition duration-100 group-hover:bg-[#f9f9f9]">
                    {attendance.start ? (
                      <input
                        type="text"
                        className="h-[25px] w-[114px] border-none border-[#d9d9d9] text-center text-sm focus:bg-white focus:ring-transparent group-hover:border-dashed group-hover:bg-[#f9f9f9]"
                        value={attendance.managerNotes || ' '}
                        onChange={(e) =>
                          handleOnAttendanceChange(
                            weekIndex,
                            dayIndex,
                            attendanceIndex,
                            'managerNotes',
                            e.target.value,
                            day.full_date
                          )
                        }
                        onBlur={(e) =>
                          editAttendance.mutate({
                            from: formatDate(startRange),
                            to: formatDate(endRange),
                            //@ts-ignore
                            attendanceId: attendance.id,
                            adminNote: e.target.value,
                          })
                        }
                      />
                    ) : (
                      '--'
                    )}
                  </td>
                  <td className="opacity-0 transition duration-100 group-hover:bg-[#f9f9f9] group-hover:opacity-100">
                    {attendance?.start && (
                      <button
                        onClick={() =>
                          handleRemoveShift(
                            weekIndex,
                            dayIndex,
                            attendanceIndex,
                            //@ts-ignore
                            attendance.id
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-md bg-white shadow-[0_2px_7px_rgba(0,0,0,.16)]"
                      >
                        <DeleteIcon />
                      </button>
                    )}
                  </td>
                  <td className="px-2 transition duration-100 group-hover:bg-[#f9f9f9]"></td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      ))}
    </table>
  );
}
