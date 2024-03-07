export default function CupIcon({
  dimensions,
  color,
}: {
  dimensions?: string;
  color?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions || '32'}
      height={dimensions || '32'}
      fill="currentColor"
      className="ct-icon"
      color={color || '#93cc21'}
      data-testid="icon"
      viewBox="0 0 24 24"
    >
      <path d="M11 17.625c-1.8 0-3.333-.633-4.6-1.9-1.267-1.267-1.9-2.8-1.9-4.6V5c0-.417.146-.77.438-1.062A1.444 1.444 0 016 3.5h12.1c.85 0 1.575.3 2.175.9.6.6.9 1.325.9 2.175 0 .85-.3 1.575-.9 2.175-.6.6-1.325.9-2.175.9h-.6v1.475c0 1.8-.633 3.333-1.9 4.6-1.267 1.267-2.8 1.9-4.6 1.9zM6 8.15h10V5H6v3.15zm5 7.975c1.383 0 2.563-.488 3.538-1.463.975-.975 1.462-2.154 1.462-3.537V9.65H6v1.475c0 1.383.488 2.562 1.463 3.537.975.975 2.154 1.463 3.537 1.463zm6.5-7.975h.6c.433 0 .804-.15 1.112-.45.309-.3.463-.675.463-1.125 0-.433-.154-.804-.463-1.112A1.514 1.514 0 0018.1 5h-.6v3.15zM5.25 20.5a.728.728 0 01-.75-.75.728.728 0 01.75-.75h13.225c.217 0 .396.07.538.212a.731.731 0 01.212.538c0 .217-.07.396-.212.538a.731.731 0 01-.538.212H5.25z"></path>
    </svg>
  );
}
