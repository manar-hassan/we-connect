'use client';

import { Popover } from '@/components/ui/popover';
import { RefObject, useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import Image from 'next/image';
import Experts from '@public/talk-to-an-expert-representatives.svg';
import X from '@/components/icons/x';

function TalkToAnExpert({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="relative flex w-[315px] flex-col items-center justify-center rounded-full">
      <Image src={Experts} alt="Experts" width={144} height={48}></Image>
      <h3 className="mb-1 mt-2">Let’s talk over the phone</h3>
      <p>
        Speak to our experts about our products and pricing by clicking the
        button below.
      </p>
      <h6 className="mb-3 text-sm">We&apos;ll call you within 30 minutes!</h6>
      <button className="h-10 rounded-full bg-blue-6 px-4 text-white transition duration-100 hover:bg-blue-5 active:bg-blue-7">
        Call me
      </button>
      <button
        className="absolute right-0 top-0"
        onClick={() => setIsOpen(false)}
      >
        <X />
      </button>
    </div>
  );
}

export default function TalkToExpertDropdown({
  children,
}: {
  children: JSX.Element & { ref?: RefObject<any> };
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <TalkToAnExpert setIsOpen={setIsOpen} />}
      shadow="sm"
      placement={isMobile ? 'bottom' : 'bottom-end'}
      className="z-50 p-6  "
    >
      {children}
    </Popover>
  );
}
