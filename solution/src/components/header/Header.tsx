import imageSun from "../../assets/images/icon-sun.svg";
import imageMoon from "../../assets/images/icon-moon.svg";
import imageBgMobileLight from "../../assets/images/bg-mobile-light.jpg";
import imageBgMobileDark from "../../assets/images/bg-mobile-dark.jpg";

export const Header = ({
  isDarkTheme,
  updateTheme,
}: {
  updateTheme: any;
  isDarkTheme: string;
}) => {
  return (
    <div className="h-52 pt-12 pl-8 pr-8 w-full flex justify-between items-start relative">
      <img
        src={isDarkTheme === "dark" ? imageBgMobileDark : imageBgMobileLight}
        alt="Header background"
        className="absolute w-full left-0 top-0 h-full z-0"
      />
      <h1 className="text-white tracking-[0.7rem] text-3xl relative z-10 font-bold">
        TODO
      </h1>
      <button onClick={updateTheme}>
        {
          <img
            src={isDarkTheme === "dark" ? imageSun : imageMoon}
            alt="Sun icon"
            className="relative z-10"
          />
        }
      </button>
    </div>
  );
};
