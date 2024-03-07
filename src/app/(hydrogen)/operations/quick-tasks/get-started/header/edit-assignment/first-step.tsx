import SmartGroupIcon from '@/components/icons/smart-group';
import UsersIcon from '@/components/icons/users';
import cn from '@/utils/class-names';
import { useWatch } from 'react-hook-form';

export default function FirstStep({ register, control }: any) {
  const WatchHowPublish = useWatch({
    control,
    name: 'howPublish',
  });
  return (
    <div className="mt-14 flex flex-col items-center gap-8 ">
      <h3>How would you like to publish?</h3>
      <div className="flex gap-8">
        <div className="flex w-[180px] flex-col gap-4">
          <label
            htmlFor="smart groups"
            className={cn(
              'relative flex h-[160px]  cursor-pointer flex-col items-center justify-center rounded border text-blue-6 shadow-ct-shadow-2',
              WatchHowPublish === 'smart groups' &&
                'border-blue-6 !shadow-[0_12px_23px_-6px_rgba(41,151,255,.22)]'
            )}
          >
            <input
              type="radio"
              className="hidden"
              id="smart groups"
              value="smart groups"
              name="howPublish"
              {...register('howPublish')}
            />
            <SmartGroupIcon />
            <p>Smart Groups</p>
            {WatchHowPublish === 'smart groups' && (
              <>
                {' '}
                <div className="absolute right-0 top-0 h-[56px] w-[56px] border-l-[56px]  border-t-[56px] border-l-white border-t-blue-6 bg-blue-6"></div>
                <div className=" absolute right-3 top-3 h-3 w-[7px] rotate-45 border-2 border-white border-l-transparent border-t-transparent"></div>
              </>
            )}
          </label>
          <p>
            Publish to current and future users that match the groups rules set
          </p>
        </div>

        <div className="flex w-[180px] flex-col gap-4">
          <label
            htmlFor="select users"
            className={cn(
              'relative flex h-[160px]  cursor-pointer flex-col items-center justify-center rounded border text-blue-6 shadow-ct-shadow-2',
              WatchHowPublish === 'select users' &&
                'border-blue-6 !shadow-[0_12px_23px_-6px_rgba(41,151,255,.22)]'
            )}
          >
            <input
              type="radio"
              className="hidden"
              id="select users"
              value="select users"
              name="howPublish"
              {...register('howPublish')}
            />
            <UsersIcon /> <p>Select Users</p>
            {WatchHowPublish === 'select users' && (
              <>
                {' '}
                <div className="absolute right-0 top-0 h-[56px] w-[56px] border-l-[56px]  border-t-[56px] border-l-white border-t-blue-6 bg-blue-6"></div>
                <div className=" absolute right-3 top-3 h-3 w-[7px] rotate-45 border-2 border-white border-l-transparent border-t-transparent"></div>
              </>
            )}
          </label>
          <p>Publish to selected users</p>
        </div>
      </div>
    </div>
  );
}
