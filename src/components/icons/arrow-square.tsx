export default function ArrowSquare({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      className={className}
    >
      <g fill="none" fillRule="evenodd" transform="translate(0 .5)">
        <rect
          width="15"
          height="15"
          x="0.5"
          y="0.5"
          stroke="#AAA"
          rx="4"
        ></rect>
        <path
          fill="#AAA"
          fillRule="nonzero"
          d="M11.4 7.341l-.758-.818-2.436 2.375L5.804 6.5 5 7.341 8.194 10.5h.012z"
        ></path>
      </g>
    </svg>
  );
}
