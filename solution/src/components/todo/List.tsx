import { CreateItem } from "./CreateItem";
import { Item } from "./Item";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import imageSun from "../../assets/images/icon-sun.svg";
import imageMoon from "../../assets/images/icon-moon.svg";
import { FilterOptions } from "./FilterOptions";
import { TodoList, Filter, Todo } from "./types";

const defaultTodoList: TodoList = [];
const defaultFilter: Filter = "All";

const List = ({
  updateTheme,
  isDarkTheme,
}: {
  updateTheme: any;
  isDarkTheme: boolean;
}) => {
  const [items, setItems] = useState<TodoList>(defaultTodoList);
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const itemsLeft = items.filter((item) => item.isActive).length;

  // Fetch items on first render
  useEffect(() => {
    setItems(data.items);
  }, []);

  /**
   * Find index of item with given id.
   * @param id Id of the item
   * @returns The index of the item in the items list
   */
  function findIndexOf(id: string): number {
    const item = items.find((item) => item.id === id) as Todo;
    return items.indexOf(item);
  }

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
    const newItems = [...items];
    const idx = findIndexOf(id);
    newItems[idx] = { ...newItems[idx], isActive: !items[idx].isActive };
    setItems(newItems);
  };

  /**
   * Submit a new todo item.
   * @param title Title of the new todo item
   */
  const onSubmitNewTodoHandler = (title: string) => {
    const newItems = [
      {
        id: v4(),
        title: title,
        isActive: true,
      },
      ...items,
    ];
    setItems(newItems);
  };

  /**
   * Remove item from item list.
   * @param id id of the item
   */
  const onRemoveItemHandler = (id: string): void => {
    const idx = findIndexOf(id);
    const newItems = [...items];
    newItems.splice(idx, 1);
    setItems(newItems);
  };

  /**
   * Filter item list on chosen filter.
   * @returns A filtered list of the items
   */
  const getFilteredItemList = () => {
    switch (filter) {
      case "Active":
        return items.filter((item) => item.isActive);
      case "Completed":
        return items.filter((item) => !item.isActive);
      default:
        return items;
    }
  };

  /**
   * Delete completed items.
   */
  const deleteCompletedItems = () => {
    const newList = items.filter((item) => item.isActive);
    setItems(newList);
  };

  const titleAndThemeSwitchMarkup = (
    <div className="pt-12 w-full flex justify-between items-start">
      <h1 className="text-white tracking-[0.7rem] text-3xl relative z-10 font-bold">
        TODO
      </h1>
      <button onClick={updateTheme}>
        {
          <img
            src={isDarkTheme ? imageSun : imageMoon}
            alt="Sun icon"
            className="relative z-10"
          />
        }
      </button>
    </div>
  );

  const onUpdateItemHandler = (id: string, title: string) => {
    const item = items.find((item) => item.id === id) as Todo;
    item.title = title;
    // Replace the item in the list
    const newList = items.map(
      (obj) => items.find((o) => o.id === obj.id) || obj
    );
    // Update the items with the new list
    setItems(newList);
  };

  return (
    <div className="relative pl-6 pr-6 bottom-52 w-full max-w-lg">
      {titleAndThemeSwitchMarkup}

      <CreateItem addTodo={onSubmitNewTodoHandler} />

      <div className="rounded-md w-full overflow-hidden shadow-3lg-light dark:shadow-3lg-dark">
        {/* // List of items */}
        <div className="max-h-[290px] md:max-h-[400px] overflow-y-scroll no-scrollbar">
          {getFilteredItemList().map((item, idx) => {
            return (
              <Item
                key={idx}
                item={item}
                onStatusChangeHandler={onStatusChangeHandler}
                onRemoveItemHandler={onRemoveItemHandler}
                onUpdateItemHandler={onUpdateItemHandler}
              />
            );
          })}
        </div>

        {/* // Clear completed button */}
        <div className="h-[2.5rem] bg-veryLightGray dark:bg-veryDarkDesaturatedBlue text-veryDarkGrayishBlueLightTheme dark:text-darkGrayishBlue text-xs flex justify-between items-center pl-4 pr-4">
          <p>{itemsLeft} Items left</p>
          <div className="hidden md:block">
            <FilterOptions
              onFilterChangeHandler={onFilterChangeHandler}
              filter={filter}
            />
          </div>
          <button
            onClick={deleteCompletedItems}
            className="cursor-pointer hover:font-bold hover:text-veryDarkGrayishBlueLightTheme dark:hover:text-lightGrayishBlue"
          >
            Clear Completed
          </button>
        </div>
      </div>
      <div className="h-[3rem] md:hidden mt-6 shadow-3lg-light dark:shadow-3lg-dark">
        <FilterOptions
          onFilterChangeHandler={onFilterChangeHandler}
          filter={filter}
        />
      </div>
      <p className="text-darkGrayishBlue text-center text-sm mt-10">
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
    // {
    //   id: v4(),
    //   title: "10 minutes meditation",
    //   isActive: true,
    // },
    // {
    //   id: v4(),
    //   title: "Read for 1 hour",
    //   isActive: true,
    // },
    // {
    //   id: v4(),
    //   title: "Pick up groceries",
    //   isActive: true,
    // },
    // {
    //   id: v4(),
    //   title: "Complete Todo App on Frontend Mentor",
    //   isActive: true,
    // },
  ],
};
