import GearIcon from '@/components/icons/gear-icon';
import NotificationIcon from '@/components/icons/notification';
import { Form } from '@/components/ui/form';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { SettingsFormTypes, settingsSchema, defaultValues } from './types';
import General from './general';
import Notifications from './notification';

const sidebar = [
  {
    id: 0,
    icon: <GearIcon />,
    title: 'general',
  },

  {
    id: 8,
    icon: <NotificationIcon width="20" height="20" fill="#203040" />,
    title: 'Notifications',
  },
];

export default function SettingsSlider() {
  const [activeForm, setActiveForm] = useState(0);
  const onSubmit: SubmitHandler<SettingsFormTypes> = (data) => {
    console.log(data);
  };
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-center gap-2 border-b border-gray-2 py-7 text-gray-6">
        <GearIcon /> Quick Task Settings
      </div>

      <div className="grid grow grid-cols-[minmax(200px,max-content)_1fr] overflow-auto">
        <div className="relative z-10 h-full border-r border-gray-2">
          <ul className="fixed z-10 h-full min-w-[200px] p-2">
            {sidebar.map((item) => (
              <li
                key={item.id}
                onClick={() => setActiveForm(item.id)}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-xl p-2 transition duration-100 hover:bg-gray-1',
                  item.id === activeForm && 'bg-blue-1 hover:bg-blue-2'
                )}
              >
                {item.icon}
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <Form<SettingsFormTypes>
          // resetValues={reset}
          validationSchema={settingsSchema}
          onSubmit={onSubmit}
          className="mx-auto w-[600px] @container"
          useFormProps={{
            mode: 'onChange',
            defaultValues,
          }}
          id="settings-form"
        >
          {({
            register,
            control,
            setValue,
            getValues,
            getFieldState,
            formState: { errors },
          }) => {
            return (
              <div className="py-7">
                {activeForm === 0 ? (
                  <General
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    register={register}
                  />
                ) : (
                  <Notifications
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                    register={register}
                  />
                )}
              </div>
            );
          }}
        </Form>
      </div>

      <div className="relative z-20 flex items-center justify-end border-t border-gray-2 p-7">
        <button
          form="settings-form"
          type="submit"
          className="h-10 rounded-full bg-blue-6 px-4 text-white transition duration-100 hover:bg-blue-5 active:bg-blue-7"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
