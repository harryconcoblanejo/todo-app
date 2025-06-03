"use client";
import { useState, useEffect, useRef } from "react";

import TaskCard from "@/components/taskCard";
import { FaGripVertical } from "react-icons/fa";

function hasValidIds(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return false;
  const ids = arr.map(t => t.id);
  const uniqueIds = new Set(ids);
  return ids.every(id => id !== undefined && id !== null) && uniqueIds.size === ids.length;
}

const TaskListDraggable = ({ tasks }) => {
  console.log("[TaskListDraggable] render", { tasks });
  const [items, setItems] = useState(() => JSON.parse(JSON.stringify(tasks || [])));
  const prevIdsRef = useRef((tasks || []).map(t => t.id).join(","));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Solo sincroniza items con tasks si los ids han cambiado (agregado/eliminado)
  useEffect(() => {
    if (!Array.isArray(tasks)) {
      // If tasks prop becomes non-array (e.g., null, undefined after being an array)
      // Reset items and prevIdsRef to a clean state.
      setItems([]);
      prevIdsRef.current = ""; // Represents an empty list of IDs
      return;
    }

    // tasks is an array here
    const newIds = tasks.map(t => t.id).join(",");
    if (newIds !== prevIdsRef.current) {
      setItems(JSON.parse(JSON.stringify(tasks)));
      prevIdsRef.current = newIds;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  const onDragEnd = async (result) => {
    console.log("[TaskListDraggable] onDragEnd", { result, items });
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
    // Actualizar el orden en la base de datos
    try {
      await fetch("/api/tasks/order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tasks: newItems.map((task, idx) => ({ id: task.id, order: idx })),
        }),
      });
      console.log("[TaskListDraggable] Orden actualizado en backend", newItems);
    } catch (e) {
      console.error("[TaskListDraggable] Error al actualizar el orden:", e);
    }
  };

  console.log("ITEMS EN EL CLIENTE", items.map(t => t.id));

  if (!isClient || !hasValidIds(items)) {
    return <div>Cargando tareas...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="task-list"
        isDropDisabled={false}
        isCombineEnabled={false}
        ignoreContainerClipping={false}
      >
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid sm:grid-cols-1 md:grid-cols-3 gap-3 items-center justify-center"
          >
            {items.map((task, index) => {
              console.log("[TaskListDraggable] Render Draggable", { task, index });
              return (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      tabIndex={0}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.7 : 1,
                      }}
                    >
                      {/* Drag handle visual debe estar fuera de TaskCard para evitar problemas de contexto */}
                      <span
                        {...provided.dragHandleProps}
                        className="flex items-center mr-2 cursor-grab active:cursor-grabbing"
                        title="Mover"
                         onClick={(e) => e.stopPropagation()}
                      >
                        <FaGripVertical className="text-white" />
                    
                      </span>
                     
                      <TaskCard task={task} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskListDraggable;
