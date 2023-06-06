import { Filter } from "./types";

export const FilterOptions = ({
  onFilterChangeHandler,
  filter,
}: {
  onFilterChangeHandler: (filter: Filter) => void;
  filter: Filter;
}) => {
  return (
    <div className="mt-6 h-[3rem] shadow-3lg-light dark:shadow-3lg-dark md:hidden">
      <div className="flex h-full w-full items-center justify-center rounded-md bg-veryLightGray font-bold text-darkGrayishBlue dark:bg-veryDarkDesaturatedBlue">
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
    </div>
  );
};
