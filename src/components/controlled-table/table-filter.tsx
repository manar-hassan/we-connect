'use client';

import React, {MouseEventHandler, useState} from 'react';
import dynamic from 'next/dynamic';
import {PiXBold} from 'react-icons/pi';
import Button from '@/app/(hydrogen)/shared/button';
import {ActionIcon} from '@/components/ui/action-icon';
import {Input} from '@/components/ui/input';
import {Title} from '@/components/ui/text';
import cn from '@/utils/class-names';
import {useMedia} from '@/hooks/use-media';
import FilterIcon from '../icons/filter';
import SearchIcon from '../icons/search-icon';
import ExportIcon from '../icons/export';
import {AnimatePresence, motion} from 'framer-motion';
import CalenderRange from '@/app/(hydrogen)/shared/calender-range';
import ViewRequests from '@/app/(hydrogen)/operations/time-clock/get-started/settings/view-requests-jobs';
import RequestSlider from '@/app/(hydrogen)/operations/time-clock/get-started/request-slider';
import FilterLine from '@/app/(hydrogen)/operations/time-clock/get-started/filter/filter-line';
import Separator from '@/app/(hydrogen)/shared/separator';
import PlusIcon from "@/components/icons/plus";
import {Button as RiButton} from "rizzui"

const Drawer = dynamic(
    () => import('@/components/ui/drawer').then((module) => module.Drawer),
    {ssr: false}
);
const Slider = dynamic(() => import('@/app/(hydrogen)/shared/slider'), {
    ssr: false,
});

function FilterDrawerView({
                              isOpen,
                              drawerTitle,
                              hasSearched,
                              setOpenDrawer,
                              children,
                          }: React.PropsWithChildren<{
    drawerTitle?: string;
    hasSearched?: boolean;
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen?: boolean;
}>) {
    return (
        <Drawer
            size="sm"
            isOpen={isOpen ?? false}
            onClose={() => setOpenDrawer(false)}
            overlayClassName="dark:bg-opacity-20 backdrop-blur-md"
            containerClassName="dark:bg-gray-100"
        >
            <div className="flex h-full flex-col p-5">
                <div className="-mx-5 mb-6 flex items-center justify-between border-b border-gray-200 px-5 pb-4">
                    <Title as="h5">{drawerTitle}</Title>
                    <ActionIcon
                        size="sm"
                        rounded="full"
                        variant="text"
                        title={'Close Filter'}
                        onClick={() => setOpenDrawer(false)}
                    >
                        <PiXBold className="h-4 w-4"/>
                    </ActionIcon>
                </div>
                <div className="flex-grow">
                    <div
                        className="grid grid-cols-1 gap-6 [&_.price-field>span.mr-2]:mb-1.5 [&_.price-field]:flex-col [&_.price-field]:items-start [&_.react-datepicker-wrapper]:w-full [&_.react-datepicker-wrapper_.w-72]:w-full [&_.text-gray-500]:text-gray-700 [&_button.h-9]:h-10 sm:[&_button.h-9]:h-11 [&_label>.h-9]:h-10 sm:[&_label>.h-9]:h-11 [&_label>.w-24.h-9]:w-full">
                        {children}
                    </div>
                </div>
                <Button
                    onClick={() => setOpenDrawer(false)}
                    className="mt-5 h-11 w-full text-sm"
                >
                    Show Results
                </Button>
            </div>
        </Drawer>
    );
}

export type TableFilterProps = {
    startRangeDate?: Date | null;
    endRangeDate?: Date | null;
    setStartRangeDate?: React.Dispatch<React.SetStateAction<Date | null>>;
    setEndRangeDate?: React.Dispatch<React.SetStateAction<Date | null>>;
    searchTerm: string;
    onSearchClear: () => void;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    columns: { [key: string]: any }[];
    checkedColumns: string[];
    setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>;
    hideIndex?: number;
    children?: React.ReactNode;
    drawerTitle?: string;
    hasSearched?: boolean;
    showSearchOnTheRight?: boolean;
    enableDrawerFilter?: boolean;
    menu?: React.ReactNode;
    page?: string;
    showAddedFilter?: boolean;
    tableActions?: React.ReactNode;
    headerAssets?: {
        filterButton?: boolean;
        search?: boolean;
        dateRange?: boolean;
        viewRequests?: boolean;
        export?: boolean;
        add?: boolean;
        addNewAction?: MouseEventHandler
    };
};

