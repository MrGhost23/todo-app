import { Card } from "@/components/ui/card";
import { TaskType } from "@/types/Task";
import { AiFillDelete } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import dateFormatter from "@/utils/dateFormatter";
import { MdOutlineDateRange } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";
import {
  deleteTask,
  toggleCompleteTask,
  updateTask,
} from "@/utils/taskActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

const Task: React.FC<TaskType> = ({ title, _id, dueDate, isCompleted }) => {
  const [updatedTitle, setUpdatedTitle] = useState<string>(title);
  const [updatedDueDate, setUpdatedDueDate] = useState<any>(dueDate);

  const queryClient = useQueryClient();

  const toggleCompleteMutation = useMutation({
    mutationFn: toggleCompleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Failed to update the task");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Failed to delete the task");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: () => {
      toast.error("Failed to update the task");
    },
  });

  const handleToggleComplete = () => toggleCompleteMutation.mutate(_id);
  const handleDeleteTask = () => deleteTaskMutation.mutate(_id);
  const handleUpdateTask = () => {
    updateTaskMutation.mutate({
      id: _id,
      title: updatedTitle,
      dueDate: updatedDueDate,
      isCompleted: isCompleted,
    });
  };

  return (
    <Card
      className={
        isCompleted
          ? "relative bg-green-500 bg-opacity-15 border-none"
          : "relative border-none"
      }
    >
      <div
        className={`group relative h-full  ${
          isCompleted ? "opacity-70 bg-green-200" : "bg-white"
        } rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-200 ease-in-out p-4`}
      >
        <h2
          className={`text-xl font-bold ${
            isCompleted == true && "line-through"
          }`}
        >
          <IoMdCheckmarkCircleOutline
            className={`absolute top-2 right-2 cursor-pointer ${
              isCompleted ? "text-green-500" : "text-gray-600"
            }`}
            size={24}
            onClick={handleToggleComplete}
          />
          <p className="lg:block hidden">
            {title.length > 20 ? `${title.substring(0, 20)}...` : title}{" "}
          </p>
          <p className="lg:hidden">
            {" "}
            {title.length > 18 ? `${title.substring(0, 26)}...` : title}{" "}
          </p>
        </h2>
        <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-between sm:items-center gap-y-4">
          <span className="flex flex-row items-center gap-2">
            <MdOutlineDateRange className="shrink-0 text-lg" />
            <div className="flex flex-row flex-wrap items-center gap-1">
              {dateFormatter(dueDate)}
            </div>
          </span>
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2">
            {!isCompleted && (
              <Dialog>
                <DialogTrigger>
                  <BiSolidEdit className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="bg-white">
                  <DialogHeader>
                    <DialogTitle className="mb-4">Update Your Task</DialogTitle>
                    <DialogDescription>
                      <Label>Task Title</Label>
                      <Input
                        placeholder="Whatever you want to do"
                        className="rounded-lg my-2 border-slate-300"
                        defaultValue={title}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                      />
                      <Label>When should you be finished?</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "justify-start mt-2 border-slate-300 w-full text-left font-normal",
                              !updatedDueDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {updatedDueDate ? (
                              format(updatedDueDate, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex w-auto bg-white flex-col space-y-2 p-2">
                          <Select
                            onValueChange={(value) =>
                              setUpdatedDueDate(
                                addDays(new Date(), parseInt(value))
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              className="bg-white"
                            >
                              <SelectItem className="cursor-pointer" value="0">
                                Today
                              </SelectItem>
                              <SelectItem className="cursor-pointer" value="1">
                                Tomorrow
                              </SelectItem>
                              <SelectItem className="cursor-pointer" value="3">
                                In 3 days
                              </SelectItem>
                              <SelectItem className="cursor-pointer" value="7">
                                In a week
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="rounded-md border">
                            <Calendar
                              mode="single"
                              selected={updatedDueDate}
                              onSelect={setUpdatedDueDate}
                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button
                        type="submit"
                        onClick={handleUpdateTask}
                        className="rounded-[8px] bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Create
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button>Cancel</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <AiFillDelete
              className="cursor-pointer"
              onClick={handleDeleteTask}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Task;
