'use client';
import { useState } from 'react';
import { DatePicker } from './data-picker';

export default function CalenderRange({
  startRangeDate,
  setStartRangeDate,
  endRangeDate,
  setEndRangeDate,
}: {
  startRangeDate: Date | null;
  setStartRangeDate: React.Dispatch<React.SetStateAction<Date | null>>;
  endRangeDate: Date | null;
  setEndRangeDate: React.Dispatch<React.SetStateAction<Date | null>>;
  maxDate?: Date;
  placeholder?: string;
  buttonStyling?: string;
}) {
  const [start, setStart] = useState(startRangeDate);
  const [end, setEnd] = useState(endRangeDate);
  const handleRangeChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStart(start);
    setEnd(end);
  };
  const handleOnClosePanel = () => {
    setStartRangeDate(start);
    setEndRangeDate(end);
  };
  return (
    <DatePicker
      selected={startRangeDate}
      dateFormat="dd/MM"
      onChange={handleRangeChange}
      onCalendarClose={handleOnClosePanel}
      startDate={start}
      endDate={end}
      monthsShown={2}
      placeholderText="Select Date in a Range"
      selectsRange
      inputProps={{
        clearable: true,
        onClear: () => {
          setStart(null);
          setEnd(null);
        },
      }}
    />
  );
}