export default function TableFilter({
                                        startRangeDate,
                                        endRangeDate,
                                        setStartRangeDate,
                                        setEndRangeDate,
                                        searchTerm,
                                        onSearchClear,
                                        onSearchChange,
                                        columns,
                                        checkedColumns,
                                        setCheckedColumns,
                                        hideIndex,
                                        drawerTitle = 'Table Filters',
                                        hasSearched,
                                        enableDrawerFilter = false,
                                        showSearchOnTheRight = false,
                                        menu,
                                        children,
                                        page,
                                        showAddedFilter,
                                        tableActions,
                                        headerAssets,
                                    }: TableFilterProps) {
    const isMediumScreen = useMedia('(max-width: 1860px)', false);
    const [showFilters, setShowFilters] = useState(true);
    const [openDrawer, setOpenDrawer] = useState(false);

    const [openFilter, setOpenFilter] = useState(false);

    return (
        <div>
            <div className="table-filter flex items-center justify-between">
                {headerAssets && (
                    <div className="mb-5 flex w-full items-center justify-between">
                        <div className="flex items-center gap-5">
                            {headerAssets.filterButton && (
                                <button
                                    onClick={() => setOpenFilter(true)}
                                    className={cn(
                                        'flex h-10 items-center gap-2 rounded-full border bg-white px-4 text-blue-5 transition duration-100 hover:bg-gray-1 active:border-blue-6 active:bg-gray-2 '
                                    )}
                                >
                                    <FilterIcon/> Filter
                                </button>
                            )}
                            {headerAssets.dateRange && (
                                <>
                                    <Separator/>
                                    <div className=" flex items-center gap-5">
                                        Data range
                                        <CalenderRange
                                            //@ts-ignore
                                            startRangeDate={startRangeDate}
                                            //@ts-ignore
                                            setStartRangeDate={setStartRangeDate}
                                            //@ts-ignore
                                            endRangeDate={endRangeDate}
                                            //@ts-ignore
                                            setEndRangeDate={setEndRangeDate}
                                        />
                                    </div>
                                </>
                            )}
                            {tableActions ? tableActions : null}
                        </div>
                        <div className="flex items-center gap-5">
                            {headerAssets.viewRequests && (
                                <ViewRequests
                                    placement="bottom"
                                    modalView={
                                        <Slider>
                                            <RequestSlider/>
                                        </Slider>
                                    }
                                />
                            )}
                            {headerAssets.search && (
                                <div
                                    className="flex h-10 items-center justify-between rounded-full border border-gray-3 px-3 ">
                                    <Input
                                        type="search"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onClear={onSearchClear}
                                        onChange={onSearchChange}
                                        inputClassName="border-none p-0 placeholder:text-sm focus:border-none focus:outline-none focus:ring-transparent [&.is-focus]:ring-transparent"
                                        // clearable={true}
                                        rounded="pill"
                                    />
                                    <SearchIcon/>
                                </div>
                            )}
                            {headerAssets.export && (
                                <>
                                    <Separator/>
                                    <Button>
                                        <ExportIcon/>
                                        Export
                                    </Button>
                                </>
                            )}
                            {headerAssets.add && (
                                <>
                                    <Separator/>
                                    <Button onClick={headerAssets.addNewAction}>
                                        <PlusIcon/>
                                        Add New
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <AnimatePresence>
                {openFilter && (
                    <motion.div
                        animate={{
                            height: 'auto',
                            marginTop: '20px',
                            marginBottom: '-20px',
                        }}
                        initial={{
                            height: '0',
                            marginTop: '0',
                            marginBottom: '0',
                        }}
                        exit={{height: '0', marginTop: '0', marginBottom: '0'}}
                        className="overflow-hidden "
                    >
                        <FilterLine setOpenFilter={setOpenFilter}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
