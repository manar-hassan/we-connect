import ActivityIcon from '@/components/icons/activity';
import OverviewIcon from '@/components/icons/overview';
import SmartGroupsIcon from '@/components/icons/smart-groups';
import UserIcon from '@/components/icons/user';
import { routes } from '@/config/routes';
import {
  CelebrationsIcon,
  ChatIcon,
  CoursesIcon,
  DirectoryIcon,
  DocumentsIcon,
  EventsIcon,
  FormsIcon,
  KnowledgeBaseIcon,
  QuickTaskIcon,
  RecognitionsIcon,
  RewardsIcon,
  SchedulingIcon,
  SurveysIcon,
  TextMessagesIcon,
  TimeClockIcon,
  TimeOffIcon,
  UpdatesIcon,
} from './sidebar-icons';

// Note: do not add href in the label object, it is rendering as label
export const menuItems = [
  /*   {
    name: 'Overview',
    href: '/overview',
    icon: <OverviewIcon />,
  }, */
  /*   {
    name: 'Activity',
    href: '/activity',
    icon: <ActivityIcon />,
  },
  {
    separate: true,
  },
  {
    name: 'Users',
    href: '/users',
    icon: <UserIcon />,
  },
  {
    name: 'Smart Groups',
    href: '/smart-groups',
    icon: <SmartGroupsIcon />,
  }, */
  /*   {
    separate: true,
  }, */
  /*   {
    name: 'Communication',
    href: '#',
    dropdownItems: [
      {
        name: 'Chat',
        href: routes.communication.chat,
        icon: <ChatIcon />,
      },
      {
        name: 'Updates',
        href: routes.communication.updates,
        icon: <UpdatesIcon />,
      },
      {
        name: 'Directory',
        href: routes.communication.directory,
        icon: <DirectoryIcon />,
      },
      {
        name: 'Events',
        href: routes.communication.events,
        icon: <EventsIcon />,
      },
      {
        name: 'Knowledge Base',
        href: routes.communication.knowledgeBase,
        icon: <KnowledgeBaseIcon />,
      },
      {
        name: 'Surveys',
        href: routes.communication.surveys,
        icon: <SurveysIcon />,
      },
    ],
  }, */
  /*   {
    separate: true,
  }, */
  {
    name: 'Operations',
    href: '#',
    dropdownItems: [
      {
        name: 'Time Clock',
        href: routes.operations.timeClock,
        icon: <TimeClockIcon />,
      },
      {
        name: 'Forms',
        href: routes.operations.forms,
        icon: <FormsIcon />,
      } /* 
      {
        name: 'Job Scheduling',
        href: routes.operations.jobScheduling,
        icon: <SchedulingIcon />,
      }, */,
      {
        name: 'Quick Tasks',
        href: routes.operations.quickTasks,
        icon: <QuickTaskIcon />,
      },
    ],
  },
  /*   {
    separate: true,
  }, */
  /*   {
    name: 'HR & Skills',
    href: '#',
    dropdownItems: [
      {
        name: 'Courses',
        href: routes.hrAndSkills.courses,
        icon: <CoursesIcon />,
      },
      {
        name: 'Rewards',
        href: routes.hrAndSkills.rewards,
        icon: <RewardsIcon />,
      },
      {
        name: 'Documents',
        href: routes.hrAndSkills.documents,
        icon: <DocumentsIcon />,
      },
      {
        name: 'Text Messages',
        href: routes.hrAndSkills.textMessages,
        icon: <TextMessagesIcon />,
      },

      {
        name: 'Recognitions',
        href: routes.hrAndSkills.recognitions,
        icon: <RecognitionsIcon />,
      },
      {
        name: 'Celebrations',
        href: routes.hrAndSkills.celebrations,
        icon: <CelebrationsIcon />,
      },
      {
        name: 'Time Off',
        href: routes.hrAndSkills.timeOff,
        icon: <TimeOffIcon />,
      },
    ],
  }, */
  /*   {
    separate: true,
  }, */
];
