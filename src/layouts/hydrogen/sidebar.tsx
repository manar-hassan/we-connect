'use client';

//@ts-ignore
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Collapse } from '@/components/ui/collapse';
import cn from '@/utils/class-names';
import SimpleBar from '@/components/ui/simplebar';
import { menuItems } from './menu-items';
import ArrowSquare from '@/components/icons/arrow-square';
import ThreeDots from '@/components/icons/three-dots';
import ReorderIcon from '@/components/icons/reorder';
import PlusIcon from '@/components/icons/plus';
import ArrowLeft from '@/components/icons/arrow-left';

export default function Sidebar({
  className,
  openDrawer,
  setOpenDrawer,
}: {
  className?: string;
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();

  const [dragDropList, setDragDropList] = useState(menuItems);

  const onDragComplete = (result: any) => {
    if (!result.destination) return;

    console.log('child result: ', result);

    const droppableGroup = dragDropList.find(
      (el) => el.name === result.destination.droppableId
    );
    const droppableGroupIndex = dragDropList.findIndex(
      (el) => el.name === result.destination.droppableId
    );
    const items = Array.from(droppableGroup?.dropdownItems || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDragDropList((prev) => {
      const updatedList = [...prev];
      if (
        updatedList[droppableGroupIndex] &&
        updatedList[droppableGroupIndex].dropdownItems
      ) {
        //@ts-ignore
        updatedList[droppableGroupIndex] = {
          ...updatedList[droppableGroupIndex],
          dropdownItems: items,
        };
      }
      return updatedList;
    });
  };

  const onDragCompleteParent = (result: any) => {
    console.log(result);
/* 
    const arr = [...dragDropList];

    let removedItem = arr.splice(result.source.index, 1)[0];
    arr.splice(result.destination.index, 0, removedItem);

    setDragDropList(arr); */
  };

  return (
    <motion.aside
      animate={{ width: openDrawer ? '200px' : '63px' }}
      className={cn(
        'fixed bottom-0 top-[60px] z-40 h-full border-e-2 border-gray-100 bg-white dark:bg-gray-100/50 ',
        className,
        !openDrawer && 'px-2'
      )}
    >
      <SimpleBar className="  h-[calc(100%-120px)] ">
        <motion.div
          animate={{
            justifyContent: openDrawer ? 'end' : 'center',
          }}
          className={cn('flex ')}
        >
          <span
            onClick={() => setOpenDrawer(!openDrawer)}
            className={cn(
              'flex h-5 w-5 cursor-pointer items-center justify-center rounded-bl-md bg-[#e6eaee]',
              !openDrawer && 'rounded-b-md'
            )}
          >
            <span
              className={cn(
                'transition-all duration-200',
                !openDrawer && 'rotate-180'
              )}
            >
              <ArrowLeft />
            </span>
          </span>
        </motion.div>
        <div className=" mt-2 pb-3 ">
          <DragDropContext onDragEnd={onDragCompleteParent}>
            <Droppable droppableId="parent-list">
              {(provided: any) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {dragDropList.map((item, index) => {
                    const isActive = pathname === (item?.href as string);
                    const pathnameExistInDropdowns: any =
                      item?.dropdownItems?.filter(
                        (dropdownItem) => dropdownItem.href === pathname
                      );
                    const isDropdownOpen = Boolean(
                      pathnameExistInDropdowns?.length
                    );

                    return (
                      <Fragment key={item.name + '-' + index}>
                        {item?.href ? (
                          <>
                            {item?.dropdownItems ? (
                              <Draggable
                                key={`parent-${item.name}`}
                                draggableId={`parent-${item.name}`}
                                index={index}
                              >
                                {(provided: any, snapshot: any) => (
                                  <>
                                    <Collapse
                                      defaultOpen={isDropdownOpen}
                                      header={({ open, toggle }) => {
                                        return (
                                          <div className="">
                                            <motion.div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              whileHover={{
                                                gap: 4,
                                                transition: { duration: 0.2 },
                                              }}
                                              className={cn(
                                                'group relative mx-2.5 flex h-8 items-center justify-start gap-0 whitespace-nowrap rounded-md text-base text-[#3f4648]',
                                                isActive
                                                  ? 'before:top-2/5 bg-[#f0f6fb] text-primary '
                                                  : 'text-gray-700 transition-colors duration-200 dark:text-gray-700/90',
                                                !openDrawer && 'hidden'
                                              )}
                                            >
                                              <span
                                                onMouseDown={() =>
                                                  open && toggle()
                                                }
                                                {...provided.dragHandleProps}
                                                className="cursor-move  opacity-0 transition-all duration-200 group-hover:mr-2 group-hover:opacity-100 "
                                              >
                                                <ReorderIcon />
                                              </span>
                                              <div className="flex h-full w-full items-center justify-between">
                                                <span className="flex h-full items-center text-sm font-bold">
                                                  {item.name}
                                                </span>

                                                <div className="flex items-center gap-1">
                                                  <span
                                                    onClick={toggle}
                                                    className="cursor-pointer opacity-0 transition-all duration-100 group-hover:opacity-100"
                                                  >
                                                    <ArrowSquare
                                                      className={cn(
                                                        'rotate-180 transition-transform duration-200',
                                                        open &&
                                                          'rotate-0 rtl:rotate-0'
                                                      )}
                                                    />
                                                  </span>
                                                  <span className="cursor-pointer opacity-0 transition-all duration-100 group-hover:opacity-100">
                                                    <ThreeDots />
                                                  </span>
                                                </div>
                                              </div>
                                            </motion.div>
                                          </div>
                                        );
                                      }}
                                    >
                                      <DragDropContext
                                        onDragEnd={onDragComplete}
                                      >
                                        <Droppable droppableId={item.name}>
                                          {(provided: any) => (
                                            <div
                                              {...provided.droppableProps}
                                              ref={provided.innerRef}
                                            >
                                              {item?.dropdownItems?.map(
                                                (dropdownItem, index) => {
                                                  const isChildActive =
                                                    pathname ===
                                                    (dropdownItem?.href as string);
                                                  return (
                                                    <Draggable
                                                      key={dropdownItem.href}
                                                      draggableId={
                                                        dropdownItem.href
                                                      }
                                                      index={index}
                                                    >
                                                      {(provided: any) => (
                                                        <div
                                                          ref={
                                                            provided.innerRef
                                                          }
                                                          {...provided.draggableProps}
                                                        >
                                                          <Link
                                                            href={
                                                              dropdownItem?.href
                                                            }
                                                            className={cn(
                                                              'group relative mr-2.5 flex h-10 items-center justify-start rounded-md py-2 pl-2.5 pr-1 text-base text-[#3f4648]',
                                                              isChildActive
                                                                ? 'before:top-2/5 bg-[#f0f6fb] text-primary '
                                                                : 'text-gray-700 transition-colors duration-200 hover:bg-[#f7f7f7] hover:text-gray-900 dark:text-gray-700/90',
                                                              !openDrawer &&
                                                                'm-0 justify-center p-0'
                                                            )}
                                                          >
                                                            <span
                                                              {...provided.dragHandleProps}
                                                              className={cn(
                                                                'cursor-move opacity-0 transition-all duration-200 group-hover:mr-2 group-hover:opacity-100 ',
                                                                !openDrawer &&
                                                                  'hidden'
                                                              )}
                                                            >
                                                              <ReorderIcon />
                                                            </span>
                                                            <div className="flex items-center gap-1.5 truncate">
                                                              {
                                                                dropdownItem.icon
                                                              }
                                                              <motion.span
                                                                animate={{
                                                                  display:
                                                                    openDrawer
                                                                      ? 'block'
                                                                      : 'none',
                                                                }}
                                                                className={cn(
                                                                  'truncate text-sm'
                                                                )}
                                                              >
                                                                {
                                                                  dropdownItem?.name
                                                                }
                                                              </motion.span>
                                                            </div>
                                                            <span
                                                              className={cn(
                                                                'ml-auto cursor-pointer opacity-0 transition-all duration-100 group-hover:opacity-100',
                                                                !openDrawer &&
                                                                  'hidden'
                                                              )}
                                                            >
                                                              <ThreeDots />
                                                            </span>
                                                            {/*                               {dropdownItem?.badge?.length
                                ? getStatusBadge(dropdownItem?.badge)
                                : null} */}
                                                          </Link>
                                                        </div>
                                                      )}
                                                    </Draggable>
                                                  );
                                                }
                                              )}
                                              {provided.placeholder}
                                            </div>
                                          )}
                                        </Droppable>
                                      </DragDropContext>

                                      <button
                                        className={cn(
                                          'flex items-center justify-start gap-2 py-2.5 pl-4 text-blue-6 hover:text-blue-5 active:text-blue-7 ',
                                          !openDrawer && 'hidden'
                                        )}
                                      >
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-3">
                                          <PlusIcon />
                                        </span>
                                        Add new
                                      </button>
                                    </Collapse>
                                    {openDrawer && (
                                      <div
                                        className={cn(
                                          'group/border my-2.5 h-px w-[190px] bg-[#d9d9d9] bg-opacity-60 last-of-type:hidden'
                                        )}
                                      ></div>
                                    )}
                                  </>
                                )}
                              </Draggable>
                            ) : (
                              <Link
                                href={item?.href}
                                className={cn(
                                  'group relative mr-2.5 flex h-10 items-center justify-between rounded-md px-5 py-2 text-base text-[#3f4648]',
                                  isActive
                                    ? 'before:top-2/5 bg-[#f0f6fb] text-primary '
                                    : 'text-gray-700 transition-colors duration-200 hover:bg-[#f7f7f7] hover:text-gray-900 dark:text-gray-700/90',
                                  !openDrawer && 'mr-0 justify-center px-0'
                                )}
                              >
                                <div className="flex items-center truncate">
{/*                                   {item?.icon && (
                                    <span
                                      className={cn(
                                        'me-3 inline-flex items-center justify-center rounded-md [&>svg]:h-[18px] [&>svg]:w-[18px]',
                                        isActive
                                          ? 'text-primary'
                                          : 'text-gray-800 dark:text-gray-500 dark:group-hover:text-gray-700',
                                        !openDrawer && 'mr-0'
                                      )}
                                    >
                                      {item?.icon}
                                    </span>
                                  )} */}
                                  <motion.span
                                    animate={{
                                      display: openDrawer ? 'block' : 'none',
                                      transition: { duration: 1 },
                                    }}
                                    className={cn('truncate text-sm')}
                                  >
                                    {item.name}
                                  </motion.span>
                                </div>
                                {/*                         {item?.badge?.length
                          ? getStatusBadge(item?.badge)
                          : null} */}
                              </Link>
                            )}
                          </>
                        ) : null}
{/*                         {item.separate && (
                          <div
                            className={cn(
                              'my-2.5 h-px w-[190px] bg-[#d9d9d9] bg-opacity-60 last-of-type:hidden',
                              !openDrawer && 'w-[45px]'
                            )}
                          ></div>
                        )} */}
                      </Fragment>
                    );
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </SimpleBar>
      <motion.div
        animate={{ opacity: openDrawer ? '1' : '0' }}
        className="flex max-w-full cursor-pointer gap-3 whitespace-nowrap border-t pb-6 pl-5 pt-4 hover:text-blue-6"
      >
        <button className="rounded-full bg-blue-6 text-white">
          <PlusIcon />
        </button>
        Add Section
      </motion.div>
    </motion.aside>
  );
}
