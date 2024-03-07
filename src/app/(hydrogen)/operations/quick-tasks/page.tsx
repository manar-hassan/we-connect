import { TeamIcon } from '@/components/icons/team';
import MainComponent from '../../shared/mian-component';
import first from '@public/quick-tasks/1-eliminate-manual-tasks.webp';
import second from '@public/quick-tasks/2-collaborate-with-comments.webp';
import third from '@public/quick-tasks/3-set-the-highest-standard.webp';
import TimeIcon from '@/components/icons/time';
import BreakdownIcon from '@/components/icons/breakdown';
import ChecklistIcon from '@/components/icons/checklist';
import StatusIcon from '@/components/icons/status';
import { IData } from '../../types';

const data: IData = {
  videSection: {
    videURL:
      'https://cdn.connecteam.com/activation-page-videos/task-management-video-for-product.mp4',
    title: 'Get started with Quick Tasks',
    subTitle:
      "Plan, manage and track all your team's tasks in one place, whether you’re in the office or on-the-go.",
    textButton: 'Activate Quick Tasks',
    nextRoute: 'quick-tasks/get-started',
  },
  featureCards: [
    {
      image: first.src,
      title: 'Eliminate manual tasks',
      subTitle:
        'Automate routine tasks so you can focus on the work that matters',
    },
    {
      image: second.src,
      title: 'Collaborate with comments',
      subTitle:
        'Amplify team tasks’ efficiency with comment threads for any task',
    },
    {
      image: third.src,
      title: 'Set the highest standard',
      subTitle:
        'Add detailed descriptions with any attachment so there are no excuses',
    },
  ],
  advantagesTitle: 'Use Quick Tasks to',
  advantagesContainerClassName: 'w-[600px] mx-auto',
  advantagesData: [
    {
      icon: <TeamIcon />,
      text: 'Create tasks for individuals or teams',
      className: 'w-[180px]',
    },
    {
      icon: <TimeIcon />,
      text: 'Create tasks now and publish later with Drafts',
      className: 'w-[180px]',
    },
    {
      icon: <BreakdownIcon />,
      text: 'Breakdown projects with subtasks',
      className: 'w-[180px]',
    },
    {
      icon: <ChecklistIcon />,
      text: 'Add labels, checklists, files, contacts & more',
      className: 'w-[180px]',
    },
    {
      icon: <StatusIcon />,
      text: 'Set due dates, and check statuses with a glance',
      className: 'w-[180px]',
    },
  ],
};

export default function QuickTasks() {
  return (
    <section className="rounded-2xl bg-white py-14">
      <MainComponent data={data} />
    </section>
  );
}
