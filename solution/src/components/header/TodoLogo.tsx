import imageSun from "../../assets/images/icon-sun.svg";
import imageMoon from "../../assets/images/icon-moon.svg";

export const TodoLogo = ({
  isDarkTheme,
  updateTheme,
}: {
  isDarkTheme: boolean;
  updateTheme: any;
}) => {
  return (
    <div className="relative bottom-8 flex flex-col items-center justify-center">
      <h1 className="mb-2 text-3xl font-bold tracking-[0.5rem] text-white">
        TODO
      </h1>
      <button onClick={updateTheme}>
        {
          <img
            src={isDarkTheme ? imageSun : imageMoon}
            alt="Sun icon"
            width="90%"
          />
        }
      </button>
    </div>
  );
};
