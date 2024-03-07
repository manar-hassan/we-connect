'use client';

import { Placement } from '@floating-ui/react';
import DropList from './drop-list';
import { AnimatePresence, motion } from 'framer-motion';

export default function TableActions({
  checkedItems,
  content,
  placement,
}: {
  checkedItems: any[];
  content: React.ReactNode;
  placement?: Placement;
}) {
  return (
    <AnimatePresence>
      {checkedItems.length > 0 && (
        <motion.div
          initial={{ x: -15, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -15, opacity: 0 }}
          className="flex items-center gap-3 whitespace-nowrap"
        >
          <DropList
            item="Actions"
            content={content}
            buttonClassName="rounded-full bg-blue-6 hover:bg-blue-7 active:bg-ble-8 text-white border-blue-6"
            panelClassName="p-1"
            placement={placement || 'bottom-start'}
          />
          <div>{checkedItems.length} Selected</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
