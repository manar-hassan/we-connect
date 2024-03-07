export default function EqualIcon({ fill }: { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="18"
      viewBox="0 0 17 18"
    >
      <g fill="none" fillRule="evenodd">
        <circle cx="8.5" cy="8.8" r="8.5" fill="#FFF"></circle>
        <path fill={fill || '#5F46FF'} d="M5 6h7v2H5zm0 3h7v2H5z"></path>
      </g>
    </svg>
  );
}
