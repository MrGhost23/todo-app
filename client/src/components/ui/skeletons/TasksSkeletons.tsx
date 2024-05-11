import TaskSkeleton from "./TaskSkeleton";

type Props = {
  number: number;
};

const TasksSkeletons: React.FC<Props> = ({ number }) => {
  return (
    <div className="grid col-span-8 grid-cols-1 lg:grid-cols-3 gap-4">
      {Array.from({ length: number }).map((_, index) => (
        <TaskSkeleton key={index} />
      ))}
    </div>
  );
};

export default TasksSkeletons;
