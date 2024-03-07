export default function TriangleInCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      className={className}
    >
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <circle
          cx="8.5"
          cy="8.5"
          r="8.5"
          stroke="#7C8487"
          strokeWidth="0.7"
        ></circle>
        <path fill="#7C8487" d="M8.5 11.56l3.74-5.44H4.76z"></path>
      </g>
    </svg>
  );
}
