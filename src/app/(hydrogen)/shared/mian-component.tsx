'use client';
import Image from 'next/image';
import { IData } from '../types';
import { usePathname, useRouter } from 'next/navigation';
import cn from '@/utils/class-names';

export default function MainComponent({ data }: { data: IData }) {
  const router = useRouter();
  return (
    <div className="container flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-6">
        <div className="h-[303px] w-[538px] overflow-hidden rounded-2xl">
          <video
            controls
            width="100%"
            height="100%"
            src={data.videSection.videURL}
          ></video>
        </div>
        <div className="text-center ">
          <h1 className="mb-1 text-[32px] font-bold">
            {data.videSection.title}
          </h1>
          <p className="text-sm">{data.videSection.subTitle}</p>
        </div>
        <button
          onClick={() => router.push(data.videSection.nextRoute)}
          className="h-10 rounded-full bg-blue-6 px-4 text-white transition duration-100 hover:bg-blue-5 active:bg-blue-7"
        >
          {data.videSection.textButton}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {data.featureCards.map((card) => (
          <div
            key={card.title}
            className="flex flex-col rounded-2xl bg-gray-1 p-4 text-center"
          >
            <div className="h-[156px] w-full">
              <Image
                src={card.image}
                alt={card.title}
                width={202}
                height={156}
              />
            </div>
            <h4 className="mb-1 text-sm font-bold">{card.title}</h4>
            <p className="text-[12px] font-normal">{card.subTitle}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="mb-8 text-xl font-bold">{data.advantagesTitle}</h2>
        <div
          className={cn(
            'flex flex-wrap items-center justify-center gap-4 text-[12px]',
            data.advantagesContainerClassName
          )}
        >
          {data.advantagesData.map((card) => (
            <div
              key={card.text}
              className={cn(
                'flex w-[174px] flex-col items-center justify-center gap-1 rounded-2xl p-4 text-center shadow-4',
                card.className
              )}
            >
              {card.icon}
              {card.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
