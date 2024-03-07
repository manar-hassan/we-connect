import cn from '@/utils/class-names';

const Loading = ({ bg }: { bg?: string }) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <span
        className={cn(
          'block h-2.5 w-2.5 animate-bounce rounded-full  [animation-duration:0.7s]',
          bg ? bg : 'bg-blue-6'
        )}
      ></span>
      <span
        className={cn(
          'block h-2.5 w-2.5 animate-bounce rounded-full  [animation-duration:0.7s] [animation-delay:-0.1s] ',
          bg ? bg : 'bg-blue-6'
        )}
      ></span>
      <span
        className={cn(
          'block h-2.5 w-2.5 animate-bounce rounded-full  [animation-duration:0.7s] [animation-delay:-0.2s]',
          bg ? bg : 'bg-blue-6'
        )}
      ></span>
    </div>
  );
};

export default Loading;
