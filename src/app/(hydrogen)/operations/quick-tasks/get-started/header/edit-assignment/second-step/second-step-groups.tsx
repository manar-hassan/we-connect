import Search from '@/app/(hydrogen)/shared/search';
import RightIconSec from '@/components/icons/right-sec';
import plus from '@public/quick-tasks/gray_encircled_plus.png';
import minus from '@public/quick-tasks/gray_encircled_minus.png';
import cn from '@/utils/class-names';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function SecondStepGroups({
  getValues,
  setValue,
  setDisableNext,
}: any) {
  const [collapseAll, setCollapseAll] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [allUsers, setAllUsers] = useState({
    name: 'all users group',
    isSelected: false,
  });

  const [groups, setGroups] = useState([
    {
      name: 'General groups',
      list: [
        {
          name: 'All admins group',
          isSelected: false,
        },
      ],
      color: '#6EA9D8',
      collapse: false,
    },
    {
      name: 'Groups by location',
      list: [],
      color: '#A0C8F6',
      collapse: false,
    },
    {
      name: 'Groups by departments',
      list: [],
      color: '#B9E987',
      collapse: false,
    },
  ]);

  const handleToggleAllUsers = () => {
    setGroups((prev) => {
      return prev.map((group) => {
        const { list } = group;
        return {
          ...group,
          list: list.map((listItem) => ({ ...listItem, isSelected: false })),
        };
      });
    });
    setAllUsers((prev) => ({ ...prev, isSelected: !prev.isSelected }));
  };

  const handleCollapseAllGroups = () => {
    setGroups((prev) =>
      prev.map((item) => ({ ...item, collapse: !collapseAll }))
    );
    setCollapseAll(!collapseAll);
  };

  const handleCollapseGroup = (index: number) => {
    setGroups((prev) => {
      return prev.map((item, i: number) => {
        if (i === index) {
          return { ...item, collapse: !item.collapse };
        } else {
          return item;
        }
      });
    });
  };

  const handleToggleGroupItem = (groupIndex: number, listIndex: number) => {
    if (allUsers.isSelected) {
      setAllUsers((prev) => ({ ...prev, isSelected: false }));
    }
    setGroups((prev) => {
      return prev.map((group, index: number) => {
        if (index === groupIndex) {
          const { list } = group;
          return {
            ...group,
            list: list.map((listItem, listI) => {
              if (listIndex === listI) {
                return { ...listItem, isSelected: !listItem.isSelected };
              } else {
                return listItem;
              }
            }),
          };
        } else {
          return group;
        }
      });
    });
  };

  const handleToggleGroup = (groupIndex: number) => {
    if (allUsers.isSelected) {
      setAllUsers((prev) => ({ ...prev, isSelected: false }));
    }
    const flag = groups[groupIndex].list.some(
      (item) => item.isSelected === false
    );
    setGroups((prev) => {
      return prev.map((group, index) => {
        if (index === groupIndex) {
          const { list } = group;
          return {
            ...group,
            list: list.map((listItem) => ({ ...listItem, isSelected: flag })),
          };
        } else {
          return group;
        }
      });
    });
  };

  const filterGroups = () => {
    if (filterText) {
      return groups.map((group) => {
        const { list } = group;
        return {
          ...group,
          list: list.filter((item) => item.name.includes(filterText)),
        };
      });
    }
    return groups;
  };

  const getSelected = () => {
    let selected: number = 0;
    groups.map((group) => {
      const { list } = group;
      selected += list.filter((item) => item.isSelected === true).length;
    });
    return selected;
  };

  useEffect(() => {
    const defaultValue = getValues('smartGroups');
    if (defaultValue.includes(allUsers.name)) {
      setAllUsers((prev) => ({ ...prev, isSelected: true }));
      return;
    }
    setGroups((prev) => {
      return prev.map((group) => {
        const { list } = group;
        return {
          ...group,
          list: list.map((listItem) => {
            return {
              ...listItem,
              isSelected: defaultValue.includes(listItem.name),
            };
          }),
        };
      });
    });
  }, []);

  useEffect(() => {
    if (allUsers.isSelected) {
      setValue('smartGroups', [allUsers.name]);
      setDisableNext(false);
    } else {
      const values: string[] = [];
      groups.map((group) => {
        const { list } = group;
        list.map((listItem) => {
          if (listItem.isSelected) {
            values.push(listItem.name);
          }
        });
      });
      if (values.length > 0) {
        setValue('smartGroups', values);
        setDisableNext(false);
      } else {
        setValue('smartGroups', []);
        setDisableNext(true);
      }
    }
  }, [groups, allUsers]);

  return (
    <div className="mt-8 w-[600px]">
      <div
        onClick={handleToggleAllUsers}
        className={cn(
          'mb-7 flex h-[50px] cursor-pointer items-center justify-between rounded-lg border pl-5 pr-3 shadow-sm',
          allUsers.isSelected &&
            'border-blue-6 !shadow-[0_12px_23px_-6px_rgba(41,151,255,.22)]'
        )}
      >
        <div className={cn('text-base', allUsers.isSelected && 'text-blue-6')}>
          All users group
        </div>
        <div
          className={cn(
            'h-7 w-7 rounded-full border',
            allUsers.isSelected &&
              'flex items-center justify-center border-blue-6 bg-blue-6'
          )}
        >
          <RightIconSec />
        </div>
      </div>
      <div className="relative mb-7 w-full border-t">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3">
          <span className="opacity-50">Or select specific groups</span>
        </div>
      </div>
      <div className="flex flex-col ">
        <div className="mb-5 grid grid-cols-3 items-center">
          <div
            onClick={handleCollapseAllGroups}
            className="flex cursor-pointer items-center gap-2 justify-self-start"
          >
            {collapseAll ? (
              <Image src={plus} alt="minus" width={15} height={15} />
            ) : (
              <Image src={minus} alt="minus" width={15} height={15} />
            )}{' '}
            Collapse All
          </div>
          <div className="justify-self-start font-bold">
            {' '}
            {getSelected()} Selected
          </div>
          <div className="justify-self-end">
            <Search text={filterText} setText={setFilterText} />
          </div>
        </div>
        {filterGroups().map((group, groupIndex) => (
          <motion.div
            animate={{ marginBottom: group.collapse ? '0' : '20px' }}
            initial={false}
            key={groupIndex}
            className="flex flex-col bg-white "
          >
            <div className="mb-2 flex items-center justify-between ">
              <div
                style={{ color: group.color }}
                className="group flex items-center text-base"
              >
                <motion.div
                  onClick={() => handleCollapseGroup(groupIndex)}
                  className="cursor-pointer opacity-0 transition-all duration-200 group-hover:mr-2 group-hover:opacity-100 "
                >
                  {group.collapse ? (
                    <Image src={plus} alt="minus" width={15} height={15} />
                  ) : (
                    <Image src={minus} alt="minus" width={15} height={15} />
                  )}
                </motion.div>
                <div className="-ml-[15px] flex items-center text-base transition duration-200 group-hover:ml-0">
                  <div
                    style={{ backgroundColor: group.color }}
                    className="mr-2 h-4 w-4 rounded-full"
                  ></div>
                  {group.name}
                </div>
              </div>
              {group.list.length > 0 && group.collapse === false && (
                <button
                  onClick={() => handleToggleGroup(groupIndex)}
                  className="text-base text-blue-6"
                >
                  {group.list.some((item) => item.isSelected === false)
                    ? 'Select all'
                    : 'Deselect all'}
                </button>
              )}
            </div>
            {group.list.length > 0 ? (
              group.list.map((item, listIndex) => (
                <motion.div
                  animate={{
                    height: group.collapse ? '0' : '50px',
                    marginBottom: group.collapse ? '0' : '8px',
                  }}
                  initial={false}
                  key={listIndex}
                  className="overflow-hidden "
                  onClick={() => handleToggleGroupItem(groupIndex, listIndex)}
                >
                  <div
                    className={cn(
                      ' flex h-[50px]  cursor-pointer items-center justify-between rounded-lg border pl-5 pr-3 shadow-sm',
                      item.isSelected &&
                        'border-blue-6 !shadow-[0_12px_23px_-6px_rgba(41,151,255,.22)]'
                    )}
                  >
                    <div className={cn(item.isSelected && 'text-blue-6')}>
                      {item.name}
                    </div>
                    <div
                      className={cn(
                        'h-7 w-7 rounded-full border',
                        item.isSelected &&
                          'flex items-center justify-center border-blue-6 bg-blue-6'
                      )}
                    >
                      <RightIconSec />
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                animate={{
                  height: group.collapse ? '0' : '50px',
                }}
                initial={false}
                key={groupIndex}
                className="overflow-hidden"
              >
                <div
                  className={cn(
                    'flex h-[50px] items-center justify-between rounded-lg border bg-[#f8f8f8] pl-5 pr-3 text-secondary'
                  )}
                >
                  <div>No groups under this segment</div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
