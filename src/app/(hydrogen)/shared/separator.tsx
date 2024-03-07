import cn from '@/utils/class-names';
import React from 'react';

export default function Separator({
  horizontal,
  height,
  className,
}: {
  horizontal?: boolean;
  height?: string;
  className?: string;
}) {
  return (
    <>
      {horizontal ? (
        <div className={cn('h-px w-full bg-[#dcdcdc]', className)}></div>
      ) : (
        <div
          style={{ height: height && height }}
          className={cn('h-10 w-px bg-[#dcdcdc]', className)}
        ></div>
      )}
    </>
  );
}
