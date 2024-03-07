'use client';
import cn from '@/utils/class-names';

export default function FirstForm({ register, Watch, errors }: any) {
  return (
    <div className="flex flex-col items-center justify-center gap-7">
      <div className="text-xl ">Customize your app in 1 minute</div>
      <input
        {...register('companyName')}
        type="text"
        value={Watch('companyName')}
        className={cn(
          'h-[50px] w-[350px] rounded-md !border-[#d9d9d9] px-3.5 text-center focus:border-blue-6 focus:ring-transparent ',
          errors.companyName?.type && '!border-red'
        )}
        placeholder="Company name*"
      />
      <div className="text-base font-bold ">
        What&apos;s your role in the company?
      </div>
      <input
        {...register('jobTitle')}
        value={Watch('jobTitle')}
        type="text"
        className={cn(
          'mb-7 h-[50px] w-[350px] rounded-md !border-[#d9d9d9] px-3.5 text-center focus:border-blue-6 focus:ring-transparent ',
          errors.jobTitle?.type && '!border-red'
        )}
        placeholder="Job title*"
      />
    </div>
  );
}
