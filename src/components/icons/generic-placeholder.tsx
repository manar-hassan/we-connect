export default function GenericPlaceholder() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="83"
      height="86"
      viewBox="0 0 83 86"
    >
      <defs>
        <filter
          id="bh75v9u1ra"
          width="202.7%"
          height="202.7%"
          x="-51.4%"
          y="-33.9%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dy="8"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="6.5"
          ></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0.111522627 0 0 0 0 0.427998621 0 0 0 0 0.721665534 0 0 0 0.363527098 0"
          ></feColorMatrix>
        </filter>
        <circle id="p51k67yf0b" cx="41.47" cy="41.47" r="22.88"></circle>
      </defs>
      <g fill="none" fillRule="evenodd">
        <rect
          width="82.94"
          height="82.94"
          fill="#2998FF"
          opacity="0.1"
          rx="22.88"
        ></rect>
        <use
          fill="#000"
          filter="url(#bh75v9u1ra)"
          xlinkHref="#p51k67yf0b"
        ></use>
        <use fill="#2998FF" xlinkHref="#p51k67yf0b"></use>
        <path
          stroke="#FFF"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.86"
          d="M31.104 41.93l7.506 7.506L52.296 35.75"
        ></path>
      </g>
    </svg>
  );
}
