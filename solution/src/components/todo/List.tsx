import { Item } from "./Item";
import { useEffect, useState } from "react";

type Todo = { id: number; title: string; isActive: boolean };
type TodoList = Todo[];

const defaultTodoList: TodoList = [];

const List = () => {
  const [items, setItems] = useState<TodoList>(defaultTodoList);
  const [filter, setFilter] = useState("All");

  // Fetch items on first render
  useEffect(() => {
    setItems(data.items);
  }, []);

  /**
   * Update the filter option.
   * @param filter The chosen filter
   */
  const onFilterChangeHandler = (filter: string) => {
    setFilter(filter);
  };

  /**
   * Update the status of an item with given id.
   * @param id Id of the item
   * @param status New status of the item
   */
  const onStatusChangeHandler = (id: number): void => {
    const item = items[id];
    item.isActive = !item.isActive;
    setItems([...items, item]);
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
          {items.map((item, idx) => {
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
          <p>{items.length} Items left</p>
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
      title: "Complete online JavaScript course",
      isActive: false,
    },
    {
      id: 1,
      title: "Jog around the park 3x",
      isActive: true,
    },
    {
      id: 2,
      title: "10 minutes meditation",
      isActive: true,
    },
    {
      id: 3,
      title: "Read for 1 hour",
      isActive: true,
    },
    {
      id: 4,
      title: "Pick up groceries",
      isActive: true,
    },
    {
      id: 5,
      title: "Complete Todo App on Frontend Mentor",
      isActive: true,
    },
  ],
};
