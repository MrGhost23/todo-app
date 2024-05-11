import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TaskType } from "@/types/Task";
import { AiFillDelete } from "react-icons/ai";
import { Button } from "../ui/button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import dateFormatter from "@/utils/dateFormatter";
import { MdOutlineDateRange } from "react-icons/md";
import { BiSolidEdit } from "react-icons/bi";

const Task: React.FC<TaskType> = ({
  title,
  _id,
  dueDate,
  createdAt,
  isCompleted,
}) => {
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
          {
            <IoMdCheckmarkCircleOutline
              className={`absolute top-2 right-2 cursor-pointer ${
                isCompleted ? "text-green-500" : "text-gray-600"
              }`}
              size={24}
              onClick={() => {}}
            />
          }
          {title}
        </h2>
        <div className="mt-4 flex flex-col sm:flex-row flex-wrap justify-between sm:items-center gap-y-4">
          <span className="flex flex-row items-center gap-2">
            <MdOutlineDateRange className="shrink-0 text-lg" />
            <div className="flex flex-row flex-wrap items-center gap-1">
              {dateFormatter(dueDate)}
            </div>
          </span>
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2">
            {!isCompleted && <BiSolidEdit className="cursor-pointer" />}
            <AiFillDelete className="cursor-pointer" />
          </div>
        </div>
      </div>
    </Card>
  );
};
export default Task;
