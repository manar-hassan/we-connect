'use client';

import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns as getTodayColumns } from './today-column';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import RowSlider from '../row-slider/row-slider';
const FilterElement = dynamic(
  () => import('@/app/shared/invoice/invoice-list/filter-element'),
  { ssr: false }
);
const TableActions = dynamic(
  () => import('@/app/(hydrogen)/shared/table-actions'),
  {
    ssr: false,
  }
);
const Slider = dynamic(() => import('@/app/(hydrogen)/shared/slider'), {
  ssr: false,
});

const filterState = {
  amount: ['', ''],
  createdAt: [null, null],
  dueDate: [null, null],
  status: '',
};

export default function TodayTable({
  data = [],
  children,
  page,
}: {
  data: any[];
  children?: React.ReactNode;
  page?: string;
}) {
  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  } = useTable(data, pageSize, filterState);

  const todayColumns = React.useMemo(
    () =>
      getTodayColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const {
    visibleColumns: visibleTodayColumns,
    checkedColumns: checkedTodayColumns,
    setCheckedColumns: setCheckedTodayColumns,
  } = useColumn(todayColumns);

  const { openDrawer } = useDrawer();

  const handleRowClick = (record: any, index: number) => {
    // Handle row click event here...
    console.log('Row Clicked:', record, ' index:', index);
    openDrawer({
      view: (
        <Slider>
          <RowSlider record={record} index={index} data={data} />
        </Slider>
      ),
      placement: 'bottom',
      customSize: 'calc(100vh - 64px)',
    });
  };

  function Actions() {
    return (
      <div className="flex flex-col items-start p-1">
        <div className="w-full cursor-pointer rounded-xl p-2  text-left capitalize text-primary transition duration-100 hover:bg-gray-1">
          Add Shift
        </div>
        <div className="w-full cursor-pointer rounded-xl p-2 text-left capitalize text-primary transition duration-100 hover:bg-gray-1">
          Send chat message
        </div>
        <div className="w-full cursor-pointer rounded-xl p-2 text-left capitalize text-primary transition duration-100 hover:bg-gray-1">
          Create team chat with selected
        </div>
        <div className="w-full cursor-pointer rounded-xl p-2 text-left capitalize text-primary transition duration-100 hover:bg-gray-1">
          Create task
        </div>
      </div>
    );
  }

  return (
    <>
      <ControlledTable
        onRowClick={handleRowClick}
        // @ts-ignore
        page={page}
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        /*  Error: Do not pass children as props. Instead, nest children between the opening and closing tags.  react/no-children-prop */
        /* eslint-disable */
        children={children}
        // @ts-ignore
        columns={visibleTodayColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns: todayColumns,
          checkedColumns: checkedTodayColumns,
          setCheckedColumns: setCheckedTodayColumns,
        }}
        filterElement={
          <FilterElement
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        tableActions={
          <TableActions checkedItems={selectedRowKeys} content={<Actions />} />
        }
        headerAssets={{ filterButton: true, search: true }}
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
}
