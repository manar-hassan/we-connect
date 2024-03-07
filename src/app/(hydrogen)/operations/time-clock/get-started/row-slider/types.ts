export interface IAttendance {
  id?: number;
  checked?: boolean;
  status?: string | undefined;
  start?: string | undefined;
  end?: string | undefined;
  totalHours?: string | undefined;
  employeeNotes?: string | undefined;
  managerNotes?: string | undefined;
  color?: string | undefined;
}

export interface IDay {
  checked: boolean;
  date: string;
  totalDaily: string;
  attendances: IAttendance[];
  full_date: string;
}

export interface IData {
  weeklyTotal: string;
  totalRegular: string;
  range: string;
  days: IDay[];
}
