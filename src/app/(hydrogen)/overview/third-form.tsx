import ChatIcon from '@/components/icons/chat';
import ClockSecIcon from '@/components/icons/clock';
import DirectoryIcon from '@/components/icons/directory';
import DocumentIcon from '@/components/icons/document-sec';
import EventsIcon from '@/components/icons/events';
import FormsIcon from '@/components/icons/forms';
import KnowledgeIcon from '@/components/icons/knowledge';
import RecognitionIcon from '@/components/icons/recognition';
import RightIcon from '@/components/icons/right-icon';
import ScheduleIcon from '@/components/icons/schedule';
import TaskIcon from '@/components/icons/task';
import TimeOffIcon from '@/components/icons/time-off';
import TrainingIcon from '@/components/icons/training';
import React from 'react';

const data = [
  {
    title: 'Operations',
    features: [
      {
        name: 'Time clock',
        icon: <ClockSecIcon />,
      },
      {
        name: 'Schedule',
        icon: <ScheduleIcon />,
      },
      {
        name: 'Forms & Checklists',
        icon: <FormsIcon />,
      },
      {
        name: 'Task Management',
        icon: <TaskIcon />,
      },
    ],
  },
  {
    title: 'Communication',
    features: [
      {
        name: 'Chat & Update',
        icon: <ChatIcon />,
      },
      {
        name: 'Directory',
        icon: <DirectoryIcon />,
      },
      {
        name: 'Events',
        icon: <EventsIcon />,
      },
      {
        name: 'Knowledge base',
        icon: <KnowledgeIcon />,
      },
    ],
  },
  {
    title: 'HR & Skills',
    features: [
      {
        name: 'Time off management',
        icon: <TimeOffIcon />,
      },
      {
        name: 'Training & Onboarding',
        icon: <TrainingIcon />,
      },
      {
        name: 'Document management',
        icon: <DocumentIcon />,
      },
      {
        name: 'Recognitions & Rewards',
        icon: <RecognitionIcon />,
      },
    ],
  },
];

export default function ThirdForm({ register }: any) {
  return (
    <div className="px-8 text-center mb-7">
      <div className="mb-2 text-xl font-bold text-primary">
        Let’s add the right features to your app
      </div>
      <p className="mb-4 text-secondary">
        Select your preferred features so we can customize the platform to your
        needs:
      </p>
      <div className="flex flex-col gap-6">
        {data.map((row) => (
          <div key={row.title} className="flex h-[120px] items-stretch gap-2 ">
            <div
              style={{ writingMode: 'vertical-lr' }}
              className="flex rotate-180 select-none  items-center justify-center rounded-2xl bg-gray-1 p-2 text-xs"
            >
              {row.title}
            </div>
            {row.features.map((feature) => {
              const titleSchema = row.title.split(' ')[0].toLowerCase();
              const nameSchema = feature.name.split(' ')[0].toLowerCase();
              return (
                <label
                  key={feature.name}
                  className="relative flex flex-1 cursor-pointer select-none flex-col items-center justify-center gap-1 rounded-2xl border border-transparent p-4 text-xs shadow-ct-shadow-2 transition duration-100 hover:bg-gray-1 active:bg-gray-2"
                >
                  {feature.icon}
                  {feature.name}
                  <div className=" absolute right-2 top-2">
                    <div className="relative mb-5 flex items-center gap-2">
                      <input
                        type="checkbox"
                        {...register(`${titleSchema}.${nameSchema}`)}
                        /*                     onChange={(e) => onChange(e.target.checked)}
                         */ id={feature.name}
                        className="peer relative border-none  bg-transparent font-normal  transition duration-100 hover:cursor-pointer focus:shadow-none focus:ring-transparent"
                      />
                      <RightIcon
                        inputId={feature.name}
                        iconColor="currentColor"
                        className="text-white peer-hover:text-gray-1 peer-active:text-gray-2"
                      />
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
