import Button from '@/app/(hydrogen)/shared/button';
import X from '@/components/icons/x';
import cn from '@/utils/class-names';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Drawer } from 'rizzui';
import { icons } from './icons-array';
import QuestionMarkTooltip from '@/app/(hydrogen)/shared/qestion-mark-tooltip';
import RightIcon from '@/components/icons/right-icon';
import Type from './type';
//@ts-ignore
import { v4 as uuidv4 } from 'uuid';
import Icons from './icons';
import { IItem } from './shift-attachments';
import EditIcon from '@/components/icons/edit';
import DropdownList from './dropdown-list';

export default function DrawerSlider({
  isOpen,
  onClose,
  getValues,
  setValue,
  isEdit,
  instanceItem,
}: {
  isEdit: boolean;
  isOpen: boolean;
  onClose: () => void;
  getValues: any;
  setValue: any;
  instanceItem: IItem;
}) {
  const uniqueId = uuidv4();
  const [nameError, setNameError] = useState(false);

  const [newItem, setNewItem] = useState(
    isEdit
      ? instanceItem
      : {
          isChecked: false,
          icon: 'write',
          text: '',
          type: 'Text box',
          shortCode: '',
          id: uniqueId,
          list: [],
        }
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => {
      setNameError(false);
      setNewItem(
        isEdit
          ? instanceItem
          : {
              isChecked: false,
              icon: 'write',
              text: '',
              type: 'Text box',
              shortCode: '',
              id: uniqueId,
              list: [],
            }
      );
    }, 100);
  }, [isOpen]);

  const handleChangeText = (e: { target: HTMLInputElement }) => {
    setNameError(false);
    setNewItem((old) => ({
      ...old,
      text: e.target.value,
    }));
  };

  const handleCheckedBox = (e: { target: HTMLInputElement }) => {
    setNewItem((old) => ({
      ...old,
      isChecked: e.target.checked,
    }));
  };

  const handleChangeCode = (e: { target: HTMLInputElement }) => {
    setNewItem((old) => ({
      ...old,
      shortCode: e.target.value,
    }));
  };

  const addNewItem = () => {
    if (newItem.text === '') {
      setNameError(true);
    }
    if (nameError === false && newItem.text !== '') {
      const oldItems = getValues('attachments');
      if (isEdit === true) {
        const indexItem = oldItems.findIndex(
          (ele: any) => ele.id === newItem.id
        );
        setValue(`attachments[${indexItem}]`, newItem);
      } else {
        const id = uuidv4();
        setValue('attachments', [...oldItems, newItem]);
        setNewItem({
          isChecked: false,
          icon: 'write',
          text: '',
          type: 'Text box',
          shortCode: '',
          id: id,
          list: [],
        });
      }
      onClose();
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      customSize="504px"
      containerClassName="!rounded-tr-none"
      overlayClassName="bg-modal-overlay"
    >
      <div className="flex h-full flex-col ">
        <div className="flex min-h-max items-center gap-2 border-b border-gray-2 p-4 text-gray-6">
          <span className="cursor-pointer" onClick={onClose}>
            <X />
          </span>
          <div className="flex items-center gap-1">
            {isEdit ? (
              <>
                <EditIcon />
                Edit attachment
              </>
            ) : (
              <>
                <Image
                  src={icons.plus}
                  alt="new attachment"
                  width={25}
                  height={25}
                />
                New attachment
              </>
            )}
          </div>
        </div>
        <div className="flex-1 overflow-auto p-8">
          <div className="mb-4 flex items-center gap-4">
            <label className="w-[118px] whitespace-nowrap" htmlFor="11">
              Attachment name
            </label>

            <div className="flex flex-1 flex-col">
              <input
                value={newItem.text}
                onChange={handleChangeText}
                onBlur={() => newItem.text === '' && setNameError(true)}
                type="text"
                className={cn(
                  'flex h-10 w-full items-center justify-between rounded-xl border border-gray-3 bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 focus:ring-transparent active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white',
                  nameError && 'border-red-600'
                )}
              />
              {nameError && (
                <p className="text-[10px] tracking-wider text-red-500">
                  Shift attachment name must not be empty
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 flex items-center gap-4">
            <div className="w-[118px]">Attachment type</div>
            <Type item={newItem} setItem={setNewItem} isEdit={isEdit} />
            <div>Icon</div>
            <Icons item={newItem} setItem={setNewItem} />
          </div>
          <div className="mb-4  flex items-center gap-4">
            <label
              className="flex w-[118px] items-center gap-2 whitespace-nowrap"
              htmlFor="12"
            >
              Short code{' '}
              <QuestionMarkTooltip text="The code provided can be used to reference this shift attachment in other software. ex:QuickBox online" />
            </label>
            <input
              value={newItem.shortCode}
              onChange={(e) => handleChangeCode(e)}
              type="text"
              className="flex h-10 w-[177px]  items-center justify-between rounded-xl border border-gray-3 bg-white px-4 transition duration-100 hover:bg-gray-1 focus:border-blue-6 focus:ring-transparent active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            />
          </div>
          <div className="relative flex items-center gap-3">
            <input
              onChange={(e) => handleCheckedBox(e)}
              checked={newItem.isChecked}
              type="checkbox"
              id="required"
              className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
            />
            <RightIcon inputId="required" className="top-1.5" />
            <label className="cursor-pointer" htmlFor="required">
              Required
            </label>
            <QuestionMarkTooltip text="Employees will be required to provide information for this attachment to clock out" />
          </div>
          {newItem.type === 'Dropdown list' && (
            //@ts-ignore
            <DropdownList setNewItem={setNewItem} itemList={newItem.list} />
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-gray-2 p-4">
          <Button
            disabled={
              newItem.text === '' ||
              (newItem.type === 'Dropdown list' &&
                newItem.list.some((el) => el.itemName === ''))
            }
            onClick={addNewItem}
          >
            Done
          </Button>
          <button onClick={onClose} className="cursor-pointer text-gray-6">
            Cancel
          </button>
        </div>
      </div>
    </Drawer>
  );
}
