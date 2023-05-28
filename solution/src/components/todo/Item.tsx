import iconCross from "../../assets/images/icon-cross.svg";
import iconCheck from "../../assets/images/icon-check.svg";
import { useState } from "react";

export const Item = ({
  item,
  onStatusChangeHandler,
  onRemoveItemHandler,
  onUpdateItemTitleHandler,
}: {
  item: { id: string; title: string; isActive: boolean };
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
    <div className="min-h-[3rem] border-veryDarkGrayishBlue border-b-[1px] bg-veryLightGray dark:bg-veryDarkDesaturatedBlue flex justify-between items-center pl-4 pr-4">
      <div className="w-full flex items-center">
        <button onClick={() => onStatusChangeHandler(item.id)}>
          <div className="hover:bg-gradient-to-br from-headerLeft to-headerRight rounded-full bg-lightGrayishBlue dark:bg-darkGrayishBlue p-[1px] flex items-center justify-center">
            <div
              className={`h-[23px] w-[23px] flex items-center justify-center rounded-full ${
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
          className={`w-full pr-1 ml-2 text-xs md:text-[0.9rem] font-bold bg-inherit cursor-pointer outline-none ${
            item.isActive
              ? "text-darkGrayishBlue dark:text-lightGrayishBlue "
              : "dark:text-darkGrayishBlue line-through"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => onKeyDownHandler(e)}
        />
      </div>
      <button onClick={() => onRemoveItemHandler(item.id)}>
        <img src={iconCross} alt="Cross icon" width="75%" />
      </button>
    </div>
  );
};
