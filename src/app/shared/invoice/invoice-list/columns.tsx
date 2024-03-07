'use client';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { Title, Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell, ToggleColumns } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionIcon } from '@/components/ui/action-icon';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import CustomizeIcon from '@/components/icons/customize-icon';
import { Popover } from 'rizzui';
import { useMemo, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

interface IRow {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  groups: string;
  email: string;
  userTags: string;
  title: string;
  employmentStartDate: string;
  team: string;
  department: string;
  branch: string;
  directManager: string;
  birthday: string;
  job: string;
  clockIn: Date;
  clockOut: Date;
  totalHours: Date | string;
  regularHours: Date | string;
  overtime: Date | string;
  paidTimeOff: Date | string;
  unpaidTimeOff: Date | string;
  color?: string;
  allAttendance: {
    job: string | null;
    color: string | null;
    clockIn: string | null;
    clockOut: null;
  }[];
}

/* function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'paid':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'overdue':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
} */

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  checked?: boolean;
};

const AllAttendance = ({
  children,
  allAttendanceData,
}: {
  children: JSX.Element;
  allAttendanceData: IRow['allAttendance'];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const MemoizedContent = useMemo(() => {
    return (
      <div className="grid grid-cols-[repeat(4,max-content)] gap-x-2 gap-y-2 text-black">
        {allAttendanceData.map((item, index, array) => (
          <div className="contents border-b" key={index}>
            <div className="self-center ">{item.clockIn}</div>
            <div className="flex items-center justify-center ">
              <BsArrowRight />
            </div>
            <div className=" self-center">{item.clockOut || '--'}</div>
            <div
              style={{ background: item.color || '' }}
              className={`self-center truncate  rounded-full px-3  py-0.5 text-white`}
            >
              {item.job}
            </div>
            {array.length - 1 !== index && (
              <div className="col-span-4 h-px bg-gray-3"></div>
            )}
          </div>
        ))}
      </div>
    );
  }, [allAttendanceData]);

  return (
    <Tooltip
      placement="top"
      className="bg-white [&_tooltip-arrow]:border-b-white"
      tooltipArrowClassName="  [&>path]:fill-white"
      content={() => MemoizedContent}
    >
      <div>{children}</div>
    </Tooltip>
  );
};
export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => {
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
      render: (_: any, row: any) => (
        <div className="inline-flex ps-2">
          <Checkbox
            className="cursor-pointer"
            checked={checkedItems.includes(row.id)}
            {...(onChecked && { onChange: () => onChecked(row.id) })}
          />
        </div>
      ),
      checked: true,
    },
    {
      title: <div />,
      dataIndex: 'avatar',
      key: 'avatar',
      hidden: 'avatar',
      checked: true,

      render: (_: string, row: IRow) => (
        <AvatarCard
          className="w-8 gap-0"
          avatarProps={{ customSize: '32' }}
          src={row.avatar}
          name=""
        />
      ),
    },
    {
      title: <HeaderCell title="First name" />,
      dataIndex: 'firstName',
      key: 'firstName',
      checked: true,

      render: (_: string, row: IRow) => <div>{row.firstName}</div>,
    },
    {
      title: <HeaderCell title="Last name" />,
      dataIndex: 'lastName',
      key: 'lastName',

      render: (_: string, row: IRow) => <div>{row.lastName}</div>,
    },
    {
      title: <HeaderCell title="Groups" />,
      dataIndex: 'groups',
      key: 'groups',

      render: (_: string, row: IRow) => <div>{row.groups || '--'}</div>,
    },
    {
      title: <HeaderCell title="Email" />,
      dataIndex: 'email',
      key: 'email',
      width: 250,
      render: (email: string) => email.toLowerCase(),
    },
    {
      title: <HeaderCell title="User tags" />,
      dataIndex: 'userTags',
      key: 'userTags',

      render: (_: string, row: IRow) => <div>{row.userTags || '--'}</div>,
    },
    {
      title: <HeaderCell title="Title" />,
      dataIndex: 'title',
      key: 'title',

      render: (_: string, row: IRow) => <div>{row.title || '--'}</div>,
    },
    {
      title: <HeaderCell title="Employment start date" />,
      dataIndex: 'employmentStartDate',
      key: 'employmentStartDate',

      render: (_: string, row: IRow) => (
        <div>{row.employmentStartDate || '--'}</div>
      ),
    },
    {
      title: <HeaderCell title="Team" />,
      dataIndex: 'team',
      key: 'team',
      checked: true,

      render: (_: string, row: IRow) => <div>{row.team || '--'}</div>,
    },
    {
      title: <HeaderCell title="Department" />,
      dataIndex: 'department',
      key: 'department',

      render: (_: string, row: IRow) => <div>{row.department || '--'}</div>,
    },
    {
      title: <HeaderCell title="branch" />,
      dataIndex: 'branch',
      key: 'branch',

      render: (_: string, row: IRow) => <div>{row.branch || '--'}</div>,
    },
    {
      title: <HeaderCell title="Direct manager" />,
      dataIndex: 'directManager',
      key: 'directManager',

      render: (_: string, row: IRow) => <div>{row.directManager || '--'}</div>,
    },
    {
      title: (
        <HeaderCell
          title="Birthday"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'Birthday'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('Birthday'),
      dataIndex: 'Birthday',
      key: 'Birthday',

      render: (value?: Date) => {
        if (!value) {
          return <div>--</div>;
        }
        return <div>{value.toLocaleString()}</div>;
      },
    },
    {
      title: <HeaderCell title="Job" />,
      dataIndex: 'job',
      key: 'job',
      checked: true,

      render: (_: string, row: IRow) => (
        <>
          {row.job ? (
            <div
              style={{ background: row.color }}
              className={`truncate rounded-full px-3 py-0.5 text-white `}
            >
              {row.job}
            </div>
          ) : (
            <div>--</div>
          )}
        </>
      ),
    },
    {
      title: (
        <HeaderCell
          title="Clock in"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'clockIn'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('clockIn'),
      checked: true,

      dataIndex: 'clockIn',
      key: 'clockIn',

      render: (value?: Date) => {
        if (!value) {
          return <div>--</div>;
        }
        return (
          <AllAttendance allAttendanceData={data[0].allAttendance}>
            <div>{value.toLocaleString()}</div>
          </AllAttendance>
        );
      },
    },
    {
      title: (
        <HeaderCell
          title="Clock out"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'clockOut'
          }
        />
      ),
      checked: true,

      onHeaderCell: () => onHeaderCellClick('clockOut'),
      dataIndex: 'clockOut',
      key: 'clockOut',

      render: (value?: Date) => {
        if (!value) {
          return <div>--</div>;
        }
        return <div>{value.toLocaleString()}</div>;
      },
    },
    {
      title: (
        <HeaderCell
          title="Total hours"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'totalHours'
          }
        />
      ),
      checked: true,

      onHeaderCell: () => onHeaderCellClick('totalHours'),
      dataIndex: 'totalHours',
      key: 'totalHours',

      render: (value?: Date) => {
        if (!value) {
          return <div>--</div>;
        }
        return <div>{value.toLocaleString()}</div>;
      },
    },
    {
      title: (
        <HeaderCell
          title="Regular hours"
          sortable
          ascending={
            sortConfig?.direction === 'asc' &&
            sortConfig?.key === 'regularHours'
          }
        />
      ),
      checked: true,

      onHeaderCell: () => onHeaderCellClick('regularHours'),
      dataIndex: 'regularHours',
      key: 'regularHours',
      render: (value?: Date) => {
        if (!value) {
          return <div>--</div>;
        }
        return <div>{value.toLocaleString()}</div>;
      },
    },
    {
      title: (
        <HeaderCell
          title="Overtime"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'overtime'
          }
        />
      ),
      checked: true,

      onHeaderCell: () => onHeaderCellClick('overtime'),
      dataIndex: 'overtime',
      key: 'overtime',

      render: (value?: Date) => {
        if (!value) {
          return <div>--</div>;
        }
        return <div>{value.toLocaleString()}</div>;
      },
    },
    {
      title: (
        <HeaderCell
          title="Paid time off"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'paidTimeOff'
          }
        />
      ),
      checked: true,

      onHeaderCell: () => onHeaderCellClick('paidTimeOff'),
      dataIndex: 'paidTimeOff',
      key: 'paidTimeOff',

      render: (value?: Date) => {
        if (!value) {
          return <div>--</div>;
        }
        return <div>{value.toLocaleString()}</div>;
      },
    },
    {
      title: (
        <HeaderCell
          title="Unpaid Time Off"
          sortable
          ascending={
            sortConfig?.direction === 'asc' &&
            sortConfig?.key === 'unpaidTimeOff'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('unpaidTimeOff'),
      dataIndex: 'unpaidTimeOff',
      key: 'unpaidTimeOff',

      render: (value?: Date) => {
        if (!value) {
          return <div>--</div>;
        }
        return <div>{value.toLocaleString()}</div>;
      },
    },
    {
      title: <div className="flex select-none opacity-0">Toggle</div>,
      dataIndex: '',
      checked: true,
    },

    /*  {
    title: (
      <HeaderCell
        title="Due Date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('dueDate'),
    dataIndex: 'dueDate',
    key: 'dueDate',
    
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: (
      <HeaderCell
        title="Amount"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'amount'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('amount'),
    dataIndex: 'amount',
    key: 'amount',
    
    render: (value: string) => (
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        ${value}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: string) => getStatusBadge(value),
  }, 
     {
    title: <></>,
    dataIndex: 'action',
    key: 'action',
    width: 140,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-3">
        <Tooltip
          size="sm"
          content={() => 'Edit IRow'}
          placement="top"
          color="invert"
        >
          <Link href={routes.IRow.edit(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={() => 'View IRow'}
          placement="top"
          color="invert"
        >
          <Link href={routes.IRow.details(row.id)}>
            <ActionIcon
              tag="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the IRow`}
          description={`Are you sure you want to delete this #${row.id} IRow?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  }, */
  ];
};
