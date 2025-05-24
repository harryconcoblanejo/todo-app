"use client";
import { useRouter } from "next/navigation";

const taskCard = ({ task }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/task/edit/${task.id}`);
  };
  return (
    <div
      key={task.id}
      className="  bg-slate-900 p-3 border border-gray-700 rounded-lg
                 hover:bg-slate-800 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <h3 className="text-white font-bold text-2xl mb-2">{task.title}</h3>
      <p className="text-gray-400">{task.description}</p>
      <p className="text-gray-400">
        {new Date(task.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default taskCard;
