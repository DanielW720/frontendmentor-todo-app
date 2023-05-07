import React from "react";

export const CreateItem = () => {
  return (
    <div className="h-[3.5rem] mb-5 pl-4 dark:bg-veryDarkDesaturatedBlue rounded-md flex justify-start items-center">
      <button>
        <div className="h-6 w-6 bg-inherit rounded-full border-[1px] border-darkGrayishBlue"></div>
      </button>
      <p className="text-darkGrayishBlue ml-2">Create a new todo...</p>
    </div>
  );
};
