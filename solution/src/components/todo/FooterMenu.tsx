import { FilterOptions } from "./FilterOptions";
import { Filter } from "./types";

export const FooterMenu = ({
  itemsLeft,
  filter,
  onFilterChangeHandler,
  deleteCompletedItems,
}: {
  itemsLeft: number;
  filter: Filter;
  onFilterChangeHandler: (filter: Filter) => void;
  deleteCompletedItems: () => void;
}) => {
  return (
    <div className="flex h-[2.5rem] items-center justify-between bg-veryLightGray pl-4 pr-4 text-xs text-veryDarkGrayishBlueLightTheme dark:bg-veryDarkDesaturatedBlue dark:text-darkGrayishBlue">
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
  );
};
