'use client';
import { getUser } from '@/utils/get-user';
import Map from '../operations/time-clock/get-started/map/map';
import PunchClock from '../operations/time-clock/get-started/map/punch-clock';
import CustomTable from '../operations/time-clock/get-started/row-slider/custom-table';
import { addMultipleTimes } from '@/utils/addTimes';
import { useState } from 'react';

export default function Activity() {
  const [state, setState] = useState('ss');
  return (
    <div>
      <div className=" h-5  w-5 animate-spin rounded-full border-2 border-blue-6 border-r-white bg-transparent "></div>
      <input
        type="text"
        value={state}
        onBlur={(e) => {
          console.log(e.target.value);
          setState(e.target.value);
        }}
      />
    </div>
  );
}
