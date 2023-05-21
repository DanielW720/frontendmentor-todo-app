import { CreateItem } from "./CreateItem";
import { Item } from "./Item";
import { useEffect, useState } from "react";
import imageSun from "../../assets/images/icon-sun.svg";
import imageMoon from "../../assets/images/icon-moon.svg";
import { FilterOptions } from "./FilterOptions";
import { TodoList, Filter, Todo } from "./types";
import {
  deleteItem,
  getItems,
  putItem,
  updateItemsActiveState,
  updateItemsTitle,
} from "./api";

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
    const fetchData = async () => {
      const items = await getItems();
      setItems(items);
    };
    fetchData();
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
   * Update the `isActive` status of an item with given id, both in Firestore and client side.
   * @param id Id of the item
   */
  const onStatusChangeHandler = (id: string): void => {
    const idx = findIndexOf(id);
    // Update item in Firestore
    updateItemsActiveState(id, !items[idx].isActive);
    // Update item on client
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], isActive: !items[idx].isActive };
    setItems(newItems);
  };

  /**
   * Submit a new todo item. Pushes new item to Firestore and client side.
   * @param title Title of the new todo item
   */
  const onSubmitNewTodoHandler = async (title: string) => {
    // Push to Firestore
    const docRef = await putItem(title);
    // Update on client, unless push failed
    if (docRef != undefined) {
      const newItems = [
        {
          id: docRef.id,
          title: title,
          isActive: true,
        },
        ...items,
      ];
      setItems(newItems);
    } else {
      alert("Couldn't add document! Did you loose your internet connection?");
    }
  };

  /**
   * Remove item from item list, in Firestore and on client.
   * @param id id of the item
   */
  const onRemoveItemHandler = (id: string): void => {
    // Remove item in Firestore
    deleteItem(id);
    // Remove item on client
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
   * Delete completed items, in Firestore and on client.
   */
  const deleteCompletedItems = () => {
    const newList: TodoList = [];
    items.forEach((item) =>
      item.isActive ? newList.push(item) : deleteItem(item.id)
    );
    setItems(newList);
  };

  /**
   * Update an items title, both in Firestore and on client side.
   * @param id Id of the item to update
   * @param title The new title
   */
  const onUpdateItemTitleHandler = (id: string, title: string) => {
    // Update title in Firestore
    updateItemsTitle(id, title);
    // Update title on client
    const item = items.find((item) => item.id === id) as Todo;
    item.title = title;
    // Replace the item in the list
    const newList = items.map(
      (obj) => items.find((o) => o.id === obj.id) || obj
    );
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

  return (
    <div className="relative pl-6 pr-6 bottom-44 w-full max-w-lg">
      {titleAndThemeSwitchMarkup}

      <CreateItem addTodo={onSubmitNewTodoHandler} />

      <div className="rounded-md w-full overflow-hidden shadow-3lg-light dark:shadow-3lg-dark">
        {/* // List of items */}
        <div className="max-h-[290px] md:max-h-[400px] overflow-y-scroll no-scrollbar">
          {getFilteredItemList().map((item) => {
            return (
              <Item
                key={item.id}
                item={item}
                onStatusChangeHandler={onStatusChangeHandler}
                onRemoveItemHandler={onRemoveItemHandler}
                onUpdateItemTitleHandler={onUpdateItemTitleHandler}
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
