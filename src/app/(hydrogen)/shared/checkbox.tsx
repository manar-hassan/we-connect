import RightIcon from '@/components/icons/right-icon';
import cn from '@/utils/class-names';
import React, { InputHTMLAttributes, ReactNode } from 'react';
import { ClassNameValue } from 'tailwind-merge';

type TCheckboxProps = {
  className?: ClassNameValue;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox({ className, ...inputProps }: TCheckboxProps) {
  return (
    <label htmlFor={inputProps.id} className="relative flex items-center justify-center w-fit mx-auto">
      <input
        type="checkbox"
        className={cn(
          'relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1 focus:shadow-none focus:ring-transparent',
          className
        )}
        {...inputProps}
      />
      <RightIcon
        inputId={inputProps.id}
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </label>
  );
}
