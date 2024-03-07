'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import X from '@/components/icons/x';
import Button from '@/app/(hydrogen)/shared/button';
import SelectColor from '@/app/(hydrogen)/shared/select-color';
import EditIcon from '@/components/icons/edit';
import DeleteIcon from '@/components/icons/delete';
import { colors } from '@/app/(hydrogen)/shared/colors';
import cn from '@/utils/class-names';
const SideSlider = dynamic(
  () => import('@/app/(hydrogen)/shared/side-slider'),
  {
    ssr: false,
  }
);

export default function LabelSlider({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [labels, setLabels] = useState([
    {
      id: '1',
      label: 'General',
      color: '#E81D62',
      inEdit: false,
      isError: false,
    },
    {
      id: '2',
      label: 'Private',
      color: '#FF784E',
      inEdit: false,
      isError: false,
    },
  ]);

  const handleCloseDrawer = () => {
    setIsOpen(false);
  };

  const handleLabelChange = (id: string, text: string) => {
    if (labels.some((item) => item.label === text) || text === '') {
      setLabels((prev) => {
        return prev.map((item) =>
          item.id === id ? { ...item, isError: true } : item
        );
      });
    }
    if (!labels.some((item) => item.label === text) && text !== '') {
      setLabels((prev) => {
        return prev.map((item) =>
          item.id === id ? { ...item, isError: false } : item
        );
      });
    }
    setLabels((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, label: text } : item
      );
    });
  };

  const handleColorChange = (color: string, id?: string) => {
    setLabels((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, color: color } : item
      );
    });
  };

  const handleDeleteLabe = (id: string) => {
    setLabels((prev) => prev.filter((item) => item.id !== id));
  };

  const handleInEdit = (id: string) => {
    setLabels((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, inEdit: true } : item
      );
    });
  };

  const handleSaveLabel = (id: string, label: string) => {
    if (labels.some((item) => item.isError)) {
      return;
    }
    setLabels((prev) => {
      return prev.map((item) =>
        item.id === id ? { ...item, inEdit: false } : item
      );
    });
  };

  const handleAddLabel = () => {
    setLabels((prev) => [
      {
        id: String(Math.floor(Math.random() * 100)),
        label: '',
        color: colors[Math.floor(Math.random() * 30)],
        inEdit: true,
        isError: false,
      },
      ...prev,
    ]);
  };

  return (
    <SideSlider isOpen={isOpen} onClose={handleCloseDrawer}>
      <div className="flex h-full flex-col ">
        <div className="flex min-h-max items-center gap-2 border-b border-gray-2 p-4 text-gray-6">
          <span onClick={handleCloseDrawer} className="cursor-pointer">
            <X />
          </span>
          <div className="flex items-center gap-1">Label</div>
          <Button
            onClick={handleAddLabel}
            variant="secondary"
            className="ml-auto"
            disabled={labels.some((item) => item.inEdit)}
          >
            Add Label
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-8">
          {labels.map((item) => (
            <div
              key={item.id}
              className="group mb-5 flex h-[60px] items-center justify-between rounded-xl border p-2"
            >
              <div className="flex items-center gap-2">
                {item.inEdit ? (
                  <SelectColor
                    id={item.id}
                    color={item.color}
                    setColor={handleColorChange}
                  />
                ) : (
                  <div
                    style={{ backgroundColor: item.color }}
                    className="h-5 w-5 rounded-full"
                  ></div>
                )}
                {item.inEdit ? (
                  <input
                    type="text"
                    defaultValue={item.label}
                    onChange={(e) => handleLabelChange(item.id, e.target.value)}
                    placeholder="type a text"
                    className={cn(
                      ' w-36 rounded-xl  border-gray-200 outline-none focus:outline-none focus:ring-transparent',
                      item.isError && 'border-red-600'
                    )}
                  />
                ) : (
                  item.label
                )}
                {!item.inEdit && (
                  <button
                    onClick={() => handleInEdit(item.id)}
                    className="hidden group-hover:block"
                  >
                    <EditIcon />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                {item.inEdit && (
                  <Button
                    variant="secondary"
                    onClick={() => handleSaveLabel(item.id, item.label)}
                  >
                    Save
                  </Button>
                )}
                <button onClick={() => handleDeleteLabe(item.id)}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>{' '}
    </SideSlider>
  );
}
