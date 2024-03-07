import cn from '@/utils/class-names';
import { useState } from 'react';
import { Popover } from 'rizzui';

function UsersList() {
  return <div>oamr</div>;
}

export default function SelectedUser() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      placement="bottom"
      shadow="sm"
      showArrow={false}
      content={() => <UsersList />}
      className={cn('z-[1000] rounded-2xl px-2 ')}
    >
      <div>omar</div>
    </Popover>
  );
}
