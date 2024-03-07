import DateIcon from '@/components/icons/dates';
import ListIcon from '@/components/icons/list';
import cn from '@/utils/class-names';
import { motion } from 'framer-motion';
export default function ViewBy({
  viewBy,
  setViewBy,
}: {
  viewBy: string;
  setViewBy: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <motion.div
      animate
      className={cn(
        'relative flex h-10 w-[170px] items-center gap-1 rounded-[20px] bg-[#f0f0f0] px-3'
      )}
    >
      <motion.div
        animate={{
          left: viewBy === 'list' ? '4px' : '',
          right: viewBy === 'dates' ? '4px' : '',
        }}
        className={cn('absolute h-8 w-[85px] rounded-[20px] bg-white ')}
      ></motion.div>
      <button
        onClick={() => setViewBy('list')}
        className={cn(
          'relative z-10 flex w-[72px] items-center gap-1 pl-1.5 ',
          viewBy === 'list' && 'text-blue-6'
        )}
      >
        <ListIcon /> List
      </button>
      <button
        onClick={() => setViewBy('dates')}
        className={cn(
          'relative z-10 flex w-[88px] gap-1 pl-4',
          viewBy === 'dates' && 'text-blue-6'
        )}
      >
        <DateIcon /> Dates
      </button>
    </motion.div>
  );
}
