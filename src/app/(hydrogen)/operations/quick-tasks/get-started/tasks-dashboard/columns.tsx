'use client';

import { Tooltip } from '@/components/ui/tooltip';
import { HeaderCell, ToggleColumns } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import AvatarCard from '@/components/ui/avatar-card';
import { useMemo, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';

interface IRow {
  id: string;
  title: string;
  status: string;
  subTasks: string[];
  label: {
    text: string;
    color: string;
  }[];
  startDate: string;
  dueDate: string;
  assignedTo: { name: string; id: string }[];
  dateCreated: string;
}
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
      title: <HeaderCell title="Title" />,
      dataIndex: 'title',
      key: 'title',
      checked: true,

      render: (_: string, row: IRow) => <div>{row.title}</div>,
    },
    {
      title: <HeaderCell title="Status" />,
      dataIndex: 'status',
      key: 'status',
      checked: true,

      render: (_: string, row: IRow) => <div>{row.status}</div>,
    },
    {
      title: <HeaderCell title="Sub-tasks" />,
      dataIndex: 'subTasks',
      key: 'subTasks',
      checked: true,

      render: (_: string, row: IRow) => <div>{row.subTasks || '--'}</div>,
    },
    {
      title: <HeaderCell title="Label" />,
      dataIndex: 'label',
      key: 'label',
      checked: true,
      render: (_: string, row: IRow) => (
        <div>{row.label.map((item) => `${item.text} `)}</div>
      ),
    },
    {
      title: <HeaderCell title="Start Date" />,
      dataIndex: 'startDate',
      key: 'startDate',
      checked: true,

      render: (_: string, row: IRow) => <div>{row.startDate || '--'}</div>,
    },
    {
      title: <HeaderCell title="Due Date" />,
      dataIndex: 'dueDate',
      key: 'dueDate',
      checked: true,

      render: (_: string, row: IRow) => <div>{row.dueDate || '--'}</div>,
    },
    {
      title: <HeaderCell title="Assigned to" />,
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      checked: true,

      render: (_: string, row: IRow) => (
        <div>{row.assignedTo.map((item) => `${item.name} `)}</div>
      ),
    },
    {
      title: <HeaderCell title="Date created" />,
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      checked: false,

      render: (_: string, row: IRow) => <div>{row.dateCreated || '--'}</div>,
    },
    {
      title: <div className="flex select-none opacity-0">Toggle</div>,
      dataIndex: '',
      checked: true,
    },
  ];
};
