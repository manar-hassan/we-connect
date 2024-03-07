'use client';
import { HeaderCell, ToggleColumns } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

import UserCard from '@/app/(hydrogen)/shared/user-card';

const aa = {
  id: 0,
  firstName: 'omar',
  lastName: 'taha',
  email: 'omar@omar.com',
  group: 'group',
  tags: ['tag'],
  mobilePhone: '00',
  title: 'title',
  employmentStartDate: '00',
  team: 'tt',
  employment: 'em',
  branch: 't',
  department: 'd',
  directManager: 'dd',
  birthday: 'b',
  dataAdded: '0',
};
interface IRow {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  groups: string;
  email: string;
  tags: string[];
  mobilePhone: string;
  title: string;
  employmentStartDate: string;
  employment: string;
  team: string;
  department: string;
  branch: string;
  directManager: string;
  birthday: string;
  dataAdded: string;
}
type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  checked?: boolean;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
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
      title: <HeaderCell ellipsis width={32} title="" />,
      dataIndex: 'avatar',
      key: 'avatar',
      hidden: 'avatar',
      checked: true,

      render: (_: string, row: IRow) => (
        <UserCard
          name={`${row.firstName} ${row.lastName}`}
          phoneNumber={row.mobilePhone}
          isAdmin
          imageSrc={row.avatar}
          size="sm"
        />
      ),
    },
    {
      title: (
        <HeaderCell
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'firstName'
          }
          title="First name"
        />
      ),
      dataIndex: 'firstName',
      key: 'firstName',
      checked: true,

      onHeaderCell: () => onHeaderCellClick('firstName'),

      render: (_: string, row: IRow) => <div>{row.firstName}</div>,
    },
    {
      title: <HeaderCell title="Last name" />,
      dataIndex: 'lastName',
      key: 'lastName',
      checked: true,

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
      title: <HeaderCell title="Tags" />,
      dataIndex: 'tags',
      key: 'tags',

      render: (_: string, row: IRow) => <div>{row.tags[0] || '--'}</div>,
    },
    {
      title: <HeaderCell title="Title" />,
      dataIndex: 'title',
      key: 'title',
      checked: true,

      render: (_: string, row: IRow) => <div>{row.title || '--'}</div>,
    },
    {
      title: (
        <HeaderCell
          sortable
          ascending={
            sortConfig?.direction === 'asc' &&
            sortConfig?.key === 'employmentStartDate'
          }
          title="Employment start date"
        />
      ),
      onHeaderCell: () => onHeaderCellClick('employmentStartDate'),

      dataIndex: 'employmentStartDate',
      key: 'employmentStartDate',
      checked: true,

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
      checked: true,

      render: (_: string, row: IRow) => <div>{row.department || '--'}</div>,
    },
    {
      title: <HeaderCell title="Branch" />,
      dataIndex: 'branch',
      key: 'branch',
      checked: true,

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
            sortConfig?.direction === 'asc' && sortConfig?.key === 'birthday'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('birthday'),
      dataIndex: 'birthday',
      key: 'birthday',

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
          title="Data added"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'dataAdded'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('dataAdded'),
      dataIndex: 'dataAdded',
      key: 'dataAdded',
      checked: true,

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
  ];
};
