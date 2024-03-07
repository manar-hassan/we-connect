export default function OnRouteIcon({
  flip,
  ...className
}: {
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      {...className}
    >
      <g fill="none" fillRule="evenodd" transform="translate(2 2)">
        <path
          stroke={flip ? '#2998FF' : '#FFF'}
          strokeWidth="2"
          d="M12 2H4.41a2.41 2.41 0 000 4.82h5a2.59 2.59 0 010 5.18H2"
        ></path>
        <circle
          cx="12"
          cy="2"
          r="2.75"
          fill={flip ? '#2998FF' : '#FFF'}
          stroke={flip ? '#FFF' : '#2998FF'}
          strokeWidth="1.5"
        ></circle>
        <circle
          cx="2"
          cy="12"
          r="2.75"
          fill={flip ? '#2998FF' : '#FFF'}
          stroke={flip ? '#FFF' : '#2998FF'}
          strokeWidth="1.5"
        ></circle>
      </g>
    </svg>
  );
}
