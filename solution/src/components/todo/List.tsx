import { Item } from "./Item";
import { useState } from "react";

const List = () => {
  const [filter, setFilter] = useState("All");

  const filterItems = (newFilter: string) => {
    setFilter(newFilter);
  };

  return (
    <div className=" mr-8 ml-8 relative bottom-24">
      {/* // Create a new todo... */}
      <div className="h-[3.5rem] mb-5 pl-4 dark:bg-veryDarkDesaturatedBlue rounded-md flex justify-start items-center">
        <button>
          <div className="h-6 w-6 bg-inherit rounded-full border-[1px] border-darkGrayishBlue"></div>
        </button>
        <p className="text-darkGrayishBlue ml-2">Create a new todo...</p>
      </div>

      <div className="rounded-md overflow-hidden shadow-3lg-black">
        {/* // List of items */}
        <div className="max-h-[250px] overflow-scroll ">
          {data.items.map((item, idx) => {
            return <Item key={idx} item={item} />;
          })}
        </div>
        {/* // Clear completed button */}
        <div className="min-h-[3rem] dark:bg-veryDarkDesaturatedBlue text-darkGrayishBlue text-sm flex justify-between items-center pl-4 pr-4">
          <p>3 Items left</p>
          <button>Clear Completed</button>
        </div>
      </div>

      {/* // Filter options */}
      <div className="min-h-[3rem] mt-5 mb-8 pr-10 pl-10 w-full text-darkGrayishBlue font-bold dark:bg-veryDarkDesaturatedBlue rounded-md flex items-center justify-around">
        {["All", "Active", "Completed"].map((filterOption, idx) => {
          return (
            <button
              key={idx}
              className={`${filterOption === filter && "text-brightBlue"}`}
              onClick={() => filterItems(filterOption)}
            >
              {filterOption}
            </button>
          );
        })}
      </div>

      {/* // Drag and drop to reorder list */}
      <p className="text-darkGrayishBlue text-center">
        Drag and drop to reorder list
      </p>
    </div>
  );
};

export default List;

const data = {
  items: [
    {
      text: "Complete online JavaScript course",
      status: "completed",
    },
    {
      text: "Jog around the park 3x",
      status: "active",
    },
    {
      text: "10 minutes meditation",
      status: "active",
    },
  ],
};
