import FileDashboard from '@/app/shared/file/dashboard';
import { metaObject } from '@/config/site.config';
import TimeClock from '@/app/(hydrogen)/operations/time-clock/page'

export const metadata = {
  ...metaObject(),
};

export default function FileDashboardPage() {
  return (
    <>
      {/* <FileDashboard />  */}
      <TimeClock />
    </>
  );
}
