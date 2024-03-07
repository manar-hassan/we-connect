'use client';
import { DatePicker } from './data-picker';

export default function Calender({
  date,
  setDate,
  maxDate,
  placeholder,
  buttonStyling,
  minDate,
}: {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  maxDate?: Date;
  placeholder?: string;
  buttonStyling?: string;
  minDate?: Date;
}) {
  return (
    <>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={date}
        onChange={(date: Date) => setDate(date)}
        placeholderText={placeholder}
        maxDate={maxDate}
        buttonStyling={buttonStyling}
        minDate={minDate}
      />
    </>
  );
}
