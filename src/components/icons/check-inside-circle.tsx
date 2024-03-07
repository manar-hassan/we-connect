import React from 'react';

export default function CheckInsideCircle() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
      <g fill="none" fillRule="evenodd" stroke="currentColor">
        <circle cx="8" cy="8" r="7.5"></circle>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.513 8.427l1.691 1.9 3.694-4.058"
        ></path>
      </g>
    </svg>
  );
}
