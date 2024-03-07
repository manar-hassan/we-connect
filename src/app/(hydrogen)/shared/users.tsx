import UserCard from '@/app/(hydrogen)/shared/user-card';
import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { Avatar, Popover, Tooltip } from 'rizzui';

const UsersList = ({
  usersData,
  customSize,
  bgColorOfRestDiv,
}: {
  usersData: { name: string; imageSrc: string }[];
  customSize?: number;
  bgColorOfRestDiv?: string;
}) => {
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
  console.log(bgColorOfRestDiv);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div
          className="grid max-h-[500px] grid-cols-1 overflow-auto rounded-2xl p-2 text-base "
          onMouseEnter={handleOpenPanel}
          onMouseLeave={handleClosePanel}
        >
          {usersData.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg p-1 px-2"
            >
              <UserCard
                imageSrc={user.imageSrc}
                name={user.name}
                phoneNumber="01000000000"
                customSize={customSize && customSize}
              />
              {user.name}
            </div>
          ))}
        </div>
      )}
      shadow="sm"
      placement="right"
      className="z-[1000] rounded-2xl p-0 "
    >
      <div
        onMouseEnter={handleOpenPanel}
        onMouseLeave={handleClosePanel}
        className="flex w-full items-center justify-center overflow-hidden "
      >
        {usersData.length >4  ? (
          <>
            {Array.from({ length: 4 }, (_, index) => (
              <Avatar
                key={index}
                className="-ml-3.5 first-of-type:m-0"
                src={usersData[index].imageSrc}
                name=""
                customSize={customSize ? customSize : 21}
                color="info"
              />
            ))}
            <div
              style={{
                backgroundColor: bgColorOfRestDiv
                  ? bgColorOfRestDiv
                  : 'bg-white',
              }}
              className={cn(
                '-ml-3.5 flex items-center justify-center rounded-full ',
                customSize
                  ? `w-[${customSize}px] h-[${customSize}px] `
                  : 'h-[21px] w-[21px]',
                bgColorOfRestDiv ? ` text-white` : ' text-blue-6'
              )}
            >
              +{usersData.length - 4}
            </div>
          </>
        ) : (
          usersData.map((user, index) => (
            <Avatar
              key={index}
              className="-ml-3.5 first-of-type:m-0"
              src={user.imageSrc}
              name=""
              customSize={customSize ? customSize : 21}
              color="info"
            />
          ))
        )}
      </div>
    </Popover>
  );
};

export default function Users({
  usersData,
  className,
  customSize,
  bgColorOfRestDiv,
}: {
  usersData: {
    imageSrc: string;
    name: string;
    phoneNumber?: string;
    isAdmin?: boolean;
  }[];
  className?: string;
  customSize?: number;
  bgColorOfRestDiv?: string;
}) {
  return (
    <div className={cn('max-w-[100px]', className)}>
      {usersData.length === 1 ? (
        <div className="flex items-center gap-2.5">
          <UserCard
            imageSrc={usersData[0].imageSrc}
            name={usersData[0].name}
            customSize={customSize ? customSize : 26}
            phoneNumber="0100000000"
            isAdmin={usersData[0].isAdmin}
          />
          <Tooltip
            tooltipArrowClassName=" [&>path]:fill-gray-10"
            className="relative z-[1000] rounded-md bg-gray-10 p-2 "
            content={() => usersData[0].name}
            placement="top"
          >
            <div className=" truncate">{usersData[0].name}</div>
          </Tooltip>
        </div>
      ) : (
        <UsersList
          usersData={usersData}
          customSize={customSize}
          bgColorOfRestDiv={bgColorOfRestDiv}
        />
      )}
    </div>
  );
}
