import { DatePicker } from '@/components/ui/datepicker';
import React, { useEffect, useState } from 'react';

export default function Calender({
  setValue,
  buttonStyling,
  formVariable,
}: any) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setValue(formVariable, date);
  }, [date, setValue]);

  return (
    <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={date}
      onChange={(date: Date) => {
        /*         const formattedDate = date
          .toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
          })
          .replace(/\//g, '-'); */

        setDate(date);
      }}
      placeholderText="Select Date"
      buttonStyling={buttonStyling}
    />
  );
}
