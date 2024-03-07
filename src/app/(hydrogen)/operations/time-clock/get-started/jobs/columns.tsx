'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell, ToggleColumns } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import AvatarCard from '@/components/ui/avatar-card';
import { useMemo, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import UserCard from '@/app/(hydrogen)/shared/user-card';
import Users from '@/app/(hydrogen)/shared/users';

interface IRow {
  id: number;
  job: string;
  color: string;
  users: {
    image_url: string;
    name: string;
  }[];
  count: number;
  totalHours: string;
  avg_hours: string;
}
type Columns = {
  sortConfig?: any;
  onHeaderCellClick: (value: string) => void;
};

export const getColumns = ({ sortConfig, onHeaderCellClick }: Columns) => {
  return [
    {
      title: <HeaderCell title="Job" />,
      dataIndex: 'job',
      key: 'job',
      checked: true,
      render: (_: string, row: IRow) => (
        <div
          style={{ backgroundColor: row.color }}
          className="rounded-full py-1 font-semibold text-white"
        >
          {row.job}
        </div>
      ),
    },
    {
      title: <HeaderCell title="Performed by" />,
      dataIndex: 'performedBy',
      key: 'performedBy',
      checked: true,
      render: (_: string, row: IRow) => {
        const fakeUsers: { imageSrc: string; name: string }[] = [];
        row.users.forEach((user) =>
          fakeUsers.push({ imageSrc: user.image_url, name: user.name })
        );
        return <Users usersData={fakeUsers} className="max-w-max" />;
      },
    },
    {
      title: <HeaderCell title="Shifts on job" />,
      dataIndex: 'shiftsOnJob',
      key: 'shiftsOnJob',
      checked: true,
      render: (_: string, row: IRow) => <div>{row.count}</div>,
    },
    {
      title: <HeaderCell title="Total hours" />,
      dataIndex: 'totalHours',
      key: 'totalHours',
      checked: true,
      render: (_: string, row: IRow) => <div>{row.totalHours}</div>,
    },
    {
      title: <div className="flex select-none opacity-0">Toggle</div>,
      dataIndex: '',
      checked: true,
    },
  ];
};
