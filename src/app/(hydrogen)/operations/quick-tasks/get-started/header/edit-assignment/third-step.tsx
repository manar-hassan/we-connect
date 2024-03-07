import Separator from '@/app/(hydrogen)/shared/separator';
import BillIcon from '@/components/icons/bill';
import RightIcon from '@/components/icons/right-icon';
import ShoutOutIcon from '@/components/icons/shoutout';
import cn from '@/utils/class-names';
import PostedBy from './posted-by';

export default function ThirdStep({ register, setValue, getValues }: any) {
  return (
    <div className="mt-8 flex w-[600px]  flex-col items-center gap-5 ">
      <div className="flex w-[500px] items-start gap-5">
        <BillIcon />
        <div className="flex w-full flex-col gap-4">
          <div className="relative flex gap-2 ">
            <input
              type="checkbox"
              id="notifyEmployees"
              {...register('notifyEmployees.isChecked')}
              className="relative mt-[3px] border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
            />
            <RightIcon inputId="notifyEmployees" className="mt-1.5" />
            <p> Notify employees via push notification</p>
          </div>
          <input
            type="text"
            {...register('notifyEmployees.message')}
            className={cn(
              'flex h-10 w-full items-center justify-between rounded-xl border border-gray-3 bg-white px-4 py-0 text-sm transition duration-100 placeholder:text-sm hover:bg-gray-1 focus:border-blue-6 focus:ring-transparent active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white'
            )}
          />
        </div>
      </div>
      <Separator horizontal />
      <div className="flex w-[500px] items-start gap-5">
        <ShoutOutIcon />
        <div className="flex w-full flex-col gap-4">
          <div className="relative flex gap-2 ">
            <input
              type="checkbox"
              id="Show on feed"
              {...register('showBy.isChecked')}
              className="relative mt-[3px] border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
            />
            <RightIcon inputId="Show on feed" className="mt-1.5" />
            <p> Show on feed by</p>
          </div>
          <PostedBy setValue={setValue} getValues={getValues} />
        </div>
      </div>
    </div>
  );
}
