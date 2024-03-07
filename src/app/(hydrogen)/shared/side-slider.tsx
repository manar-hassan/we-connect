'use client';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import ArrowDownSecIcon from '@/components/icons/arrow-down-sec';
import X from '@/components/icons/x';
import { Drawer } from 'rizzui';

export default function SideSlider({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      customSize="504px"
      
      containerClassName="!rounded-tr-none"
      overlayClassName="bg-modal-overlay"
    >
      {/* <div className="flex h-full flex-col ">
        <div className="flex min-h-max items-center gap-2 border-b border-gray-2 p-4 text-gray-6">
          <span onClick={onClose} className="cursor-pointer">
            <X />
          </span>
          <div className="flex items-center gap-1">
            {titleIcon ? titleIcon : null}
            {titleName}
          </div>
        </div>
        {children}
                 <div className="flex-1 overflow-auto p-8">{children}</div>
        <div className="flex items-center gap-3 border-t border-gray-2 p-4">
          <Button disabled={}>Done</Button>
          <button onClick={onClose} className="cursor-pointer text-gray-6">
            Cancel
          </button>
        </div> 
      </div> */}
      {children}
    </Drawer>
  );
}
