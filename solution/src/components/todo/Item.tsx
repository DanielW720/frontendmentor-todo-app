import React from "react";
import iconCross from "../../assets/images/icon-cross.svg";
import iconCheck from "../../assets/images/icon-check.svg";

export const Item = ({ item }: { item: { text: string; status: string } }) => {
  const isCompleted = item.status === "completed";

  return (
    <div className="min-h-[3.5rem] border-veryDarkGrayishBlue border-b-[1px] dark:bg-veryDarkDesaturatedBlue flex justify-between items-center pl-4 pr-4 ">
      <div className="flex items-center">
        <button>
          {isCompleted ? (
            <div className="h-6 w-6 bg-gradient-to-br from-headerLeft to-headerRight flex items-center justify-center bg-inherit rounded-full border-[1px] border-darkGrayishBlue">
              <img src={iconCheck} />
            </div>
          ) : (
            <div className="h-6 w-6 flex items-center justify-center bg-inherit rounded-full border-[1px] border-darkGrayishBlue"></div>
          )}
        </button>
        <p
          className={`ml-2 text-xs ${
            isCompleted && "text-darkGrayishBlue line-through"
          }`}
        >
          {item.text}
        </p>
      </div>
      <button>
        <img src={iconCross} alt="Cross icon" width="75%" />
      </button>
    </div>
  );
};
