import DropList from '@/app/(hydrogen)/shared/drop-list';
import SideSlider from '@/app/(hydrogen)/shared/side-slider';
import LikeIcon from '@/components/icons/like';
import TriangleInCircle from '@/components/icons/triangle-in-circle';
import X from '@/components/icons/x';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import DayDropList from './day-drop-list';
import TaskDropList from './task-drop-list';
import Users from '../../../../../../shared/users';
import CommentIcon from '@/components/icons/comment';
import Tags from './tags';
import Separator from '@/app/(hydrogen)/shared/separator';
import BillIcon from '@/components/icons/bill';
import NotificationIcon from '@/components/icons/notification';
import ReminderIcon from '@/components/icons/reminder';
import MainActions from './main-actions';

export default function Overdue({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleCloseDrawer = () => {
    setIsOpen(false);
  };
  const [viewBy, setViewBy] = useState('View by');
  const [option, setOption] = useState('Option');
  const optionsData = ['Send reminder for all tasks', 'Archive all tasks'];
  const Options = () => {
    return (
      <ul className=" max-h-[220px] w-full overflow-auto">
        {optionsData.map((el) => (
          <li
            key={el}
            className={cn(
              'cursor-pointer gap-2 truncate whitespace-nowrap rounded-xl p-2 text-left capitalize text-primary transition duration-100 hover:bg-gray-1'
            )}
          >
            {el}
          </li>
        ))}
      </ul>
    );
  };

  const data = [
    {
      day: 'Sun, Jan 14',
      list: [
        {
          taskTitle: 'test 1',
          dueDate: 'Jan 14 at 12:53',
          tags: [{ title: 'General Task', color: 'green' }],
          users: [
            {
              imageSrc:
                'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
              name: 'Nada Ibrahim',
            },
          ],
          comments: 1,
          startDate: '10/10/2010',
          endDate: '10/10/2010',
        },
      ],
    },
    {
      day: 'Sun, Jan 21',
      list: [
        {
          taskTitle: 'test 2',
          dueDate: 'Jan 14 at 12:53',
          tags: [],
          users: [
            {
              imageSrc:
                'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
              name: 'Omar Taha',
            },
          ],
          comments: 1,
          startDate: '10/10/2010',
          endDate: '10/10/2010',
        },
        {
          taskTitle: 'test 3',
          dueDate: 'Jan 14 at 12:53',
          tags: [
            { title: 'General Task', color: 'green' },
            { title: 'try', color: 'black' },
          ],
          users: [
            {
              imageSrc:
                'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
              name: 'Abdelrahman Hamed',
            },
            {
              imageSrc:
                'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
              name: 'Yousef Gerges',
            },
          ],
          comments: 1,
          startDate: '10/10/2010',
          endDate: '10/10/2010',
        },
      ],
    },
  ];

  return (
    <SideSlider isOpen={isOpen} onClose={handleCloseDrawer}>
      <div className="flex h-full flex-col whitespace-nowrap ">
        <div className="flex min-h-max items-center justify-between  border-b border-gray-2 p-4 text-gray-6">
          <div className="flex items-center gap-2">
            <span onClick={handleCloseDrawer} className="cursor-pointer">
              <X />
            </span>
            <div className="flex items-center gap-1">Overdue tasks</div>
          </div>
          <div className="flex items-center gap-2">
            <DropList
              item={viewBy}
              setItem={setViewBy}
              data={['Start date', 'Due date']}
              buttonClassName="text-blue-6 rounded-full "
              panelClassName="w-[122px]"
            />
            <DropList
              item={option}
              setItem={setOption}
              content={<Options />}
              data={optionsData}
              buttonClassName="text-blue-6 rounded-full "
              panelClassName=""
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto p-8">
          {data.length > 0 ? (
            <div className="flex flex-col ">
              {data.map((day, index) => (
                <div key={index} className="mb-4">
                  <div className="mb-4 flex items-center gap-4">
                    <h3>{day.day}</h3>
                    <DayDropList />
                  </div>
                  {day.list.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className="mb-4 rounded-xl pt-3 shadow-ct-shadow-2"
                    >
                      <div className="pl-4 pr-3">
                        <div className="flex items-start justify-between">
                          <h4>{task.taskTitle}</h4>
                          <TaskDropList />
                        </div>
                        <div className="mb-2 flex items-center justify-between text-[13px]">
                          <div className="text-red-600">Due {task.dueDate}</div>
                          <div className="h-[3px] w-[3px] rounded-full bg-secondary"></div>
                          <Tags tagsData={task.tags} />
                          {task.tags.length > 0 && (
                            <div className="h-[3px] w-[3px] rounded-full bg-secondary"></div>
                          )}
                          <Users usersData={task.users} />
                          <div className="h-[3px] w-[3px] rounded-full bg-secondary"></div>
                          <div className="flex items-center gap-1">
                            <CommentIcon /> {task.comments} comments
                          </div>
                        </div>
                      </div>
                      <Separator horizontal />
                      <MainActions task={task} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center text-lg">
              <LikeIcon />
              <b>No tasks are overdue</b>
              <p>Everything seems to be</p>
              <p> running smoothly</p>
            </div>
          )}
        </div>
      </div>
    </SideSlider>
  );
}
