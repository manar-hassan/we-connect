import React from 'react';

export default function LikeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <defs>
        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#53C9FF"></stop>
          <stop offset="100%" stopColor="#2998FF"></stop>
        </linearGradient>
        <linearGradient id="b" x1="50%" x2="50%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#53C9FF"></stop>
          <stop offset="100%" stopColor="#2998FF"></stop>
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <circle cx="50" cy="50" r="50" fill="#E1F1FF"></circle>
        <g fillRule="nonzero">
          <path
            fill="url(#a)"
            d="M4.643 19C2.083 19 0 21.244 0 24v16c0 2.756 2.084 5 4.643 5h5.571c1.046 0 2.008-.38 2.786-1.012V19H4.643z"
            transform="translate(27 26)"
          ></path>
          <path
            fill="url(#b)"
            d="M47 26.875c0-1.175-.476-2.27-1.302-3.076a4.784 4.784 0 001.28-3.732c-.234-2.484-2.524-4.43-5.216-4.43H29.408C30.02 13.82 31 10.491 31 7.817 31 3.578 27.314 0 25 0c-2.078 0-3.562 1.143-3.626 1.19a.974.974 0 00-.374.765v6.627l-5.76 12.195-.24.119v20.949c1.628.75 3.688 1.155 5 1.155h18.358c2.178 0 4.084-1.435 4.532-3.415a4.307 4.307 0 00-.362-2.935C44.006 35.923 45 34.435 45 32.739c0-.692-.162-1.355-.47-1.955 1.478-.727 2.47-2.214 2.47-3.909z"
            transform="translate(27 26)"
          ></path>
        </g>
      </g>
    </svg>
  );
}
