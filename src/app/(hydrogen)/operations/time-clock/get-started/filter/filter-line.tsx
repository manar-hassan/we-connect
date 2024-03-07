import PlusIcon from '@/components/icons/plus';
import X from '@/components/icons/x';
import React, { useState } from 'react';
import FilterBy from './filter-by';
import SecondFilter from './second-filter';

export default function FilterLine({
  setOpenFilter,
  filterBy,
  secFilter,
  job,
  setFilterLineNumber,
  filterLineNumber,
}: {
  setOpenFilter: React.Dispatch<React.SetStateAction<boolean>>;
  filterBy?: string;
  secFilter?: string;
  job?: string;
  setFilterLineNumber?: React.Dispatch<React.SetStateAction<number>>;
  filterLineNumber?: number;
}) {
  const [filterItem, setFilterItem] = useState(filterBy ? filterBy : '');
  const [secondFilter, setSecondFilter] = useState(
    secFilter ? secFilter : 'Contains'
  );
  const [inputNumber, setInputNumber] = useState(1);
  return (
    <>
      <div className="mb-5 grid max-h-[200px] grid-cols-[auto_0fr] gap-x-14 overflow-auto leading-8">
        <div className="flex h-10 flex-wrap items-center gap-5">
          <FilterBy item={filterItem} setItem={setFilterItem} />
          <SecondFilter
            item={secondFilter}
            setItem={setSecondFilter}
            firstFilter={filterItem}
          />
          {Array.from({ length: inputNumber }).map((_, index) => (
            <input
              key={index}
              value={job}
              style={{
                borderBottom: '1px solid #e1e1e1',
                paddingLeft: '8px',
                paddingRight: '8px',
              }}
              type="text"
              className="input-null h-9 w-[180px] border-b text-xs placeholder:text-xs placeholder:text-gray-6"
              placeholder="Type here"
            />
          ))}
          <button
            onClick={() => setInputNumber(inputNumber + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-full border text-blue-6 transition duration-100 hover:border-blue-6 active:border-blue-7"
          >
            or
          </button>
        </div>
        <div className="flex items-center justify-center gap-5 ">
          <button
            onClick={() =>
              setFilterLineNumber
                ? setFilterLineNumber(
                    filterLineNumber ? filterLineNumber + 1 : 2
                  )
                : null
            }
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-blue-6 text-white transition duration-100 hover:bg-blue-7 active:bg-blue-8"
          >
            <PlusIcon />
          </button>
          <button onClick={() => setOpenFilter(false)}>
            <X />
          </button>
        </div>
      </div>
    </>
  );
}
