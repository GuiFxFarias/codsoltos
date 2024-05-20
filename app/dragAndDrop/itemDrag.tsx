import { Draggable } from "@hello-pangea/dnd";

interface TaskProps {
  task: {
    id: string;
    product: string;
    index: number;
    ownerGroup: boolean;
    produtosNoGrupo: [string];
    pertenceEmGrupo: boolean;
  };
  index: number;
}

export function Task({ task, index }: TaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <>
          <div
            className={
              task.ownerGroup == true
                ? "w-full bg-zinc-400 mb-2 last:mb-0 px-2 py-3 rounded flex justify-between "
                : "w-full bg-zinc-300 mb-2 last:mb-0 px-2 py-3 rounded flex justify-between "
            }
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <p className="font-medium">{task.product}</p>
          </div>
        </>
      )}
    </Draggable>
  );
}

{
  /* <Group
  size={30}
  className="hover:bg-zinc-500 transition-all rounded p-1"
  onClick={() => createGroup(task)}
/> */
}
