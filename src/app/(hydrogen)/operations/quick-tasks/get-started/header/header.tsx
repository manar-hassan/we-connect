'use client';

import iconTaskManagement from '@public/quick-tasks/Icon_task_manage.png';
import Image from 'next/image';
import { Avatar } from '@/components/ui/avatar';
import Button from '@/app/(hydrogen)/shared/button';
import LabelIcon from '@/components/icons/label';
import ActivityIcon from '@/components/icons/activity';
import DropList from '@/app/(hydrogen)/shared/drop-list';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import OptionContents from './option-contents';
import SemiUserCard from '@/app/(hydrogen)/shared/semi-user-card';
const LabelSlider = dynamic(() => import('./label-slider'), {
  ssr: false,
});
const ActivitySlider = dynamic(() => import('./activity-slider'), {
  ssr: false,
});

export default function Header() {
  const [labelOpen, setLabelOpen] = useState(false);
  const [activityOpen, setActivityOpen] = useState(false);

  const handleOpenLabelSlider = () => {
    setLabelOpen(true);
  };
  const handleOpenActivitySlider = () => {
    setActivityOpen(true);
  };

  return (
    <section className="mb-4 flex items-center justify-between rounded-2xl bg-white p-5 shadow-tap-content">
      <div className="flex items-center gap-4">
        <Image src={iconTaskManagement} alt="icon" width={50} height={50} />
        <h1 className="mr-5 text-2xl font-normal">Quick Tasks</h1>
      </div>
      <div className="flex items-center gap-2.5">
        <div>Permissions</div>
        <div className="mr-4 shrink-0">
          <SemiUserCard
            imageSrc="https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png"
            name="Omar Taha"
            isAdmin
          />
        </div>

        <Button hover onClick={handleOpenLabelSlider}>
          <LabelIcon /> Labels
        </Button>
        <Button hover onClick={handleOpenActivitySlider}>
          <ActivityIcon fill="#2998FF" /> Activity
        </Button>
        <DropList
          buttonName="Options"
          content={<OptionContents />}
          buttonClassName="rounded-full text-blue-6 hover:border-blue-6"
        />
      </div>
      <LabelSlider isOpen={labelOpen} setIsOpen={setLabelOpen} />
      <ActivitySlider isOpen={activityOpen} setIsOpen={setActivityOpen} />
    </section>
  );
}
