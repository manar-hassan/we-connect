import DropList from '@/app/(hydrogen)/shared/drop-list';
import React from 'react';
import SelectedUser from './selected-user';
const time = ['minutes', 'months', 'years'];
const weekStarts = ['sunday', 'monday', 'tuesday', 'wednesday'];

export default function General({
  register,
  control,
  setValue,
  getValues,
}: any) {
  return (
    <div>
      <div className="mb-5">
        <div className="font-bold">User permissions</div>
        <p className="opacity-50">
          Decide who can create and assign tasks from the mobile app
        </p>
      </div>

      <div className="mb-5 flex items-center gap-1  pb-5">
        <input
          type="radio"
          id="only admins"
          name="permissions"
          value="only admins"
          {...register('general.permissions')}
        />
         
        <label
          htmlFor="only admins"
          className="cursor-pointer text-sm font-bold"
        >
          Only admins can create tasks for users
        </label>
      </div>

      <div className="mb-5 flex items-center gap-1  pb-5">
        <input
          type="radio"
          id="only users"
          name="permissions"
          value="only users"
          {...register('general.permissions')}
        />
         
        <label
          htmlFor="only users"
          className="cursor-pointer text-sm font-bold"
        >
          Allow only the mobile users designated in the list below to create and
          assign tasks to other users
        </label>
      </div>
{/*       <SelectedUser />
 */}
      <div className="mb-5 flex items-center gap-1 border-b border-[#eee] pb-5">
        <input
          type="radio"
          id="all users"
          name="permissions"
          value="all users"
          {...register('general.permissions')}
        />
         
        <label htmlFor="all users" className="cursor-pointer text-sm font-bold">
          Allow all users to create and assign tasks to other users, unless they
          are listed in the list below
        </label>
      </div>
      <div className="mb-5 flex items-center gap-3">
        <div>Default due date: </div>
        <input
          {...register('general.due.number', {
            setValueAs: (value: string) => parseInt(value),
          })}
          type="number"
          className="flex h-10 w-14 items-center justify-center rounded-lg border-gray-3 text-center transition duration-100 focus:border-blue-6 focus:outline-none focus:ring-transparent disabled:border-gray-2 disabled:text-gray-4"
        />
        <DropList
          setValue={setValue}
          getValues={getValues}
          object="general.due.time"
          data={time}
          buttonClassName="w-[110px]"
          panelClassName="w-[110px]"
        />
        <div>after task creation date</div>
      </div>
      <div className="flex items-center gap-3">
        <div>Week starts</div>

        <DropList
          setValue={setValue}
          getValues={getValues}
          object="general.weekStarts"
          data={weekStarts}
          buttonClassName="w-[110px]"
          panelClassName="w-[110px]"
        />
      </div>
    </div>
  );
}
