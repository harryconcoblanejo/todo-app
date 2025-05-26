"use client";
import { useRouter } from "next/navigation";

const TaskCard = ({ task }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/task/edit/${task.id}`);
  };

  return (
    <div
      key={task.id}
      className="bg-slate-900 p-3 border border-gray-700 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer max-w-full overflow-hidden"
      onClick={handleClick}
    >
      <h3 className="text-white font-bold text-2xl mb-2 truncate">
        {task.title}
      </h3>

      <p className="text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
        {task.description}
      </p>

      <p className="text-gray-400 mt-2">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default TaskCard;
