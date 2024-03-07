import cn from '@/utils/class-names';
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { ClassNameValue } from 'tailwind-merge';

type TButtonProps = {
  children: ReactNode;
  className?: ClassNameValue;
  variant?: 'primary' | 'secondary';
  hover?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<TButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  hover,
  className,
  ...buttonProps
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return ' bg-blue-6 text-white hover:bg-blue-5 active:bg-blue-7 disabled:bg-white disabled:text-gray-4';
      default:
        return ' bg-white text-blue-5  hover:bg-gray-1 active:bg-gray-2 disabled:hover:bg-white disabled:opacity-50';
    }
  };

  const getHover = () => {
    if (hover) {
      switch (variant) {
        case 'secondary':
          return '';
        default:
          return ' hover:border-blue-6 active:border-blue-7';
      }
    }
  };

  return (
    <button
      type={type}
      className={cn(
        'flex h-10 items-center gap-2 rounded-full border px-4 transition duration-100 disabled:cursor-not-allowed  ',
        getVariantClass(),
        getHover(),
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default Button;
