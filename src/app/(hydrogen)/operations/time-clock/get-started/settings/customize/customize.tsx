import TrackWork from './track-work';
import TimeClockIcon from '@/components/icons/time-clock';
import LikeGreen from '@/components/icons/green-like';

export default function Customize({ control }: { control: any }) {
  const trackChecks = [
    {
      name: 'clockMobile',
      title: 'Users can clock in and out from their mobile app time clock',
    },
    {
      name: 'clockKiosk',
      title: 'Users can clock in and out from the Kiosk time clock',
    },
    {
      name: 'clockSchedule',
      title:
        'When synced, users can clock in and out directly from their schedule',
    },
    {
      name: 'clockComputer',
      title: 'Users can clock in and out from their computer’s time clock',
    },
    {
      name: 'requestRecords',
      title:
        'Users can manually request shift/break records to their timesheets',
    },
  ];

  const actionChecks = [
    {
      name: 'addShiftBreak',
      title: 'When users add shifts/breaks manually',
    },
    {
      name: 'ediDeleteShiftBreak',
      title: 'When users edit or delete shifts/breaks from their timesheets',
    },
    {
      name: 'clockOutGeoFence',
      title: 'When users clock-out outside the Geo-fence',
    },
  ];

  return (
    <div className="flex flex-col gap-7">
      <TrackWork
        control={control}
        data={trackChecks}
        icon={<TimeClockIcon />}
        header="Decide how users can track their work time"
        subHeader="Use the toggles below to customize the way your users can track or record their work hours"
      />
      <TrackWork
        control={control}
        data={actionChecks}
        icon={<LikeGreen />}
        header="Decide which user actions require admin's approval"
        subHeader="Options that are toggled off will not require an approval and will automatically be added to the user's timesheets"
      />
    </div>
  );
}
