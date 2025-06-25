import React, { useState } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "@/components/taskCard";
import { FaGripVertical } from "react-icons/fa";

function SortableTask({ task, listeners, attributes, refEl, style, isDragging }) {
  return (
    <div
      ref={refEl}
      style={{ ...style, opacity: isDragging ? 0.7 : 1 }}
      tabIndex={0}
      className="flex items-center"
      {...attributes}
      {...listeners}
    >
      <span
        className="flex items-center mr-2 cursor-grab active:cursor-grabbing"
        title="Mover"
        onClick={e => e.stopPropagation()}
      >
        <FaGripVertical className="text-white" />
      </span>
      <TaskCard task={task} />
    </div>
  );
}

function SortableItem({ task, id }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <SortableTask
      task={task}
      listeners={listeners}
      attributes={attributes}
      refEl={setNodeRef}
      style={style}
      isDragging={isDragging}
    />
  );
}

const TaskListDndKit = ({ tasks }) => {
  const [items, setItems] = useState(tasks);
  const [isReordering, setIsReordering] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    
    const oldIndex = items.findIndex(t => t.id === active.id);
    const newIndex = items.findIndex(t => t.id === over.id);
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    
    // Actualizar el orden en la base de datos
    setIsReordering(true);
    try {
      const res = await fetch("/api/tasks/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: newItems.map((task, idx) => ({ id: task.id, order: idx })),
        }),
      });
      
      if (!res.ok) {
        throw new Error("Error al actualizar el orden");
      }
    } catch (e) {
      console.error("[TaskListDndKit] Error al actualizar el orden:", e);
      // Revertir el orden si hay error
      setItems(tasks);
    } finally {
      setIsReordering(false);
    }
  };

  return (
    <div className="relative">
      {isReordering && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50 rounded-lg">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
            <span className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-700 font-medium">Actualizando orden...</span>
          </div>
        </div>
      )}
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 gap-y-6 items-stretch justify-center px-2">
            {items.map((task) => (
              <SortableItem key={task.id} id={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TaskListDndKit; 