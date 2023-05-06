import { Item } from "./Item";
import { useState } from "react";

const List = () => {
  const [items, setItems] = useState(data.items);
  const [filter, setFilter] = useState("All");

  /**
   * Update the filter option.
   * @param newFilter The chosen filter
   */
  const onFilterChangeHandler = (newFilter: string) => {
    setFilter(newFilter);
  };

  /**
   * Update the status of an item with given id.
   * @param id Id of the item
   * @param status New status of the item
   */
  const onStatusChangeHandler = (id: number, status: string) => {
    // items[id].status = status;
    let item = items[id];
    item.status = status;
    setItems((prevItems) => [
      ...prevItems,
      item,
      { id: 10, status: "active", text: "tjo" },
    ]);
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
            return (
              <Item
                key={idx}
                item={item}
                onStatusChangeHandler={onStatusChangeHandler}
              />
            );
          })}
        </div>
        {/* // Clear completed button */}
        <div className="min-h-[3rem] dark:bg-veryDarkDesaturatedBlue text-darkGrayishBlue text-xs flex justify-between items-center pl-4 pr-4">
          <p>{data.items.length} Items left</p>
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
              onClick={() => onFilterChangeHandler(filterOption)}
            >
              {filterOption}
            </button>
          );
        })}
      </div>

      {/* // Drag and drop to reorder list */}
      <p className="text-darkGrayishBlue text-center text-sm">
        Drag and drop to reorder list
      </p>
    </div>
  );
};

export default List;

const data = {
  items: [
    {
      id: 0,
      text: "Complete online JavaScript course",
      status: "completed",
    },
    {
      id: 1,
      text: "Jog around the park 3x",
      status: "active",
    },
    {
      id: 2,
      text: "10 minutes meditation",
      status: "active",
    },
    // {
    //   id: 3,
    //   text: "Read for 1 hour",
    //   status: "active",
    // },
    // {
    //   id: 4,
    //   text: "Pick up groceries",
    //   status: "active",
    // },
    // {
    //   id: 5,
    //   text: "Complete Todo App on Frontend Mentor",
    //   status: "active",
    // },
  ],
};
