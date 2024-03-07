interface ArrowDownProps {
  className?: string;
}

export default function ArrowDown({ className }: ArrowDownProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className={'ct-icon ct-menu-button-arrow' && className}
      color="currentcolor"
      data-testid="icon"
      viewBox="0 0 24 24"
      style={{ minWidth: 20, minHeight: 20 }}
    >
      <path d="M7.2 10.6A1 1 0 018 9h8a1 1 0 01.8 1.6l-4 5.333a1 1 0 01-1.6 0l-4-5.333z"></path>
    </svg>
  );
}
