import cn from '@/utils/class-names';
import React from 'react';

export default function TabsRow({
  page,
  setPage,
}: {
  page: string;
  setPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="grid grid-cols-4 text-[17px] ">
      <div
        onClick={() => setPage('created by me')}
        className={cn(
          'flex cursor-pointer items-center justify-center gap-1.5 rounded-t-2xl py-5 text-[#afafaf] opacity-60 transition duration-100 hover:opacity-100',
          page === 'created by me' &&
            'bg-white text-blue-6 opacity-100 shadow-tab'
        )}
      >
        Tasks Created By Me (4)
      </div>
      <div
        onClick={() => setPage('my tasks')}
        className={cn(
          'flex cursor-pointer items-center justify-center gap-1.5 rounded-t-2xl py-5 text-[#afafaf] opacity-60 transition duration-100 hover:opacity-100 ',
          page === 'my tasks' && 'bg-white text-blue-6 opacity-100 shadow-tab'
        )}
      >
        My Tasks (2)
      </div>
      <div
        onClick={() => setPage('all tasks')}
        className={cn(
          'flex cursor-pointer items-center justify-center gap-1.5 rounded-t-2xl py-5 text-[#afafaf] opacity-60 transition duration-100 hover:opacity-100',
          page === 'all tasks' && 'bg-white text-blue-6 opacity-100 shadow-tab'
        )}
      >
        All Tasks (4)
      </div>
      <div
        onClick={() => setPage('archived')}
        className={cn(
          'flex cursor-pointer items-center justify-center gap-1.5 rounded-t-2xl py-5 text-[#afafaf] opacity-60 transition duration-100 hover:opacity-100',
          page === 'archived' && 'bg-white text-blue-6 opacity-100 shadow-tab'
        )}
      >
        Archived (0)
      </div>
    </div>
  );
}
