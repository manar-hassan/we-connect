'use client';

import { Popover } from '@/components/ui/popover';
import React, { useState } from 'react';
import OwnerIcon from '@public/owner-icon.webp';
import { Avatar, AvatarProps } from 'rizzui';
import Image from 'next/image';

function Card({
  isAdmin,
  name,
  imageSrc,
}: {
  isAdmin?: boolean;
  name: string;
  imageSrc: string;
}) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2 ">
      <div className="relative">
        <Avatar src={imageSrc} color="info" size="sm" name={name} />
        {isAdmin && (
          <div className="absolute -bottom-1 -right-2 h-5 w-5">
            <Image src={OwnerIcon} alt="Owner Icon" />
          </div>
        )}
      </div>
      <p>{name}</p>
    </div>
  );
}

export default function SemiUserCard({
  size,
  isAdmin,
  name,
  imageSrc,
}: {
  size?: AvatarProps['size'];
  isAdmin?: boolean;
  name: string;
  imageSrc: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  let timeout: NodeJS.Timeout;
  const handleClosePanel = () => {
    timeout = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const cancelTimeOut = () => {
    clearTimeout(timeout);
  };

  const handleOpenPanel = () => {
    cancelTimeOut();
    setIsOpen(true);
  };

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div
          className="rounded-2xl  "
          onMouseEnter={handleOpenPanel}
          onMouseLeave={handleClosePanel}
        >
          <Card name={name} imageSrc={imageSrc} isAdmin={isAdmin} />
        </div>
      )}
      shadow="sm"
      placement="bottom"
      className="z-[1000] rounded-2xl p-0 "
    >
      <button
        onMouseEnter={handleOpenPanel}
        onMouseLeave={handleClosePanel}
        className="relative"
      >
        <Avatar
          src={imageSrc}
          color="info"
          size={size ? size : 'sm'}
          name=''
        />
      </button>
    </Popover>
  );
}
