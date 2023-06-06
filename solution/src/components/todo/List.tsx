import { CreateItem } from "./CreateItem";
import { Item } from "./Item";
import { useEffect, useState } from "react";

import { FilterOptions } from "./FilterOptions";
import { TodoList, Filter, Todo } from "./types";
import {
  deleteItem,
  getItems,
  putItem,
  updateItemsActiveState,
  updateItemsTitle,
} from "./api";
import { Droppable } from "@hello-pangea/dnd";
import TitleAndThemeSwitch from "./TitleAndThemeSwitch";
import { FooterMenu } from "./FooterMenu";

const defaultFilter: Filter = "All";

/**
 * Find index of item with given id.
 * @param items The list of items
 * @param id Id of the item
 * @returns The index of the item in the items list
 */
function findIndexOf(items: TodoList, id: string): number {
  const item = items.find((item) => item.id === id) as Todo;
  return items.indexOf(item);
}

/**
 *
 * @param items
 */
function sortItems(items: TodoList) {
  return items.sort((a, b) => a.index - b.index);
}

const List = ({
  items,
  setItems,
  updateTheme,
  isDarkTheme,
}: {
  items: TodoList;
  setItems: React.Dispatch<React.SetStateAction<TodoList>>;
  updateTheme: any;
  isDarkTheme: boolean;
}) => {
  const [filter, setFilter] = useState<Filter>(defaultFilter);

  // Fetch items on first render
  useEffect(() => {
    const fetchData = async () => {
      let items = await getItems();
      items = sortItems(items);
      setItems(items);
    };
    fetchData();
  }, []);

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
    const idx = findIndexOf(items, id);
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
          index: 0,
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
    const idx = findIndexOf(items, id);
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

  return (
    <div className="relative bottom-44 w-full max-w-lg pl-6 pr-6">
      <TitleAndThemeSwitch
        isDarkTheme={isDarkTheme}
        updateTheme={updateTheme}
      />

      <CreateItem addTodo={onSubmitNewTodoHandler} />

      <div className="w-full overflow-hidden rounded-md shadow-3lg-light dark:shadow-3lg-dark">
        {/* // List of items */}
        <div className="no-scrollbar max-h-[290px] overflow-y-scroll md:max-h-[400px]">
          <Droppable droppableId="items" type="ITEM">
            {(provided, _snapshot) => (
              <div
                ref={provided.innerRef}
                className="bg-veryDarkDesaturatedBlue"
                {...provided.droppableProps}
              >
                {getFilteredItemList().map((item, idx) => (
                  <Item
                    key={item.id}
                    item={item}
                    draggableIdx={idx}
                    onStatusChangeHandler={onStatusChangeHandler}
                    onRemoveItemHandler={onRemoveItemHandler}
                    onUpdateItemTitleHandler={onUpdateItemTitleHandler}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <FooterMenu
          itemsLeft={items.filter((item) => item.isActive).length}
          filter={filter}
          onFilterChangeHandler={onFilterChangeHandler}
          deleteCompletedItems={deleteCompletedItems}
        />
      </div>

      <FilterOptions
        onFilterChangeHandler={onFilterChangeHandler}
        filter={filter}
      />

      <p className="mt-10 text-center text-sm text-darkGrayishBlue">
        Drag and drop to reorder list
      </p>
    </div>
  );
};

export default List;
