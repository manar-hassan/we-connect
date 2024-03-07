import Image from 'next/image';
import React from 'react';
import noThing from '@public/nothing_to_display_icon.png';
import cn from '@/utils/class-names';
import { motion } from 'framer-motion';

export default function NothingDisplay({
  text,
  className,
  textClassName,
}: {
  className?: string;
  text?: string;
  textClassName?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: '20px' }}
      animate={{ opacity: 1, translateY: '0' }}
      transition={{ duration: 0.5 }}
      className={cn(
        'flex w-full flex-col items-center justify-start gap-7',
        className
      )}
    >
      <Image src={noThing} alt="there is nothing" width={89} height={81} />
      <h3 className="text-center text-xl font-normal text-blue-6">
        There is nothing to display
      </h3>
      {text && (
        <p
          className={cn(
            'w-[245px] text-center text-[15px] text-[#9b9b9b]',
            textClassName
          )}
        >
          {text}
        </p>
      )}
    </motion.div>
  );
}
