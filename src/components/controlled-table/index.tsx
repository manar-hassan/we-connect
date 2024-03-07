
import dynamic from 'next/dynamic';
import isEmpty from 'lodash/isEmpty';
import Table, { ToggleColumns, type TableProps } from '@/components/ui/table';
import { Title } from '@/components/ui/text';
import Spinner from '@/components/ui/spinner';
import type { TableFilterProps } from '@/components/controlled-table/table-filter';
import type { TablePaginationProps } from '@/components/controlled-table/table-pagination';
import cn from '@/utils/class-names';
import {MouseEventHandler} from "react";

const TableFilter = dynamic(
  () => import('@/components/controlled-table/table-filter'),
  { ssr: false }
);
const TablePagination = dynamic(
  () => import('@/components/controlled-table/table-pagination'),
  { ssr: false }
);

type ControlledTableProps = {
  startRangeDate?: Date | null;
  endRangeDate?: Date | null;
  setStartRangeDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndRangeDate?: React.Dispatch<React.SetStateAction<Date | null>>;
  headerAssets?: {
    filterButton?: boolean;
    search?: boolean;
    dateRange?: boolean;
    viewRequests?: boolean;
    export?: boolean;
    add?: boolean;
    addNewAction?: MouseEventHandler;
  };
  customSticky?: boolean;
  showAddedFilter?: boolean;
  onRowClick?: (record: any, index: number) => void;
  page?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  filterOptions?: TableFilterProps;
  paginatorOptions?: TablePaginationProps;
  tableFooter?: React.ReactNode;
  tableActions?: React.ReactNode;
  className?: string;
  paginatorClassName?: string;
} & TableProps;

export default function ControlledTable({
  startRangeDate,
  endRangeDate,
  setStartRangeDate,
  setEndRangeDate,
  headerAssets,
  customSticky,
  showAddedFilter,
  onRowClick,
  page,
  children,
  isLoading,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  tableActions,
  showLoadingText,
  paginatorClassName,
  className,
  ...tableProps
}: ControlledTableProps) {
  const onRow = (record: { id: number }, index: number) => {
    return {
      onClick: (
        event: React.MouseEvent //@ts-ignore
      ) => onRowClick(record, index),
    };
  };

  if (isLoading) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        ) : null}
      </div>
    );
  }

  return (
    <>
      {!isEmpty(filterOptions) && (
        <TableFilter
          {...filterOptions}
          page={page}
          showAddedFilter={showAddedFilter}
          tableActions={tableActions}
          headerAssets={headerAssets}
          startRangeDate={startRangeDate}
          endRangeDate={endRangeDate}
          setStartRangeDate={setStartRangeDate}
          setEndRangeDate={setEndRangeDate}
        >
          {filterElement}
        </TableFilter>
      )}
      {page && <div className="mb-5 h-px w-full bg-[#eee]"></div>}
      {children}
      <div
        className={cn(
          'relative [&_.rc-table]:!overflow-visible ',
          !customSticky && 'overflow-hidden'
        )}
      >
        <Table
          scroll={{ x: 1300, y: 100 }}
          rowKey={(record) => record.id}
          //@ts-ignore
          onRow={onRowClick && onRow}
          className={cn('relative z-0', className)}
          {...tableProps}
          Toggle={
            <ToggleColumns
              //@ts-ignore
              columns={filterOptions?.columns}
              //@ts-ignore

              checkedColumns={filterOptions?.checkedColumns}
              //@ts-ignore

              setCheckedColumns={filterOptions?.setCheckedColumns}
              hideIndex={filterOptions?.hideIndex}
            />
          }
        />
        {tableFooter ? tableFooter : null}
      </div>
      {!isEmpty(paginatorOptions) && (
        <TablePagination
          paginatorClassName={paginatorClassName}
          {...paginatorOptions}
        />
      )}
    </>
  );
}
