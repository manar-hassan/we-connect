'use client'
import AutoNotification from '@/components/icons/auto-notificatoin';
import ClockIcon from '@/components/icons/clock-icon';
import CupIcon from '@/components/icons/cup';
import GPSIcon from '@/components/icons/gps';
import IntegrationIcon from '@/components/icons/integration';
import RecycleIcon from '@/components/icons/recycle';
import punchClockOne from '@public/time-clock/punchclock-activation-card1.png';
import punchClockTwo from '@public/time-clock/punchclock-activation-card2.png';
import punchClockThree from '@public/time-clock/punchclock-activation-card3.png';
import UploadIcon from '@/components/icons/upload';
import MainComponent from '../../shared/mian-component';
import { IData } from '../../types';
import { useSearchParams } from 'next/navigation';

export default function TimeClock() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');
  const token = searchParams.get('token');

  localStorage.setItem(
    'token',
    token || '80|IvTc68FLB31BuQTM3TELOMZ7yxHUlM2ijtKkjRYf'
  );
  localStorage.setItem('companyId', companyId || '10');
  const data: IData = {
    videSection: {
      videURL:
        'https://cdn.connecteam.com/activation-page-videos/time clock 05.mp4',
      title: 'Get started with Time Clock',
      subTitle:
        'Easily track employees work hours spent on jobs and projects, know exactly who’s working on what, when and where, and be ready for anaccurate payroll faster than ever!',
      textButton: "Let's get started",
      nextRoute: 'time-clock/get-started',
    },
    featureCards: [
      {
        image: punchClockOne.src,
        title: 'Simple and easy to use',
        subTitle:
          'Intuitive interface makes it easy and quick to clock in & out with a single tap, and from any device',
      },
      {
        image: punchClockTwo.src,
        title: 'Made for distributed teams',
        subTitle:
          'With multiple location-based tools, you can rest assured employees are at the right location, on time',
      },
      {
        image: punchClockThree.src,
        title: 'Reduces payroll pains',
        subTitle:
          'Run a smooth payroll process with detailed timesheets, and powerful payroll software integrations',
      },
    ],
    advantagesTitle: 'Customize the time clock to your needs',
    advantagesData: [
      {
        icon: <ClockIcon />,
        text: 'Auto clock-out and smart limitations',
      },
      {
        icon: <GPSIcon />,
        text: 'Geofence and GPS tracking with maps view',
      },
      {
        icon: <CupIcon />,
        text: 'Overtime, breaks, and pay rate',
      },
      {
        icon: <UploadIcon />,
        text: 'Equipment tracking with image upload & e-sign',
      },
      {
        icon: <RecycleIcon />,
        text: 'Seamlessly syncs with the schedule & Time Off',
      },
      {
        icon: <IntegrationIcon />,
        text: 'Custom reports and payroll integration',
      },
      {
        icon: <AutoNotification />,
        text: 'Automated notifications and reminders',
      },
    ],
  };

  return (
    <section className="rounded-2xl bg-white py-14">
      <MainComponent data={data} />
    </section>
  );
}
