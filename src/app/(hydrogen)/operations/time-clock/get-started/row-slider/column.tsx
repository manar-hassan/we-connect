'use client';
/* trryyy */

import { HeaderCell } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import AddShift from '@/components/icons/add-shift';
import SelectStatus from './selectStatus';

interface IRow {
  id: string;
  date: string;
  status: { job: string; color: string };
  start: string;
  end: string;
  dailyTotal: string;
  weeklyTotal: string;
  totalRegular: string;
  branch: string;
  employeeNotes: string;
  managerNotes: string;
  totalHours: string;
  redundantDayCount: number;
  redundantWeeklyCount: number;
}

type Columns = {
  data: any[];
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick?: (value: string) => void;
  onChecked?: (id: string) => void;
  checked?: boolean;
};

export const getColumns = ({
  data,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => {
  const weeksNumber: number[] = [];
  const renderCell = (dataIndex: string, value: string, row: IRow) => {
    const obj = {
      children: value,
      props: {
        rowSpan: countRowSpan(dataIndex, value, row),
      },
    };
    return obj;
  };
  const countRowSpan = (dataIndex: string, value: string, row: IRow) => {
    const count = data.filter((i) => i[dataIndex] === value).length;
    if (row.redundantDayCount === 0 && count > 1) {
      return count;
    } else if (count > 1) {
      return 0;
    } else {
      return 1;
    }
  };
  const weeklySpan = (dataIndex: string, value: string, row: IRow) => {
    if (weeksNumber.includes(row.redundantWeeklyCount)) {
      return 0;
    } else {
      weeksNumber.push(row.redundantWeeklyCount);
      return 3;
    }
    return data.length;
    const count = data.filter((i) => i[dataIndex] === value).length;
    if (row.redundantWeeklyCount === 0 && count > 1) {
      return count;
    } else if (count > 1) {
      return 0;
    } else {
      return 1;
    }
  };

  return [
    {
      title: (
        <div className="ps-2">
          <Checkbox
            title={'Select All'}
            onChange={handleSelectAll}
            checked={checkedItems.length === data.length}
            className="cursor-pointer"
          />
        </div>
      ),
      dataIndex: 'checked',
      key: 'checked',
      width: 30,

      render: (value: any, row: any, index: number) => {
        return {
          children: (
            <div className="inline-flex ps-2">
              <Checkbox
                className="cursor-pointer"
                checked={checkedItems.includes(row.id)}
                {...(onChecked && { onChange: () => onChecked(row.id) })}
              />
            </div>
          ),
          props: {
            rowSpan: countRowSpan('date', data[index].date, row),
          },
        };
      },
      checked: true,
    },
    {
      title: <div className="flex select-none opacity-0">shift</div>,
      dataIndex: '',
      checked: true,
      render: (value: any, row: IRow, index: number) => {
        return {
          children: (
            <button>
              <AddShift />
            </button>
          ),
          props: {
            rowSpan: countRowSpan('date', data[index].date, row),
          },
        };
      },
    },
    {
      title: <HeaderCell title="Date" />,
      dataIndex: 'date',
      key: 'date',
      checked: true,

      render: (value: string, row: IRow) => {
        return renderCell('date', value, row);
      },
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: 'status',
      key: 'status',
      checked: true,
      render: (value: { job: string; color: string }, row: IRow) => {
        return {
          children: value,
        };
      },
    },
    {
      title: <HeaderCell title="Start" />,
      dataIndex: 'start',
      key: 'start',
      checked: true,
      render: (value: string, row: IRow) => {
        return {
          children: <div>{value}</div>,
        };
      },
    },
    {
      title: <HeaderCell title="End" />,
      dataIndex: 'end',
      key: 'end',
      render: (value: string, row: IRow) => {
        return {
          children: <div>{value}</div>,
        };
      },
      checked: true,
    },
    {
      title: <HeaderCell title="Total hours" />,
      dataIndex: 'totalHours',
      key: 'totalHours',
      checked: true,
      render: (value: string, row: IRow) => {
        return {
          children: <div>{value}</div>,
        };
      },
    },
    {
      title: <HeaderCell title="Daily total" />,
      dataIndex: 'dailyTotal',
      key: 'dailyTotal',
      checked: true,
      render: (value: string, row: IRow) => {
        return renderCell('dailyTotal', value, row);
      },
    },
    /*     {
      title: <HeaderCell title="Weekly total" />,
      dataIndex: 'weeklyTotal',
      key: 'weeklyTotal',
      checked: true,
      render: (value: string, row: IRow) => {
        return {
          children: <div>{value} week</div>,
          props: {
            rowSpan: weeklySpan('weeklyTotal', value, row),
          },
        };
      },
    },
    {
      title: <HeaderCell title="Total regular" />,
      dataIndex: 'totalRegular',
      key: 'totalRegular',
      checked: true,
      render: (value: string, row: IRow) => {
        return {
          children: <div>{value} totalreg</div>,
          props: {
            rowSpan: weeklySpan('weeklyTotal', value, row),
          },
        };
      },
    }, */
    {
      title: (
        <div className="w-9">
          <div className="absolute top-0 mr-3 flex h-[calc(100vh-245px)] w-9 items-center  justify-center whitespace-nowrap bg-gray-2">
            <span className="rotate-[270deg]"> Shift attachments</span>
          </div>
        </div>
      ),
      dataIndex: '',
      checked: true,
      render: (_: string, row: IRow, index: number) => {
        return {
          props: {
            rowSpan: countRowSpan('date', data[index].date, row),
          },
        };
      },
    },
    {
      title: <HeaderCell title="Employee notes" />,
      dataIndex: 'employeeNotes',
      key: 'employeeNotes',
      checked: true,
      render: (value: string) => {
        return {
          children: <div>{value}</div>,
        };
      },
    },

    {
      title: <HeaderCell title="Manager notes" />,
      dataIndex: 'managerNotes',
      key: 'managerNotes',
      checked: true,
      render: (value: string) => {
        return {
          children: <div>{value}</div>,
        };
      },
    },

    {
      title: <div className="flex select-none opacity-0">Toggle</div>,
      dataIndex: '',
      checked: true,
      render: (value: string, row: IRow, index: number) => {
        return {
          props: {
            rowSpan: countRowSpan('date', data[index].date, row),
          },
        };
      },
    },
  ];
};
