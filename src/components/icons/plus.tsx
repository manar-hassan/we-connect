export default function PlusIcon({ color }: { color?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      className="ct-icon"
      color="currentcolor"
      data-testid="button-icon"
      viewBox="0 0 24 24"
    >
      <path d="M12 18.75a.728.728 0 01-.75-.75v-5.25H6a.726.726 0 01-.75-.75.728.728 0 01.75-.75h5.25V6a.726.726 0 01.75-.75.728.728 0 01.75.75v5.25H18c.217 0 .396.07.538.212a.731.731 0 01.212.538.728.728 0 01-.75.75h-5.25V18c0 .217-.07.396-.212.538a.731.731 0 01-.538.212z"></path>
    </svg>
  );
}
