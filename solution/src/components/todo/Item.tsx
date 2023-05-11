import iconCross from "../../assets/images/icon-cross.svg";
import iconCheck from "../../assets/images/icon-check.svg";

export const Item = ({
  item,
  onStatusChangeHandler,
  onRemoveItemHandler,
}: {
  item: { id: string; title: string; isActive: boolean };
  onStatusChangeHandler: (id: string) => void;
  onRemoveItemHandler: (id: string) => void;
}) => {
  return (
    <div className="min-h-[3rem] border-veryDarkGrayishBlue border-b-[1px] bg-veryLightGray dark:bg-veryDarkDesaturatedBlue flex justify-between items-center pl-4 pr-4 ">
      <div className="flex items-center">
        <button onClick={() => onStatusChangeHandler(item.id)}>
          {item.isActive ? (
            <div className="h-6 w-6 flex items-center justify-center bg-inherit rounded-full border-[1px] border-lightGrayishBlue dark:border-darkGrayishBlue"></div>
          ) : (
            <div className="h-6 w-6 bg-gradient-to-br from-headerLeft to-headerRight flex items-center justify-center bg-inherit rounded-full border-[1px] border-darkGrayishBlue">
              <img src={iconCheck} />
            </div>
          )}
        </button>
        <p
          className={`ml-2 text-xs font-bold ${
            item.isActive
              ? "text-darkGrayishBlue dark:text-lightGrayishBlue "
              : "dark:text-darkGrayishBlue line-through"
          }`}
        >
          {item.title}
        </p>
      </div>
      <button onClick={() => onRemoveItemHandler(item.id)}>
        <img src={iconCross} alt="Cross icon" width="75%" />
      </button>
    </div>
  );
};
