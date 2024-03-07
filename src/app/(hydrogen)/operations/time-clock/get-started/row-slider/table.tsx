/* 'use client';

import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import Table, { ToggleColumns, type TableProps } from '@/components/ui/table';
import { Title } from '@/components/ui/text';
import Spinner from '@/components/ui/spinner';
import type { TableFilterProps } from '@/components/controlled-table/table-filter';
import type { TablePaginationProps } from '@/components/controlled-table/table-pagination';
import cn from '@/utils/class-names';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import RowSlider from '@/app/(hydrogen)/operations/time-clock/get-started/row-slider/row-slider';
 */

import { useMemo, useState } from 'react';
import { getColumns } from './column';
import { useColumn } from '@/hooks/use-column';
import { useTable } from '@/hooks/use-table';
import ControlledTable from '@/components/controlled-table';
import { ActionIcon } from 'rizzui';
import { PiCaretDownBold, PiCaretUpBold } from 'react-icons/pi';

interface IUser {
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

function getDatesInRange(startDate: Date) {
  const date = new Date(startDate);
  date.setDate(date.getDate());
  const dates = [];
  while (date < new Date()) {
    /*     const dayNumber = date.getDate();
    const month = date.getMonth() + 1;
    const dayNAme = date.toLocaleString('en-US', { weekday: 'short' }); */
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

/*
Sun 10/12
Tue 12/12
Wed 13/12
Thu 14/12
Fri 15/12
Sun 17/12

*/
export default function Table() {
  const [newData, setNewData] = useState<IUser[]>([
    {
      date: 'Sun 10/12',
      id: '0',
      status: {
        job: 'project a',
        color: 'red',
      },
      start: '1',
      end: '1',
      dailyTotal: '1',
      weeklyTotal: '1',
      totalRegular: '1',
      branch: '1',
      employeeNotes: '1',
      managerNotes: '1',
      totalHours: '1',
      redundantDayCount: 0,
      redundantWeeklyCount: 0,
    },
    {
      date: 'Sun 10/12',
      id: '1',
      status: {
        job: 'project b',
        color: 'red',
      },
      start: '2',
      end: '2',
      dailyTotal: '1',
      weeklyTotal: '1',
      totalRegular: '1',
      branch: '1',
      employeeNotes: '1',
      managerNotes: '1',
      totalHours: '1',
      redundantDayCount: 1,
      redundantWeeklyCount: 0,
    },
    {
      date: 'Tue 12/12',
      id: '2',
      status: {
        job: 'project c',
        color: 'red',
      },
      start: '3',
      end: '3',
      dailyTotal: '3',
      weeklyTotal: '1',
      totalRegular: '1',
      branch: '1',
      employeeNotes: '1',
      managerNotes: '1',
      totalHours: '1',
      redundantDayCount: 0,
      redundantWeeklyCount: 0,
    },
    /* 
    {
      date: 'Tue 12/12',
      id: '1',
      status: [],
      start: '2',
      end: '2',
      dailyTotal: '2',
      scheduled: '2',
      difference: '2',
      weeklyTotal: '2',
      totalRegular: '2',
      branch: '2',
      employeeNotes: '2',
      managerNotes: '2',
      totalHours: '2',
    },
    {
      date: 'Wed 13/12',
      id: '2',
      status: [],
      start: '3',
      end: '3',
      dailyTotal: '3',
      scheduled: '3',
      difference: '33',
      weeklyTotal: '3',
      totalRegular: '3',
      branch: '3',
      employeeNotes: '3',
      managerNotes: '3',
      totalHours: '3',
    },
    {
      date: 'Thu 14/12',
      id: '3',
      status: [],
      start: '',
      end: '',
      dailyTotal: '',
      scheduled: '',
      difference: '',
      weeklyTotal: '',
      totalRegular: '',
      branch: '',
      employeeNotes: '',
      managerNotes: '',
      totalHours: '',
    },
    {
      date: 'Fri 15/12',
      id: '4',
      status: [],
      start: '',
      end: '',
      dailyTotal: '',
      scheduled: '',
      difference: '',
      weeklyTotal: '',
      totalRegular: '',
      branch: '',
      employeeNotes: '',
      managerNotes: '',
      totalHours: '',
    },
    {
      date: 'Sun 17/12',
      id: '5',
      status: [],
      start: '',
      end: '',
      dailyTotal: '',
      scheduled: '',
      difference: '',
      weeklyTotal: '',
      totalRegular: '',
      branch: '',
      employeeNotes: '',
      managerNotes: '',
      totalHours: '',
    }, */
  ]);

  /*   const allDates = getDatesInRange(new Date('2023-12-10'));
  const randData: IUser[] = [];

  allDates.map((date, index) => {
    randData.push({
      date,
      id: index.toString(),
      status: [],
      start: '',
      end: '',
      dailyTotal: '',
      scheduled: '',
      difference: '',
      weeklyTotal: '',
      totalRegular: '',
      branch: '',
      employeeNotes: '',
      managerNotes: '',
      totalHours: '',
    });
    randData[0].status = [{ job: 'project a', color: 'red' }];
  }); */

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(newData);

  const columns = useMemo(
    () =>
      getColumns({
        data: newData,
        checkedItems: selectedRowKeys,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRowKeys, handleRowSelect, handleSelectAll]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);
  /*

              columns={filterOptions?.columns}
              checkedColumns={filterOptions?.checkedColumns}
              setCheckedColumns={filterOptions?.setCheckedColumns}
              hideIndex={filterOptions?.hideIndex}*/
              
  return (
    <div className="flex-1 overflow-auto pb-5">
      <ControlledTable
        customSticky={true}
        showAddedFilter={false}
        variant="modern"
        data={newData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        tableFooter={<div className="hidden">table footer</div>}
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
