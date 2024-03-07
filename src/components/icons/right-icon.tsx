import cn from '@/utils/class-names';

export default function RightIcon({
  inputId,
  className,
  iconColor,
}: {
  inputId?: string;
  className?: string;
  iconColor?: string;
}) {
  return (
    <label
      htmlFor={inputId}
      className={cn('absolute left-[3px] cursor-pointer', className)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        fill="currentColor"
        className="ct-icon ct-checkbox-v2-icon"
        color={iconColor || 'white'}
        data-testid="icon"
        viewBox="0 0 10 6"
        style={{ minWidth: 10, minHeight: 10 }}
      >
        <path d="M3.917 5.98a.775.775 0 00.281-.053.677.677 0 00.24-.156l4.666-4.667a.565.565 0 00.167-.417.6.6 0 00-.188-.437.612.612 0 00-.448-.188.545.545 0 00-.427.188L3.917 4.542 1.958 2.583a.565.565 0 00-.416-.166.6.6 0 00-.438.187.6.6 0 00-.187.438.6.6 0 00.187.437l2.292 2.292c.07.07.15.121.24.156s.183.052.28.052z"></path>
      </svg>
    </label>
  );
}
