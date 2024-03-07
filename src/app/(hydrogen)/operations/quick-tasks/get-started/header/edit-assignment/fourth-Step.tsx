import groupSummary from '@public/quick-tasks/group-assign-summary-icon.png';
import Image from 'next/image';
export default function FourthStep({ getValues }: any) {
  return (
    <div className="mt-10 flex w-[600px] flex-col items-center gap-5 ">
      <Image src={groupSummary} alt="group summary" width={305} height={180} />
      <h2>Your asset is ready to go!</h2>
      <div className="flex gap-1 whitespace-nowrap font-bold">
        The asset will be assigned to all current and future users who match the
        <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-blue-6 text-white">
          {getValues('smartGroups').length}
        </div>
        selected group&apos;s rule set.
      </div>
      <div className="relative w-[374px] rounded border p-5 pt-2.5">
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white px-1 text-[#3f4648]">
          <span className="opacity-50">Users will be notified:</span>
        </div>
        &ldquo;{getValues('notifyEmployees.message')}&ldquo;
      </div>
    </div>
  );
}
