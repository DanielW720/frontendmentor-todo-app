import iconCross from "../../assets/images/icon-cross.svg";
import iconCheck from "../../assets/images/icon-check.svg";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

export const Item = ({
  item,
  draggableIdx,
  onStatusChangeHandler,
  onRemoveItemHandler,
  onUpdateItemTitleHandler,
}: {
  item: { id: string; title: string; isActive: boolean };
  draggableIdx: number;
  onStatusChangeHandler: (id: string) => void;
  onRemoveItemHandler: (id: string) => void;
  onUpdateItemTitleHandler: (id: string, title: string) => void;
}) => {
  const [title, setTitle] = useState(item.title);

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Time to update title
      e.preventDefault();
      (e.target as HTMLInputElement).blur();
      onUpdateItemTitleHandler(item.id, title);
    }
  };

  return (
    // <Draggable draggableId={item.id} index={draggableIdx} key={item.id}>
    //   {(provided, _snapshot) => (
    //     <div ref={provided.innerRef} {...provided.draggableProps}>
    <div className="flex min-h-[3rem] items-center justify-between border-b-[1px] border-veryDarkGrayishBlue bg-veryLightGray pl-4 pr-4 dark:bg-veryDarkDesaturatedBlue">
      <div className="flex w-full items-center">
        <button onClick={() => onStatusChangeHandler(item.id)}>
          <div className="flex items-center justify-center rounded-full bg-lightGrayishBlue from-headerLeft to-headerRight p-[1px] hover:bg-gradient-to-br dark:bg-darkGrayishBlue">
            <div
              className={`flex h-[23px] w-[23px] items-center justify-center rounded-full ${
                item.isActive
                  ? "bg-veryLightGray dark:bg-veryDarkDesaturatedBlue"
                  : "bg-gradient-to-br from-headerLeft to-headerRight"
              } transition-all duration-500`}
            >
              <img
                src={iconCheck}
                alt="Checked icon"
                className={`${item.isActive ? "hidden" : "block"}`}
              />
            </div>
          </div>
        </button>
        <input
          className={`ml-2 w-full cursor-pointer bg-inherit pr-1 text-xs font-bold outline-none md:text-[0.9rem] ${
            item.isActive
              ? "text-darkGrayishBlue dark:text-lightGrayishBlue "
              : "line-through dark:text-darkGrayishBlue"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => onKeyDownHandler(e)}
        />
      </div>

      <span
        className="material-symbols-outlined mr-3"

        // {...provided.dragHandleProps}
      >
        drag_indicator
      </span>

      <button onClick={() => onRemoveItemHandler(item.id)}>
        <img src={iconCross} alt="Cross icon" width="75%" />
      </button>
    </div>
    //     </div>
    //   )}
    // </Draggable>
  );
};
