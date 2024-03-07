import Button from '@/app/(hydrogen)/shared/button';
import DeleteIcon from '@/components/icons/delete';
import PlaceholderTasks from '@/components/icons/placeholder-tasks';
import ReorderIcon from '@/components/icons/reorder';
import cn from '@/utils/class-names';
//@ts-ignore
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function SubTask({ subTasks, setSubTasks }: any) {
  const droppableHeight =  subTasks.length * 72;
  
  const handleInEdit = (id: number) => {
    setSubTasks((prev: any) => {
      return prev.map((task: any) => {
        if (task.id === id) {
          return { ...task, inEdit: true };
        } else {
          return task;
        }
      });
    });
  };

  const handleSaveEdits = (id: number) => {
    setSubTasks((prev: any) => {
      return prev.map((task: any) => {
        if (task.id === id) {
          return { ...task, inEdit: false };
        } else {
          return task;
        }
      });
    });
  };

  const handleChangeText = (e: any, id: number) => {
    setSubTasks((prev: any) => {
      return prev.map((task: any) => {
        if (task.id === id) {
          return { ...task, text: e.target.value };
        } else {
          return task;
        }
      });
    });
  };

  const handleDeleteItem = (id: number) => {
    setSubTasks((prev: any) => {
      return prev.filter((task: any) => task.id !== id);
    });
  };

  const handleAddSubtask = () => {
    setSubTasks((prev: any) => {
      return [
        ...prev,
        {
          text: '',
          inEdit: true,
          id: Math.random(),
        },
      ];
    });
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const newTasks = Array.from(subTasks);
    const [removed] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, removed);
    setSubTasks(newTasks);
  };

  return (
    <>
      {subTasks.length === 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <PlaceholderTasks />
          <h3>No Tasks to display</h3>
          <p className="w-[340px] text-center">
            Sub tasks are great way to let your users know what you expect them
            to do. If you want to add sub tasks, you need to edit the task
          </p>
          <Button variant="secondary">Add sub task</Button>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="task-list">
            {(provided: any) => (
              <div
                style={{ height: `${droppableHeight}px` }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {subTasks.map((subTask: any, index: string) => (
                  <Draggable
                    key={subTask.id}
                    draggableId={String(subTask.id)}
                    index={index}
                  >
                    {(provided: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="group mb-5 flex items-center gap-3 "
                      >
                        <div
                          onClick={() => handleInEdit(subTask.id)}
                          className={cn(
                            'flex grow cursor-pointer items-center justify-between rounded-xl border bg-white border-blue-6 px-3 shadow-[0_12px_23px_-6px_rgba(41,151,255,.22)]'
                          )}
                        >
                          <div
                            className={cn(
                              'flex min-h-[50px] w-full items-center text-base'
                            )}
                          >
                            {subTask.inEdit ? (
                              <input
                                type="text"
                                value={subTask.text}
                                onChange={(e) =>
                                  handleChangeText(e, subTask.id)
                                }
                                onBlur={() => handleSaveEdits(subTask.id)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSaveEdits(subTask.id);
                                  }
                                }}
                                autoFocus
                                className={cn(
                                  'text-baseA h-8 w-full rounded-lg border border-gray-3 bg-white px-[15px] py-0 leading-[32px] transition duration-100 hover:bg-gray-1 focus:border-gray-3 focus:ring-transparent active:bg-gray-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white'
                                )}
                              />
                            ) : (
                              <div className="relative">
                                <div
                                  {...provided.dragHandleProps}
                                  className="absolute -left-0.5 top-1/2 -translate-y-1/2 cursor-move"
                                >
                                  <ReorderIcon />
                                </div>
                                <button className="w-full px-4 text-left">
                                  {subTask.text}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          onClick={() => handleDeleteItem(subTask.id)}
                          className="cursor-pointer opacity-0 transition duration-100 group-hover:opacity-100"
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
      <Button onClick={handleAddSubtask} variant="secondary">
        Add sub task
      </Button>
    </>
  );
}
