import { Filter } from "./types";

export const FilterOptions = ({
  onFilterChangeHandler,
  filter,
}: {
  onFilterChangeHandler: (filter: Filter) => void;
  filter: Filter;
}) => {
  return (
    <div className="min-h-[3rem] w-full mt-5 bg-veryLightGray text-darkGrayishBlue font-bold dark:bg-veryDarkDesaturatedBlue rounded-md flex items-center justify-center lg:hidden">
      {["All", "Active", "Completed"].map((filterOption, idx) => {
        return (
          <button
            key={idx}
            className={`${filterOption === filter && "text-brightBlue"} ${
              idx === 1 && "pl-4 pr-4"
            }`}
            onClick={() => onFilterChangeHandler(filterOption as Filter)}
          >
            {filterOption}
          </button>
        );
      })}
    </div>
  );
};
