import Header from '@/layouts/hydrogen/header';
import Sidebar from '@/layouts/hydrogen/sidebar';
import cn from '@/utils/class-names';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function HydrogenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openDrawer, setOpenDrawer] = useState(true);
  return (
    <main className=" min-h-screen  bg-[#F5F5F5]">
      <Header />
      <Sidebar
        className="fixed"
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <motion.div
        animate={{
          marginLeft: openDrawer ? '200px' : '63px',
          width: openDrawer ? '100%-200px' : '100%-63px',
        }}
        className={cn('flex flex-col xl:ms-[200px] ')}
      >
        <div className="flex w-full flex-grow flex-col p-5 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>
      </motion.div>
    </main>
  );
}
