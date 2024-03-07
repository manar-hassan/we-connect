'use client';
import { Fragment, useEffect, useState } from 'react';
import TabsRow from './tabs-row';
import TabsOptions from './options/tabs-options';
import cn from '@/utils/class-names';
import Table from './table';
import { getDatesInRange } from '@/utils/get-dates-in-range';
import Button from '@/app/(hydrogen)/shared/button';
import MinimizeArrow from '@/components/icons/minimize-arrow';
import Checkbox from '@/app/(hydrogen)/shared/checkbox';
import PlusIcon from '@/components/icons/plus';
import PlusSecIcon from '@/components/icons/plus-sec';
import PlusProIcon from '@/components/icons/plus-pro';
import Tags from './options/overdue/tags';
import Users from '@/app/(hydrogen)/shared/users';
import { Tooltip } from 'rizzui';
import SemiUserCard from '@/app/(hydrogen)/shared/semi-user-card';
import UserCard from '@/app/(hydrogen)/shared/user-card';

export default function TasksDashboard() {
  const currentDate = new Date();
  const [page, setPage] = useState('created by me');
  const [viewBy, setViewBy] = useState('list');
  const [groupBy, setGroupBy] = useState('title');
  const [contains, setContains] = useState('total');
  const [startRangeDate, setStartRangeDate] = useState<Date | null>(new Date());
  const [grouped, setGrouped] = useState({});
  const [endRangeDate, setEndRangeDate] = useState<Date | null>(
    new Date(currentDate.setDate(currentDate.getDate() + 7))
  );
  const range =
    startRangeDate &&
    endRangeDate &&
    getDatesInRange(startRangeDate, endRangeDate);

  const data = [
    {
      id: '0',
      title: 'title 1',
      status: 'done',
      subTasks: '',
      label: [
        {
          title: 'general',
          color: 'green',
        },
        {
          title: 'private',
          color: 'green',
        },
      ],
      startDate: '21/2/24',
      startTime: '09:21',
      dueDate: '4/1/24',
      dueTime: '10:21',
      doneDate: null,
      doneTime: null,
      //user object
      doneBy: null,
      assignedTo: [
        {
          //don't forget to send users object
          id: '0',
          name: 'omar',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '00',
          isAdmin: true,
        },
      ],
      dateCreated: '04/01/2024',
      isOverdue: true,
      color: '#9E487B',
    },
    {
      id: '1',
      title: 'title 1',
      status: 'open',
      subTasks: '',
      label: [
        {
          title: 'private',
          color: 'green',
        },
      ],
      startDate: '4/1/24',
      startTime: '09:21',
      dueDate: '4/1/24',
      dueTime: '10:21',
      doneDate: '21/02/2024',
      doneTime: '13:03',
      //user object
      doneBy: {
        id: '0',
        name: 'omar',
        imageSrc:
          'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
        phoneNumber: '00',
        isAdmin: true,
      },
      assignedTo: [
        {
          name: 'ahmed',
          id: '1',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '',
          isAdmin: false,
        },
        {
          id: '0',
          name: 'omar',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '00',
          isAdmin: true,
        },
      ],
      dateCreated: '04/01/2024',
      isOverdue: false,
      color: '#9E487B',
    },
    {
      id: '2',
      title: 'title 2',
      status: 'open',
      subTasks: '',
      label: [
        {
          title: 'general',
          color: 'green',
        },
      ],
      startDate: '4/1/24',
      startTime: '09:21',
      dueDate: '4/1/24',
      dueTime: '10:21',
      doneDate: '21/02/2024',
      doneTime: '13:03',
      //user object
      doneBy: {
        id: '0',
        name: 'omar',
        imageSrc:
          'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
        phoneNumber: '00',
        isAdmin: true,
      },
      assignedTo: [
        {
          name: 'ahmed',
          id: '1',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '',
          isAdmin: false,
        },
      ],
      dateCreated: '04/01/2024',
      isOverdue: false,
      color: '#9E487B',
    },
    {
      id: '3',
      title: 'title 2',
      status: 'open',
      subTasks: '',
      label: [
        {
          title: 'specific',
          color: 'green',
        },
        {
          title: 'private',
          color: 'green',
        },
      ],
      startDate: '4/1/24',
      startTime: '09:21',
      dueDate: '4/1/24',
      dueTime: '10:21',
      doneDate: '21/02/2024',
      doneTime: '13:03',
      //user object
      doneBy: {
        id: '0',
        name: 'omar',
        imageSrc:
          'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
        phoneNumber: '00',
        isAdmin: true,
      },
      assignedTo: [
        {
          id: '0',
          name: 'omar',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '00',
          isAdmin: true,
        },
      ],
      dateCreated: '04/01/2024',
      isOverdue: true,
      color: '#9E487B',
    },
    {
      id: '4',
      title: 'title 3',
      status: 'open',
      subTasks: '',
      label: [
        {
          title: 'specific',
          color: 'green',
        },
      ],
      startDate: '4/1/24',
      startTime: '09:21',
      dueDate: '4/1/24',
      dueTime: '10:21',
      doneDate: '21/02/2024',
      doneTime: '13:03',
      //user object
      doneBy: {
        id: '0',
        name: 'omar',
        imageSrc:
          'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
        phoneNumber: '00',
        isAdmin: true,
      },
      assignedTo: [
        {
          id: '0',
          name: 'omar',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '00',
          isAdmin: true,
        },
        {
          name: 'Ali',
          id: '2',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '11',
          isAdmin: false,
        },
        {
          name: 'ahmed',
          id: '1',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '',
          isAdmin: false,
        },
        {
          name: 'Ahraf',
          id: '4',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '',
          isAdmin: false,
        },
        {
          name: 'Hamed',
          id: '5',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '',
          isAdmin: false,
        },
      ],
      dateCreated: '04/01/2024',
      isOverdue: true,
      color: '#9E487B',
    },
    {
      id: '5',
      title: 'title 4',
      status: 'open',
      subTasks: '',
      label: [
        {
          title: '',
          color: '',
        },
      ],
      startDate: '4/1/24',
      startTime: '09:21',
      dueDate: '4/1/24',
      dueTime: '10:21',
      doneDate: '21/02/2024',
      doneTime: '13:03',
      //user object
      doneBy: {
        id: '0',
        name: 'omar',
        imageSrc:
          'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
        phoneNumber: '00',
        isAdmin: true,
      },
      assignedTo: [
        {
          name: 'Ali',
          id: '2',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '11',
          isAdmin: false,
        },
      ],
      dateCreated: '04/01/2024',
      isOverdue: true,
      color: '#9E487B',
    },
    {
      id: '6',
      title: 'title 4',
      status: 'open',
      subTasks: '',
      label: [
        {
          title: '',
          color: '',
        },
      ],
      startDate: '4/1/24',
      startTime: '09:21',
      dueDate: '4/1/24',
      dueTime: '10:21',
      doneDate: '21/02/2024',
      doneTime: '13:03',
      //user object
      doneBy: {
        id: '0',
        name: 'omar',
        imageSrc:
          'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
        phoneNumber: '00',
        isAdmin: true,
      },
      assignedTo: [
        {
          name: 'Ali',
          id: '2',
          imageSrc:
            'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
          phoneNumber: '11',
          isAdmin: false,
        },
      ],
      dateCreated: '04/01/2024',
      isOverdue: true,
      color: '#9E487B',
    },
  ];

  const groupByTitle = () => {
    let grouped = {};
    data.forEach((item) => {
      const { title } = item;
      if (title in grouped) {
        //@ts-ignore
        grouped[title].push(item);
      } else {
        //@ts-ignore

        grouped[title] = [item];
      }
    });
    return grouped;
  };

  const groupByLabel = () => {
    const grouped = {};
    data.forEach((item) => {
      const { label } = item;

      label.forEach((labelItem) => {
        const { title } = labelItem;
        if (title in grouped) {
          //@ts-ignore
          grouped[title].push(item);
        } else {
          //@ts-ignore
          grouped[title] = [item];
        }
      });

      /*       if (label.title in grouped) {
        //@ts-ignore
        grouped[label.title].push(item);
      } else {
        //@ts-ignore
        grouped[label.title] = [item];
      } */
    });

    return grouped;
  };

  const groupByAssigned = () => {
    const grouped = {};
    data.forEach((item) => {
      const { assignedTo } = item;
      assignedTo.forEach((user) => {
        const { id } = user;
        if (id in grouped) {
          //@ts-ignore
          grouped[id].push(item);
        } else {
          //@ts-ignore
          grouped[id] = [item];
        }
      });
    });

    return grouped;
  };

  useEffect(() => {
    if (groupBy === 'title') {
      setGrouped(groupByTitle());
    } else if (groupBy === 'label') {
      setGrouped(groupByLabel());
    } else if (groupBy === 'assigned to') {
      setGrouped(groupByAssigned());
    } else {
      setGrouped({ data: data });
    }
    console.log('grouped by: ', groupBy);
    console.log('mappedArray :', Object.values(grouped));
  }, [groupBy]);
  console.log('mappedArray after effect:', Object.values(grouped));

  return (
    <>
      <TabsRow page={page} setPage={setPage} />
      <div
        className={cn(
          'relative z-10 rounded-2xl rounded-b-2xl bg-white p-5 shadow-tap-content',
          page === 'created by me' && 'rounded-tl-none ',
          page === 'archived' && 'rounded-tr-none '
        )}
      >
        <TabsOptions
          viewBy={viewBy}
          setViewBy={setViewBy}
          groupBy={groupBy}
          setGroupBy={setGroupBy}
          contains={contains}
          setContains={setContains}
          startRangeDate={startRangeDate}
          endRangeDate={endRangeDate}
          setStartRangeDate={setStartRangeDate}
          setEndRangeDate={setEndRangeDate}
        />
        {viewBy === 'list' ? (
          <>
            {Object.values(grouped).map(
              (array: any, groupedIndex, mappedArray) => {
                return (
                  <div className="mb-5 rounded-2xl bg-[#F8F8F8] px-2 pb-2">
                    <table
                      key={groupedIndex}
                      className="relative w-full px-2 text-center"
                    >
                      <thead className="sticky top-0 z-10 ">
                        <tr className="h-[50px]  ">
                          <td className="applied-head w-14">
                            <Checkbox id="main-checkbox-tasks" />
                          </td>
                          <td className="min-w-[120px]">Title</td>
                          <td className="w-[115px]">Status</td>
                          <td>Sub-tasks</td>
                          <td className="w-[130px]">Label</td>
                          <td className="w-[160px]">Start date</td>
                          <td className="w-[160px]">Due date</td>
                          <td className="w-[135px]">Assigned to</td>
                          <td className="w-[100px]">Date created</td>
                        </tr>
                      </thead>
                      <tbody>
                        {array.map((arr: any, index: number) => (
                          <tr
                            key={index}
                            className="h-[55px]  border-b-[5px]  border-[#F8F8F8]"
                          >
                            <td
                              className={cn(
                                'applied-head relative bg-white px-2 opacity-0 shadow-[0_1px_7px_-3px_hsla(0,0%,87.8%,.5)] transition duration-100 group-hover:opacity-100',
                                /* day.checked */ true && 'opacity-100'
                              )}
                            >
                              <div
                                style={{ backgroundColor: arr.color }}
                                className="absolute left-0 top-0 h-full w-[5px] rounded-bl-[5px] rounded-tl-[5px]"
                              ></div>
                              <Checkbox
                                id={`${groupedIndex}-${index}-checkbox-days`}
                              />
                            </td>
                            <td className="min-w-[120px] border-r-[3px] border-[#F8F8F8] bg-white px-2 shadow-[0_1px_7px_-3px_hsla(0,0%,87.8%,.5)]">
                              {arr.title}
                            </td>
                            <td className="w-[115px] bg-white px-2 shadow-[0_1px_7px_-3px_hsla(0,0%,87.8%,.5)]">
                              <div
                                className={cn(
                                  'mx-auto flex h-[34px] w-[76px] items-center justify-center rounded-full bg-[#F2F2F2] capitalize',
                                  arr.status === 'open' &&
                                    'bg-[#42D892] text-white'
                                )}
                              >
                                {arr.status === 'open' ? (
                                  <Tooltip
                                    placement="top"
                                    tooltipArrowClassName="[&>path]:fill-white"
                                    className="relative rounded-md bg-white p-2 text-sm"
                                    content={() => (
                                      <div className="flex flex-col items-center justify-center gap-2 p-2 text-primary">
                                        <div className="flex items-center gap-2">
                                          Done by
                                          <UserCard
                                            imageSrc={arr.doneBy.imageSrc}
                                            name={arr.doneBy.name}
                                            phoneNumber=""
                                            size='DEFAULT'
                                          />
                                          {arr.doneBy.name}
                                        </div>
                                        <div>
                                          {arr.doneDate} at {arr.doneTime}
                                        </div>
                                      </div>
                                    )}
                                  >
                                    <div className="flex h-full w-full items-center justify-center">
                                      open
                                    </div>
                                  </Tooltip>
                                ) : (
                                  'done'
                                )}
                              </div>
                            </td>
                            <td className=" bg-white px-2 shadow-[0_1px_7px_-3px_hsla(0,0%,87.8%,.5)]">
                              {arr.subTasks || '--'}
                            </td>
                            <td className="w-[130px] border-r-[3px] border-[#F8F8F8] bg-white px-2 shadow-[0_1px_7px_-3px_hsla(0,0%,87.8%,.5)]">
                              <Tags
                                tagsData={arr.label}
                                maxWidth="max-w-[93px]"
                              />
                            </td>
                            <td className="w-[160px] bg-white px-2 shadow-[0_1px_7px_-3px_hsla(0,0%,87.8%,.5)]">
                              {`${arr.startDate} at ${arr.startTime}`}
                            </td>
                            <td
                              className={cn(
                                'w-[160px] bg-white px-2 shadow-[0_1px_7px_-3px_hsla(0,0%,87.8%,.5)]',
                                arr.isOverdue && 'text-red-600'
                              )}
                            >
                              {`${arr.dueDate} at ${arr.dueTime}`}
                            </td>
                            <td className="w-[135px] bg-white px-2 shadow-[0_1px_7px_-3px_hsla(0,0%,87.8%,.5)]">
                              <Users
                                usersData={arr.assignedTo}
                                className="mx-auto flex w-fit items-center justify-center"
                                customSize={30}
                                bgColorOfRestDiv={arr.color}
                              />
                            </td>
                            <td className="w-[100px] rounded-r-[5px] bg-white px-2 shadow-[0_1px_7px_-3px_hsla(0,0%,87.8%,.5)]">
                              {arr.dateCreated}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="relative flex h-[50px] items-center rounded-[5px] bg-white">
                      <div
                        style={{
                          backgroundColor: array[array.length - 1].color,
                        }}
                        className="absolute left-0 top-0 h-full w-[5px] rounded-bl-[5px] rounded-tl-[5px]"
                      ></div>
                      <button className="item-center ml-5 flex gap-3 text-blue-6">
                        <div className="rounded-full bg-blue-6 text-white">
                          <PlusIcon />
                        </div>{' '}
                        Add task
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </>
        ) : (
          <div className="flex flex-col gap-5">
            {range?.map((day, index) => {
              const dayName = day.toLocaleString('en-US', {
                weekday: 'short',
              });
              const monthName = day.toLocaleString('en-US', {
                month: 'short',
              });
              const date = day.getDate();
              return (
                <div key={index} className="group flex items-center gap-2">
                  <div
                    className={cn(
                      'flex flex-col items-center justify-center rounded-xl bg-gray-2 px-3 py-1.5',
                      date === new Date().getDate() && '!bg-blue-1 text-blue-6'
                    )}
                  >
                    <h3 className="leading-none">{date}</h3>
                    <p className="text-base leading-none">{monthName}</p>
                  </div>
                  <h2>{dayName}</h2>
                  <div className="relative ml-2 h-px w-full bg-dashed ">
                    <div className="absolute top-1/2 flex -translate-y-1/2 items-center gap-2 opacity-0 transition duration-100 group-hover:opacity-100">
                      <Button className="h-[33px] w-[33px] justify-center rounded-full p-0  ">
                        <MinimizeArrow />
                      </Button>
                      <Button>Add Task</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
