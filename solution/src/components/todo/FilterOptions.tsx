import { Filter } from "./types";

export const FilterOptions = ({
  onFilterChangeHandler,
  filter,
}: {
  onFilterChangeHandler: (filter: Filter) => void;
  filter: Filter;
}) => {
  return (
    <div className="h-full w-full bg-veryLightGray text-darkGrayishBlue font-bold dark:bg-veryDarkDesaturatedBlue rounded-md flex items-center justify-center">
      {["All", "Active", "Completed"].map((filterOption, idx) => {
        return (
          <button
            key={idx}
            className={`cursor-pointer ${
              filterOption === filter
                ? "text-brightBlue hover:text-brightBlue"
                : "hover:text-veryDarkGrayishBlueLightTheme dark:hover:text-lightGrayishBlue"
            } ${idx === 1 && "pl-4 pr-4"}`}
            onClick={() => onFilterChangeHandler(filterOption as Filter)}
          >
            {filterOption}
          </button>
        );
      })}
    </div>
  );
};
