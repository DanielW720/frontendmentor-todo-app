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
    <div className="min-h-[3rem] border-veryDarkGrayishBlue border-b-[1px] bg-veryLightGray dark:bg-veryDarkDesaturatedBlue flex justify-between items-center pl-4 pr-4">
      <div className="flex items-center">
        <button onClick={() => onStatusChangeHandler(item.id)}>
          <div className="hover:bg-gradient-to-br from-headerLeft to-headerRight rounded-full bg-lightGrayishBlue dark:bg-darkGrayishBlue p-[1px] flex items-center justify-center">
            <div
              className={`h-[23px] w-[23px] flex items-center justify-center rounded-full ${
                item.isActive
                  ? "bg-veryLightGray dark:bg-veryDarkDesaturatedBlue"
                  : "bg-gradient-to-br from-headerLeft to-headerRight"
              }`}
            >
              <img
                src={iconCheck}
                alt="Checked icon"
                className={`${item.isActive ? "hidden" : "block"}`}
              />
            </div>
          </div>
        </button>
        <p
          className={`w-full ml-2 text-xs md:text-[0.9rem] font-bold ${
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
