import { CreateItem } from "./CreateItem";
import { Item } from "./Item";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

type Todo = { id: string; title: string; isActive: boolean };
type TodoList = Todo[];
const defaultTodoList: TodoList = [];

type Filter = "All" | "Active" | "Completed";
const defaultFilter: Filter = "All";

const List = () => {
  const [items, setItems] = useState<TodoList>(defaultTodoList);
  const [filter, setFilter] = useState<Filter>(defaultFilter);

  // Fetch items on first render
  useEffect(() => {
    setItems(data.items);
  }, []);

  /**
   * Update the filter option.
   * @param filter The chosen filter
   */
  const onFilterChangeHandler = (filter: Filter) => {
    setFilter(filter);
  };

  /**
   * Update the status of an item with given id.
   * @param id Id of the item
   */
  const onStatusChangeHandler = (id: string): void => {
    // New list of items
    const newItems = [...items];
    // Find index of item with given id
    const item = newItems.find((item) => item.id === id) as Todo;
    const idx = newItems.indexOf(item);
    // Update the isActive attribute of the item
    newItems[idx] = { ...newItems[idx], isActive: !items[idx].isActive };
    setItems(newItems);
  };

  /**
   * Submit a new todo item.
   * @param title of the new todo item
   */
  const onSubmitNewTodoHandler = (title: string) => {
    const newItems = [...items];
    newItems.unshift({
      id: v4(),
      title: title,
      isActive: true,
    });
    setItems(newItems);
  };

  return (
    <div className=" mr-8 ml-8 relative bottom-24">
      <CreateItem addTodo={onSubmitNewTodoHandler} />

      <div className="rounded-md overflow-hidden shadow-3lg-black">
        {/* // List of items */}
        <div className="max-h-[250px] overflow-scroll">
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
              onClick={() => onFilterChangeHandler(filterOption as Filter)}
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
      id: v4(),
      title: "Complete online JavaScript course",
      isActive: false,
    },
    {
      id: v4(),
      title: "Jog around the park 3x",
      isActive: true,
    },
    {
      id: v4(),
      title: "10 minutes meditation",
      isActive: true,
    },
    {
      id: v4(),
      title: "Read for 1 hour",
      isActive: true,
    },
    {
      id: v4(),
      title: "Pick up groceries",
      isActive: true,
    },
    {
      id: v4(),
      title: "Complete Todo App on Frontend Mentor",
      isActive: true,
    },
  ],
};
