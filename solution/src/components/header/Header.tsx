import imageBgMobileLight from "../../assets/images/bg-mobile-light.jpg";
import imageBgMobileDark from "../../assets/images/bg-mobile-dark.jpg";
import imageBgDesktopLight from "../../assets/images/bg-desktop-light.jpg";
import imageBgDesktopDark from "../../assets/images/bg-desktop-dark.jpg";
import { auth } from "../../firebase";
import { WelcomeUser } from "./WelcomeUser";
import { TodoLogo } from "./TodoLogo";

export const Header = ({
  isDarkTheme,
  updateTheme,
}: {
  isDarkTheme: boolean;
  updateTheme: any;
}) => {
  return (
    <header className="relative flex h-52 justify-center">
      <img
        src={isDarkTheme ? imageBgMobileDark : imageBgMobileLight}
        alt="Header background"
        className="absolute left-0 top-0 z-0 h-full w-full md:hidden"
      />
      <img
        src={isDarkTheme ? imageBgDesktopDark : imageBgDesktopLight}
        alt="Header background"
        className="absolute left-0 top-0 z-0 hidden h-full w-full md:block"
      />
      {auth.currentUser ? (
        <WelcomeUser />
      ) : (
        <TodoLogo isDarkTheme={isDarkTheme} updateTheme={updateTheme} />
      )}
    </header>
  );
};
