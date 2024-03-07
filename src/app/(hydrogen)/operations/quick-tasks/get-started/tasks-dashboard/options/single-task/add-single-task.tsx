'use client';
import Button from '@/app/(hydrogen)/shared/button';
import SideSlider from '@/app/(hydrogen)/shared/side-slider';
import X from '@/components/icons/x';
import { Form } from '@/components/ui/form';
import { taskSchema, TaskFormType, defaultValues } from './types';
import { SubmitHandler } from 'react-hook-form';
import React, { useState } from 'react';
import SingleForm from './single-form';
import Separator from '@/app/(hydrogen)/shared/separator';
import cn from '@/utils/class-names';
import SubTask from './subTask';

const AddSingleTask = React.memo(
  ({
    isOpen,
    setIsOpen,
  }: {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const [subTasks, setSubTasks] = useState([
      {
        text: 'one text',
        inEdit: false,
        id: '0',
      },
      {
        text: 'two text',
        inEdit: false,
        id: '2',
      },
      {
        text: 'three text',
        inEdit: false,
        id: '3',
      },
    ]);
    const [openDetails, setOpenDetails] = useState(false);
    const [tap, setTap] = useState('task details');

    const handleCloseDrawer = () => {
      setIsOpen(false);
    };
    const onSubmit: SubmitHandler<TaskFormType> = (data) => {
      const nonEmptySubtasks = subTasks.filter(
        (subtask) => subtask.text !== ''
      );
      console.log(data);
      console.log(nonEmptySubtasks);
    };

    return (
      <SideSlider isOpen={isOpen} onClose={handleCloseDrawer}>
        <div className="flex h-full flex-col ">
          <div className="flex min-h-max items-center gap-2 border-b border-gray-2 p-4 text-gray-6">
            <span onClick={handleCloseDrawer} className="cursor-pointer">
              <X />
            </span>
            <div className="flex items-center gap-1">New task</div>
          </div>
          {openDetails && (
            <div className="flex flex-col">
              <div className="flex items-center text-lg font-normal">
                <p
                  onClick={() => setTap('task details')}
                  className={cn(
                    'cursor-pointer border-b-0 border-blue-6 p-3 font-normal transition duration-100 ',
                    tap === 'task details' && 'border-b-4 text-blue-6'
                  )}
                >
                  Task details
                </p>
                <p
                  onClick={() => setTap('subtasks')}
                  className={cn(
                    'cursor-pointer border-b-0 border-blue-6 p-3 font-normal transition duration-100 ',
                    tap === 'subtasks' && 'border-b-4 text-blue-6'
                  )}
                >
                  Sub tasks
                </p>
              </div>
              <Separator horizontal className="relative -z-10 -mt-px" />
            </div>
          )}
          <Form<TaskFormType>
            validationSchema={taskSchema}
            onSubmit={onSubmit}
            useFormProps={{
              mode: 'onChange',
              defaultValues,
            }}
            id="settings-form"
            className="flex flex-1 flex-col overflow-auto"
          >
            {({
              register,
              control,
              setValue,
              getValues,
              getFieldState,
              formState: { errors },
            }) => {
              return (
                <>
                  <div className="flex-1 overflow-auto p-8">
                    {tap === 'task details' ? (
                      <SingleForm
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        control={control}
                        openDetails={openDetails}
                        setOpenDetails={setOpenDetails}
                        getValues={getValues}
                        setTap={setTap}
                      />
                    ) : (
                      <SubTask subTasks={subTasks} setSubTasks={setSubTasks} />
                    )}
                  </div>
                  <div className="flex items-center gap-3 border-t border-gray-2 p-4">
                    <Button type="submit" variant="secondary">
                      Publish task
                    </Button>
                    <Button type="button">Save draft</Button>
                  </div>
                </>
              );
            }}
          </Form>
        </div>
      </SideSlider>
    );
  }
);
AddSingleTask.displayName = 'AddSingleTask';
export default AddSingleTask;
