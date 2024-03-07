'use client';

import Button from '@/app/(hydrogen)/shared/button';
import Search from '@/app/(hydrogen)/shared/search';
import FilterIcon from '@/components/icons/filter';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from './users-columns';
const FilterElement = dynamic(
  () => import('@/app/shared/invoice/invoice-list/filter-element'),
  { ssr: false }
);

export default function SecondStepUsers({
  getValues,
  setValue,
  setDisableNext,
}: any) {
  const data = [
    {
      id: '0',
      avatar:
        'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
      firstName: 'omar',
      lastName: 'taha',
      email: 'omar@omar.com',
      group: '',
      tags: ['tag'],
      mobilePhone: '00',
      title: '',
      employmentStartDate: '18/01/2024',
      team: '',
      employment: '',
      branch: '',
      department: '',
      directManager: '',
      birthday: '',
      dataAdded: '24/01/2024',
    },
    {
      id: '1',
      avatar:
        'https://www.shareicon.net/data/128x128/2016/05/24/770117_people_512x512.png',
      firstName: 'aly',
      lastName: 'taha',
      email: 'omar@omar.com',
      group: '',
      tags: ['tag'],
      mobilePhone: '00',
      title: '',
      employmentStartDate: '',
      team: '',
      employment: '',
      branch: '',
      department: '',
      directManager: '',
      birthday: '',
      dataAdded: '18/01/2024',
    },
  ];
  const {
    isLoading,
    isFiltered,
    tableData,
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
    handleReset,
  } = useTable(data);
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });
  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  useEffect(() => {
    const defaultValue = getValues('selectedUser');
    defaultValue.map((id: string) => handleRowSelect(id));
  }, []);

  useEffect(() => {
    if (selectedRowKeys.length === 0) {
      setDisableNext(true);
    } else {
      setDisableNext(false);
    }
    setValue('selectedUser', selectedRowKeys);
  }, [selectedRowKeys]);

  return (
    <div className="w-full px-7 pt-5 ">
      <ControlledTable
        headerAssets={{ filterButton: true, search: true }}
        variant="modern"
        data={tableData}
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
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        /*         tableActions={
          <TableActions checkedItems={selectedRowKeys} content={<Actions />} />
        } */
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
