import imageSun from "../../assets/images/icon-sun.svg";
import imageMoon from "../../assets/images/icon-moon.svg";

const TitleAndThemeSwitch = ({
  isDarkTheme,
  updateTheme,
}: {
  isDarkTheme: boolean;
  updateTheme: () => void;
}) => {
  return (
    <div className="flex w-full items-start justify-between pt-12">
      <h1 className="relative z-10 text-3xl font-bold tracking-[0.7rem] text-white">
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
};

export default TitleAndThemeSwitch;
