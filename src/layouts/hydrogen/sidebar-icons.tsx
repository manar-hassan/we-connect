import Image from 'next/image';

import chatIcon from '@public/sidebar/Icon_chat.png';
import updatesIcon from '@public/sidebar/Icon_envelope.png';
import directoryIcon from '@public/sidebar/Icon_Directory.png';
import eventsIcon from '@public/sidebar/Icon_calendar.png';
import knowledgeBaseIcon from '@public/sidebar/Icon_books.png';
import surveysIcon from '@public/sidebar/Icon_man_talk.png';

import timeClockIcon from '@public/sidebar/Icon_punch_clock.png';
import formsIcon from '@public/sidebar/Icon_checklist.png';
import schedulingIcon from '@public/sidebar/Icon_Scheduler.png';
import quickTaskIcon from '@public/sidebar/Icon_task_manage.png';

import coursesIcon from '@public/sidebar/Icon_LMS.png';
import rewardsIcon from '@public/sidebar/Rewards_icon.png';
import documentsIcon from '@public/sidebar/Documents_icon.png';
import textMessagesIcon from '@public/sidebar/Icon_txt_message.png';
import recognitionsIcon from '@public/sidebar/Recognitions_icon.png';
import celebrationsIcon from '@public/sidebar/Celebrations_icon.png';
import timeOffIcon from '@public/sidebar/Time_off_icon.png';

export function ChatIcon() {
  return (
    <Image
      src={chatIcon}
      alt="chat icon"
      className="h-6 w-6 rounded-md bg-[rgb(46,217,185)]"
    />
  );
}
export function UpdatesIcon() {
  return (
    <Image
      src={updatesIcon}
      alt="updates icon"
      className="h-6 w-6 rounded-md bg-[rgb(65,118,255)]"
    />
  );
}
export function DirectoryIcon() {
  return (
    <Image
      src={directoryIcon}
      alt="directory Icon"
      className="h-6 w-6 rounded-md bg-[rgb(225,48,113)]"
    />
  );
}
export function EventsIcon() {
  return (
    <Image
      src={eventsIcon}
      alt="events Icon"
      className="h-6 w-6 rounded-md bg-[rgb(39,230,163)]"
    />
  );
}
export function KnowledgeBaseIcon() {
  return (
    <Image
      src={knowledgeBaseIcon}
      alt="knowledge Base Icon"
      className="h-6 w-6 rounded-md bg-[rgb(185,147,214)]"
    />
  );
}
export function SurveysIcon() {
  return (
    <Image
      src={surveysIcon}
      alt="surveys Icon"
      className="h-6 w-6 rounded-md bg-[rgb(255,95,133)]"
    />
  );
}

export function TimeClockIcon() {
  return (
    <Image
      src={timeClockIcon}
      alt="time Clock Icon"
      className="h-6 w-6 rounded-md bg-[rgb(55,134,249)]"
    />
  );
}
export function FormsIcon() {
  return (
    <Image
      src={formsIcon}
      alt="forms Icon"
      className="h-6 w-6 rounded-md bg-[rgb(186,57,169)]"
    />
  );
}
export function SchedulingIcon() {
  return (
    <Image
      src={schedulingIcon}
      alt="scheduling Icon"
      className="h-6 w-6 rounded-md bg-[rgb(255,154,108)]"
    />
  );
}
export function QuickTaskIcon() {
  return (
    <Image
      src={quickTaskIcon}
      alt="quick Task Icon"
      className="h-6 w-6 rounded-md bg-[rgb(255,154,108)]"
    />
  );
}

export function CoursesIcon() {
  return (
    <Image
      src={coursesIcon}
      alt="courses Icon"
      className="h-6 w-6 rounded-md bg-[rgb(173,62,128)]"
    />
  );
}
export function RewardsIcon() {
  return (
    <Image
      src={rewardsIcon}
      alt="rewards Icon"
      className="h-6 w-6 rounded-md bg-[rgb(25,172,236)]"
    />
  );
}
export function DocumentsIcon() {
  return (
    <Image
      src={documentsIcon}
      alt="documents Icon"
      className="h-6 w-6 rounded-md bg-[rgb(55,134,249)]"
    />
  );
}
export function TextMessagesIcon() {
  return (
    <Image
      src={textMessagesIcon}
      alt="text Messages Icon"
      className="h-6 w-6 rounded-md bg-[rgb(242,96,114)]"
    />
  );
}
export function RecognitionsIcon() {
  return (
    <Image
      src={recognitionsIcon}
      alt="recognitions Icon"
      className="h-6 w-6 rounded-md bg-[rgb(255,95,133)]"
    />
  );
}
export function CelebrationsIcon() {
  return (
    <Image
      src={celebrationsIcon}
      alt="celebrations Icon"
      className="h-6 w-6 rounded-md bg-[rgb(253,168,0)]"
    />
  );
}
export function TimeOffIcon() {
  return (
    <Image
      src={timeOffIcon}
      alt="time Off Icon"
      className="h-6 w-6 rounded-md bg-[rgb(46,217,185)]"
    />
  );
}
