import { useState } from "react";
import iconCrossBrightblue from "../../assets/images/icon-cross-brightblue.svg";
import iconMenuDrawer from "../../assets/images/icon-menu-drawer.svg";

export const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <div className="relative z-20">
      {/* Menu button */}
      <button
        className="absolute left-6 top-5 rounded-md border-[2px] border-solid border-[#57c5ff] bg-formRight p-[2px] backdrop-blur-lg"
        onClick={toggleDrawer}
      >
        <img src={iconMenuDrawer} alt="Menu icon" />
      </button>
      {/* Backdrop */}
      <div
        id="drawer-backdrop"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          console.log(e);
          if ((e.target as HTMLDivElement).id === "drawer-backdrop") {
            toggleDrawer();
          }
        }}
        className={`absolute ${
          isDrawerOpen ? "left-0" : "left-[100vw]"
        } h-screen w-screen backdrop-blur-sm transition-all`}
      ></div>
      {/* Drawer */}
      <div
        className={`absolute z-50 h-screen w-[160px] lg:w-[240px] ${
          isDrawerOpen ? "left-0 " : "left-[-160px] lg:left-[-240px]"
        } bg-veryDarkDesaturatedBlue transition-all`}
      >
        <div className="w-full">
          <button className="ml-auto mr-8 mt-8 block" onClick={toggleDrawer}>
            <img src={iconCrossBrightblue} alt="Cross icon" width="25" />
          </button>
          <ul className="ml-10 mt-10 w-full lg:ml-20 lg:mt-20">
            <li className="mt-10 text-lg">
              <button>Sign out</button>
            </li>
            <li className="mt-10 text-lg">
              <button>Unregister</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
