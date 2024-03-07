export default function ArrowLeft({ fill }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="8"
      viewBox="0 0 5 8"
    >
      <path
        fill={fill || '#0A355D'}
        d="M3.949 8l1.023-.948-2.969-3.045L5 1.005 3.949 0 0 3.993v.014z"
      ></path>
    </svg>
  );
}
