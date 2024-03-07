import React, { useEffect, useState } from 'react';
import RemoveIcon from '@/components/icons/remove';
import RightIcon from '@/components/icons/right-icon';
import cn from '@/utils/class-names';
import Button from '@/app/(hydrogen)/shared/button';
import PlusIcon from '@/components/icons/plus';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

export interface IRow {
  isChecked: boolean;
  itemName: string;
  shortCode: string;
  id: string;
  inEdit: boolean;
}

export default function DropdownList({
  itemList,
  setNewItem,
}: {
  itemList: IRow;
  setNewItem: any;
}) {

  const id = uuidv4();
  const [list, setList] = useState<IRow[]>(
    //@ts-ignore
    itemList.length > 0
      ? itemList
      : [
          {
            isChecked: true,
            itemName: '',
            shortCode: '',
            id: id,
            inEdit: true,
          },
        ]
  );

  useEffect(() => {
    setNewItem((prev: any) => {
      return {
        ...prev,
        list: list,
      };
    });
  }, [list, setNewItem]);

  const handleRemoveRow = (item: IRow) => {
    const filteredList = list.filter((el) => el.id !== item.id);
    setList(filteredList);
  };

  const handleEditMode = (item: IRow) => {
    setList((prev) => {
      return prev.map((el) => {
        if (el.id === item.id) {
          return { ...el, inEdit: true };
        }
        return { ...el, inEdit: false };
      });
    });
  };

  const handleOnNameChange = (item: IRow, text: string) => {
    setList((prev) => {
      return prev.map((el) => {
        if (el.id === item.id) {
          return { ...el, itemName: text };
        }
        return el;
      });
    });
  };

  const handleEditedItem = (item: IRow) => {
    setList((prev) => {
      return prev.map((el) => {
        if (el.id === item.id) {
          return { ...el, inEdit: false };
        }
        return el;
      });
    });
  };

  const handleOnCodeChange = (item: IRow, text: string) => {
    setList((prev) => {
      return prev.map((el) => {
        if (el.id === item.id) {
          return { ...el, shortCode: text };
        }
        return el;
      });
    });
  };

  const addNewRow = () => {
    const uniqueId = uuidv4();

    setList((prev) => {
      return prev.map((el) => {
        return { ...el, inEdit: false };
      });
    });

    setList((prev) => {
      return [
        ...prev,
        {
          isChecked: true,
          itemName: '',
          shortCode: '',
          id: uniqueId,
          inEdit: true,
        },
      ];
    });
  };

  return (
    <div className="mt-4 ">
      <div className="-ml-8 h-px w-[calc(100%+64px)] bg-gray-2"></div>
      <div className=" grid grid-cols-[1fr_1fr_24px_22px] py-4">
        <div className="contents border-b border-gray-1">
          <div className="h-9 bg-gray-1 p-2">Name</div>
          <div className="h-9 bg-gray-1 p-2">Short code</div>
          <div className="h-9 bg-gray-1 p-2"></div>
          <div className="h-9 bg-gray-1 p-2"></div>
        </div>
        {list.map((item, index) => (
          <div key={item.id} className="contents">
            {item.inEdit ? (
              <div className="h-10 pr-4 pt-2">
                <input
                  type="text"
                  value={item.itemName}
                  onChange={(e) => handleOnNameChange(item, e.target.value)}
                  placeholder="Item name"
                  className={cn(
                    'flex h-full w-full items-center justify-between rounded-xl border border-gray-3 bg-white px-4 py-0 text-sm transition duration-100 placeholder:text-sm hover:bg-gray-1 focus:border-blue-6 focus:ring-transparent active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white'
                  )}
                />
              </div>
            ) : (
              <div className="h-10 border-b border-gray-1 pr-4 pt-2">
                <div className="relative flex items-center gap-2">
                  <input
                    type="checkbox"
                    defaultChecked={item.isChecked}
                    onChange={(e) =>
                      setList((prev) => {
                        const newList = [...prev];
                        newList[index] = {
                          ...newList[index],
                          isChecked: e.target.checked,
                        };
                        return newList;
                      })
                    }
                    id={item.itemName}
                    className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                  />
                  <RightIcon inputId={item.itemName} />
                  <label htmlFor={item.itemName}>{item.itemName}</label>
                </div>
              </div>
            )}

            {item.inEdit ? (
              <div className="h-10 pr-4 pt-2">
                <input
                  value={item.shortCode}
                  onChange={(e) => handleOnCodeChange(item, e.target.value)}
                  placeholder="Short code"
                  type="text"
                  className={cn(
                    'flex h-full w-full items-center justify-between rounded-xl border border-gray-3 bg-white px-4 py-0 text-sm transition duration-100 placeholder:text-sm hover:bg-gray-1 focus:border-blue-6 focus:ring-transparent active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white'
                  )}
                />
              </div>
            ) : (
              <div className="h-10 border-b border-gray-1 pr-4 pt-2">
                {item.shortCode}
              </div>
            )}

            {item.inEdit ? (
              <div className="flex items-center justify-center pt-2">
                <button
                  onClick={() => handleEditedItem(item)}
                  disabled={item.itemName === ''}
                  className={cn(
                    ' flex h-6 w-6 items-center justify-center rounded-full border border-blue-6 bg-blue-6 disabled:border-gray-3 disabled:bg-white '
                  )}
                >
                  <RightIcon
                    className={cn(
                      'relative left-0 cursor-default',
                      item.itemName !== '' && 'cursor-pointer'
                    )}
                    iconColor="#dbdee0"
                  />
                </button>
              </div>
            ) : (
              <div className="flex h-10 items-center border-b border-gray-1 ">
                <button
                  onClick={() => {
                    handleEditMode(item);
                  }}
                  className="text-[14px] text-blue-6 hover:text-blue-5"
                >
                  Edit
                </button>
              </div>
            )}

            <div
              className={cn(
                'relative -right-1 flex h-10 items-center justify-end border-b border-gray-1',
                item.inEdit && 'pt-2'
              )}
            >
              {list.length > 1 && (
                <button
                  onClick={() => {
                    handleRemoveRow(item);
                  }}
                >
                  <RemoveIcon />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        disabled={!!list.find((el) => el.itemName === '')}
        onClick={addNewRow}
      >
        <PlusIcon /> Add item
      </Button>
    </div>
  );
}
