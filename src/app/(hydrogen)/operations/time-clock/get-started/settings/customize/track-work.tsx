import { Controller } from 'react-hook-form';
import { Switch } from 'rizzui';

export default function TrackWork({
  control,
  icon,
  header,
  subHeader,
  data,
}: {
  control: any;
  icon: React.ReactNode;
  header: string;
  subHeader: string;
  data: { title: string; name: string }[];
}) {
  return (
    <div className="w-full rounded-[18px] border border-gray-3">
      <div className="flex items-start gap-3 border-b border-gray-2 py-3 pl-4 pr-2.5">
        <div className="h-6 w-6 ">{icon}</div>
        <div className="flex flex-col gap-0.5">
          <p className="text-base font-bold">{header}</p>
          <p className="opacity-50">{subHeader}</p>
        </div>
      </div>
      {data.map((item) => (
        <Controller
          key={item.name}
          name={`customize.${item.name}`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <div className="flex min-h-[50px] items-center justify-between border-b border-gray-2 pl-4 pr-2.5 text-base last-of-type:border-none">
              {item.title}
              <Switch
                defaultChecked={value}
                onChange={(e) => onChange(e.target.checked)}
                className=" ring-transparent  "
              />
            </div>
          )}
        />
      ))}
    </div>
  );
}
