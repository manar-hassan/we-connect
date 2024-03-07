
export default function PlaceholderTasks() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="165"
      height="132"
      viewBox="0 0 165 132"
    >
      <defs>
        <filter
          id="prefix__a"
          width="121.1%"
          height="176.5%"
          x="-10.5%"
          y="-28.4%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dy="4"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="4.5"
          ></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.110494974 0"
          ></feColorMatrix>
        </filter>
        <filter
          id="prefix__c"
          width="116.3%"
          height="160%"
          x="-8.2%"
          y="-22.5%"
          filterUnits="objectBoundingBox"
        >
          <feOffset
            dy="3"
            in="SourceAlpha"
            result="shadowOffsetOuter1"
          ></feOffset>
          <feGaussianBlur
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
            stdDeviation="3.5"
          ></feGaussianBlur>
          <feColorMatrix
            in="shadowBlurOuter1"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.110494974 0"
          ></feColorMatrix>
        </filter>
        <path
          id="prefix__b"
          d="M0 3.594A3.598 3.598 0 013.597 0h139.806A3.598 3.598 0 01147 3.594v33.312a3.597 3.597 0 01-3.597 3.594H3.597A3.598 3.598 0 010 36.906V3.594z"
        ></path>
        <path
          id="prefix__d"
          d="M.1 48.056A3.05 3.05 0 013.153 45h140.894a3.06 3.06 0 013.053 3.056v33.888A3.05 3.05 0 01144.047 85H3.153A3.06 3.06 0 01.1 81.944V48.056z"
        ></path>
      </defs>
      <g fill="none" fillRule="evenodd" transform="translate(9)">
        <circle cx="73.7" cy="65.7" r="65.7" fill="#DCEEFF"></circle>
        <g transform="translate(0 23)">
          <use
            fill="#000"
            filter="url(#prefix__a)"
            xlinkHref="#prefix__b"
          ></use>
          <use fill="#FFF" xlinkHref="#prefix__b"></use>
          <use
            fill="#000"
            filter="url(#prefix__c)"
            xlinkHref="#prefix__d"
          ></use>
          <use fill="#FFF" xlinkHref="#prefix__d"></use>
          <g fill="#F1F1F1" transform="translate(10.1 58)">
            <rect width="71.91" height="5.355" x="0.9" rx="2.677"></rect>
            <rect
              width="56.61"
              height="5.355"
              x="0.9"
              y="9.18"
              rx="2.677"
            ></rect>
          </g>
          <rect
            width="21.44"
            height="21.44"
            x="115.28"
            y="54.48"
            fill="#FFF"
            stroke="#D9D9D9"
            strokeWidth="0.56"
            rx="10.72"
          ></rect>
          <g transform="translate(114 9.2)">
            <rect width="22.4" height="22.4" fill="#2998FF" rx="11.2"></rect>
            <path
              stroke="#FFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.4"
              d="M7.7 11.104L10.584 14 15.4 9.1"
            ></path>
          </g>
          <rect
            width="91.91"
            height="5.355"
            x="11"
            y="13"
            fill="#2998FF"
            fillOpacity="0.252"
            rx="2.677"
          ></rect>
          <rect
            width="76.61"
            height="5.355"
            x="11"
            y="22.18"
            fill="#2998FF"
            fillOpacity="0.252"
            rx="2.677"
          ></rect>
        </g>
      </g>
    </svg>
  );
}
