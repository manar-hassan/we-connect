import SearchIcon from '@/components/icons/search-icon';
import React from 'react';

export default function Search({
  text,
  setText,
}: {
  text?: string;
  setText?: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="relative flex h-10 w-[225px] items-start justify-center rounded-full border border-[#d9d9d9] pl-[15px] pr-[35px] ">
      <input
        type="text"
        placeholder="Search"
        value={text}
        onChange={(e) => setText && setText(e.target.value)}
        className="input-null h-full w-[173px]"
      />
      <div className="absolute right-3 top-3 ">
        <SearchIcon />
      </div>
    </div>
  );
}
