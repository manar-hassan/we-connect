'use client';

import { Popover } from '@/components/ui/popover';
import React, { useState } from 'react';
import OwnerIcon from '@public/owner-icon.webp';
import { Avatar, AvatarProps } from 'rizzui';
import Image from 'next/image';
import PhoneIcon from '@/components/icons/phone';
import Link from 'next/link';
import ProfileIconSec from '@/components/icons/profile';
import { ChatIconSec } from '@/components/icons/chat';
import { getUser } from '@/utils/get-user';

function Card({
  isAdmin,
  name,
  phoneNumber,
  imageSrc,
  isAuthenticated,

}: {
  isAdmin?: boolean;
  name: string;
  phoneNumber: string;
  imageSrc: string;
  isAuthenticated: boolean;

}) {
  return (
    <div className="flex flex-col">
      <div className="flex min-w-[234px] items-center gap-2.5 border-b p-3">
        <Avatar src={imageSrc} name={name} color="info" size="xl" />
        <div className="flex flex-col items-start">
          <p className="font-bold">{name}</p>
          <p className="text-sm opacity-50">{isAdmin ? 'Admin' : 'User'}</p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <PhoneIcon /> {phoneNumber}
          </div>
        </div>
      </div>
      {isAuthenticated ? (
        <Link
          href=''
          className="flex items-center justify-center gap-1 p-3 text-blue-6"
        >
          <ProfileIconSec /> Profile
        </Link>
      ) : (
        <div className="grid grid-cols-2 text-blue-6">
          <Link
            href=''
            className="flex items-center justify-center gap-1 border-r p-3 text-blue-6"
          >
            <ProfileIconSec /> Profile
          </Link>
          <Link
            href=''
            className="flex items-center justify-center gap-1 border-r p-3 text-blue-6"
          >
            <ChatIconSec /> Chat
          </Link>
        </div>
      )}
    </div>
  );
}

export default function UserCard({
  size,
  isAdmin,
  name,
  phoneNumber,
  imageSrc,
  customSize,
  tooltipArrowClassName,
  userId,
}: {
  size?: AvatarProps['size'];
  isAdmin?: boolean;
  name: string;
  phoneNumber: string;
  imageSrc: string;
  customSize?: number;
  tooltipArrowClassName?: string;
  userId?: number;
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

  const loggedUser = getUser();

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
          <Card
            name={name}
            imageSrc={imageSrc}
            isAdmin={isAdmin}
            phoneNumber={phoneNumber}
            isAuthenticated={userId === loggedUser?.id}
          />
        </div>
      )}
      shadow="sm"
      placement="right"
      className="z-[1000] rounded-2xl p-0 "
      tooltipArrowClassName={tooltipArrowClassName}
    >
      <button
        onMouseEnter={handleOpenPanel}
        onMouseLeave={handleClosePanel}
        className="relative shrink-0"
      >
        <Avatar
          src={imageSrc}
          color="info"
          size={size ? size : 'DEFAULT'}
          name=""
          customSize={customSize}
          className="shrink-0"
        />
        {isAdmin && (
          <div className="absolute -bottom-1 -right-2 h-5 w-5">
            <Image src={OwnerIcon} alt="Owner Icon" />
          </div>
        )}
      </button>
    </Popover>
  );
}
