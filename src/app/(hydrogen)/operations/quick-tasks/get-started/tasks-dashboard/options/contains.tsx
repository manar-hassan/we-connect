import Button from '@/app/(hydrogen)/shared/button';
import cn from '@/utils/class-names';
import React from 'react';

export default function Contains({
  contains,
  setContains,
}: {
  contains: string;
  setContains: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div>The view contains</div>
      <Button
        hover
        onClick={() => setContains('total')}
        className={cn(
          'border-blue-1 text-black',
          contains === 'total' && 'bg-blue-1 text-blue-6'
        )}
      >
        <div>6</div>
        Tasks in total
      </Button>
      <Button
        hover
        onClick={() => setContains('open')}
        className={cn(
          'border-blue-1 text-black',
          contains === 'open' && 'bg-blue-1 text-blue-6'
        )}
      >
        <div>5</div>
        Open tasks
      </Button>
      <Button
        hover
        onClick={() => setContains('done')}
        className={cn(
          'border-blue-1 text-black',
          contains === 'done' && 'bg-blue-1 text-blue-6'
        )}
      >
        <div>1</div>
        Done tasks
      </Button>
    </div>
  );
}
