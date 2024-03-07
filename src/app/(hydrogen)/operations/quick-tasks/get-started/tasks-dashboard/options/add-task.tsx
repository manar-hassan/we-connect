import React, { useState } from 'react';
import dynamic from 'next/dynamic';

export default function AddTask({ openSingleTask }: { openSingleTask: () => void }) {
  return (
    <div className="flex flex-col items-start p-1">
      <div
        onClick={openSingleTask}
        className="w-full cursor-pointer rounded-xl p-2  text-left capitalize text-primary transition duration-100 hover:bg-gray-1"
      >
        Add single task
      </div>
      <div className="w-full cursor-pointer rounded-xl p-2 text-left capitalize text-primary transition duration-100 hover:bg-gray-1">
        Add multiple tasks
      </div>
    </div>
  );
}
