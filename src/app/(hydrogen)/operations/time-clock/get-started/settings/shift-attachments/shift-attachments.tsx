import RightIcon from '@/components/icons/right-icon';
import Image from 'next/image';
import React, { useState } from 'react';
import { icons } from './icons-array';
import RemoveIcon from '@/components/icons/remove';
import Button from '@/app/(hydrogen)/shared/button';
import PlusIcon from '@/components/icons/plus';
import { useWatch } from 'react-hook-form';
import QuestionMarkTooltip from '@/app/(hydrogen)/shared/qestion-mark-tooltip';
import DrawerSlider from './drawer';
import { AnimatePresence, motion } from 'framer-motion';

export interface IRow {
  isChecked: boolean;
  itemName: string;
  shortCode: string;
  id: string;
  inEdit: boolean;
}

export interface IItem {
  isChecked: boolean;
  icon: 'write' | 'plus' | 'customer' | 'list' | 'equipment' | 'mileage';
  text: string;
  id: string;
  type: string;
  shortCode: string;
  list: IRow[];
}

export default function ShiftAttachments({
  control,
  register,
  getValues,
  setValue,
}: {
  control: any;
  register: any;
  getValues: any;
  setValue: any;
}) {
  const [drawerState, setDrawerState] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [item, setItem] = useState<IItem>({
    isChecked: false,
    icon: 'write',
    text: '',
    type: 'Text box',
    shortCode: '',
    id: '',
    list: [],
  });


  const attachments = useWatch({
    control,
    name: 'attachments',
  });

  const deleteItem = (id: string) => {
    const allItems = getValues('attachments');
    const filtered = allItems.filter((el: IItem) => el.id !== id);
    setValue('attachments', filtered);
  };

  return (
    <div>
      <div className="mb-4">
        <p className="mb-2 font-bold">Shift attachments:</p>
        <p>
          Use shift attachments to add items such as equipment used, mileage
          covered, and more to a shift.
        </p>
      </div>
      <div className="mb-5 border-t border-gray-2">
        {attachments.map((item: IItem, index: number) => {
          return (
            <div
              key={item.id}
              className=" flex items-center gap-2 border-b border-gray-2 p-4"
            >
              <QuestionMarkTooltip text="select this checkbox in order to allow the employee to provide information for this shift attachment in the mobile application">
                <div className="relative">
                  <input
                    type="checkbox"
                    {...register(`attachments[${index}].isChecked`)}
                    id={item.id}
                    className="relative border border-[#b9b9b9] font-normal transition  duration-100 hover:cursor-pointer hover:bg-gray-1  focus:shadow-none focus:ring-transparent"
                  />
                  <RightIcon inputId={item.id} className="top-1.5" />
                </div>
              </QuestionMarkTooltip>
              <Image
                src={icons[item.icon]}
                alt="write"
                width={28}
                height={28}
              />
              <div className="flex-1">{item.text}</div>
              <button
                onClick={() => {
                  setItem(item);
                  setIsEdit(true);
                  setDrawerState(true);
                }}
                type="button"
                className="text-blue-6 hover:text-blue-5"
              >
                Edit
              </button>
              <button onClick={() => deleteItem(item.id)} type="button">
                <RemoveIcon />
              </button>
            </div>
          );
        })}
      </div>
      <Button onClick={() => setDrawerState(true)} className="pl-3">
        <PlusIcon /> Add attachment
      </Button>

      <DrawerSlider
        isOpen={drawerState}
        onClose={() => {
          setDrawerState(false);
          setIsEdit(false);
        }}
        getValues={getValues}
        setValue={setValue}
        isEdit={isEdit}
        instanceItem={item}
      />
    </div>
  );
}
