import cn from '@/utils/class-names';
import React, { useState } from 'react';
import { Popover, Tooltip } from 'rizzui';

const TagsList = ({
  tagsData,
  maxWidth,
}: {
  tagsData: { title: string; color: string }[];
  maxWidth?: string;
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

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => (
        <div
          className="grid grid-cols-1 gap-2 rounded-2xl p-2 text-base text-white "
          onMouseEnter={handleOpenPanel}
          onMouseLeave={handleClosePanel}
        >
          {tagsData.map((tag, index) => (
            <div
              style={{ backgroundColor: tag.color }}
              key={index}
              className="rounded-lg p-1 px-2"
            >
              {tag.title}
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
        className={cn(
          'flex  items-center justify-between gap-0.5 truncate rounded bg-white  text-white',
          maxWidth ? maxWidth : 'max-w-[54px]'
        )}
      >
        <div
          style={{ backgroundColor: tagsData[0].color }}
          className="truncate rounded p-0.5 grow"
        >
          {tagsData[0].title}
        </div>
        <div
          style={{ backgroundColor: tagsData[0].color }}
          className="rounded p-0.5"
        >
          +{tagsData.length - 1}
        </div>
      </div>
    </Popover>
  );
};

export default function Tags({
  tagsData,
  maxWidth,
}: {
  tagsData: { title: string; color: string }[];
  maxWidth?: string;
}) {
  return (
    <>
      {tagsData.length > 0 && (
        <>
          {tagsData.length === 1 ? (
            <>
              <Tooltip
                tooltipArrowClassName=" [&>path]:fill-gray-10"
                className="relative z-[1000] rounded-md bg-gray-10 p-2 "
                content={() => tagsData[0].title}
                placement="top"
              >
                <div
                  style={{ backgroundColor: tagsData[0].color }}
                  className={cn(
                    'max-w-[54px] truncate rounded p-0.5  text-white',
                    maxWidth ? maxWidth : 'max-w-[54px]'
                  )}
                >
                  {tagsData[0].title}
                </div>
              </Tooltip>
            </>
          ) : (
            <>
              <TagsList tagsData={tagsData} maxWidth={maxWidth} />
            </>
          )}
        </>
      )}
    </>
  );
}
