import React from 'react';

export default function ActivityIcon({ fill }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="12"
      viewBox="0 0 17 12"
    >
      <path
        fill={fill || '#3F4548'}
        fillRule="evenodd"
        d="M0 12h12.278v-2H0v2zm17-5V5H0v2h17zM0 0v2h17V0H0z"
      ></path>
    </svg>
  );
}
