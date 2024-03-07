'use client';
import AddAdminIcon from '@/components/icons/add-admin';
import AddTaskIcon from '@/components/icons/add-tast';
import AddUserIcon from '@/components/icons/add-user';
import GenericPlaceholder from '@/components/icons/generic-placeholder';
import MoneyIcon from '@/components/icons/money';
import SendUpdateIcon from '@/components/icons/send-update';
import Link from 'next/link';
import SignUpModal from './signup-modal';
import { useSearchParams } from 'next/navigation';
import { useGetSettings } from '@/app/api/time-clock/settings';

const quickActions = [
  {
    icon: <AddUserIcon />,
    name: 'Add Users',
    href: '#',
  },
  {
    icon: <AddAdminIcon />,
    name: 'Add Admins',
    href: '#',
  },
  {
    icon: <AddTaskIcon />,
    name: 'Add a task',
    href: '#',
  },
  {
    icon: <SendUpdateIcon />,
    name: 'Send an update',
    href: '#',
  },
];
export default function Overview() {
/*   const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId');
  const token = searchParams.get('token');

  localStorage.setItem('token', token || '');
  localStorage.setItem('companyId', companyId || ''); */

  return (
    <section className="grid w-full grid-cols-12 gap-5">
{/*       {!token && <SignUpModal companyId={Number(companyId)} />}
 */}      <div className="col-span-9 flex flex-col items-start gap-5">
        <section className="flex w-full flex-col items-start gap-4 rounded-[10px] bg-white p-4">
          <h5 className="text-headline-5">Quick Actions</h5>
          <div className="grid w-full grid-cols-4 gap-4">
            {quickActions.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl p-4 text-primary shadow-ct-shadow-2 transition duration-100 hover:bg-gray-1"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
      <div className="col-span-3 flex flex-col gap-5">
        <section className="rounded-[10px] bg-white p-4">
          <div className="flex flex-col items-center justify-center gap-4 px-5 py-2">
            <MoneyIcon />
            <p className="text-center text-sm">
              Get up to $35 worth of credits to use when upgrading to our paid
              plans!
            </p>
            <button className="h-10 rounded-full border bg-white px-4 text-blue-5 transition duration-100 hover:bg-gray-1 active:bg-gray-2">
              Get Credits
            </button>
          </div>
        </section>
        <section className="rounded-[10px] bg-white p-5">
          <h5 className="text-headline-5 mb-10">Alerts</h5>
          <div className="mb-7 flex justify-center">
            <GenericPlaceholder />
          </div>
          <p className="mb-2.5 text-center text-xl font-bold text-blue-6">
            You’re all caught up
          </p>
          <p className="text-center text-base text-blue-6">
            No new alerts to display at this time
          </p>
        </section>
      </div>
    </section>
  );
}
