import { IoMdAddCircle } from "react-icons/io";
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
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "@/utils/taskActions";
import toast from "react-hot-toast";
import TaskStatAnimation from "@/animations/TaskStateAnimation.json";
import Lottie from "lottie-react";

const TaskStat: React.FC<{ totalTasks: number; completedTasks: number }> = ({
  totalTasks,
  completedTasks,
}) => {
  const [date, setDate] = useState<any>();
  const [taskTitle, setTaskTitle] = useState<string>("");
  const queryClient = useQueryClient();

  const newTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setTaskTitle("");
      setDate(undefined);
    },
    onError: () => {
      toast.error("Failed to create task");
    },
  });

  const handleSubmit = () => {
    if (!taskTitle || taskTitle.length < 3) {
      return toast.error("Task title should be more than 3 characters");
    }
    if (!date) {
      return toast.error("Due date is required");
    }

    newTaskMutation.mutate({ title: taskTitle, dueDate: date });
  };
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <Dialog>
        <DialogTrigger>
          {" "}
          <Card className="border-none min-h-[50px] gap-1 cursor-pointer h-full text-white gradient-2 rounded-[8px] text-xl flex items-center justify-center">
            <IoMdAddCircle />
            New Task
          </Card>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="mb-4">Add New Task</DialogTitle>
            <DialogDescription>
              <Label>Task Title</Label>
              <Input
                placeholder="Whatever you want to do"
                className="rounded-lg my-2 border-slate-300"
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Label>When should you be finished?</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start mt-2 border-slate-300 w-full text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto bg-white flex-col space-y-2 p-2">
                  <Select
                    onValueChange={(value) =>
                      setDate(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="bg-white">
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
                      selected={date}
                      onSelect={setDate}
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
                onClick={handleSubmit}
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

      <Card className="border-none h-[100px] text-white gradient rounded-[8px] text-xl flex items-center justify-center ">
        Completed {completedTasks}/{totalTasks} tasks
      </Card>
      <div className="hidden lg:block">
        <Lottie animationData={TaskStatAnimation} loop={true} />
      </div>
    </div>
  );
};
export default TaskStat;
