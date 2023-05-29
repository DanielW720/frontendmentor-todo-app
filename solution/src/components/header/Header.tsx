import imageBgMobileLight from "../../assets/images/bg-mobile-light.jpg";
import imageBgMobileDark from "../../assets/images/bg-mobile-dark.jpg";
import imageBgDesktopLight from "../../assets/images/bg-desktop-light.jpg";
import imageBgDesktopDark from "../../assets/images/bg-desktop-dark.jpg";
import { auth, signOutUser } from "../../firebase";
import imageSun from "../../assets/images/icon-sun.svg";
import imageMoon from "../../assets/images/icon-moon.svg";
import { useDisplayName } from "../../contexts/userDisplayName/userDisplayNameContext";

export const Header = ({
  isDarkTheme,
  updateTheme,
}: {
  isDarkTheme: boolean;
  updateTheme: any;
}) => {
  const userDisplayName = useDisplayName();

  return (
    <header className="h-52 relative flex justify-center">
      <img
        src={isDarkTheme ? imageBgMobileDark : imageBgMobileLight}
        alt="Header background"
        className="absolute w-full left-0 top-0 h-full z-0 md:hidden"
      />
      <img
        src={isDarkTheme ? imageBgDesktopDark : imageBgDesktopLight}
        alt="Header background"
        className="absolute w-full left-0 top-0 h-full z-0 hidden md:block"
      />
      {auth.currentUser != null ? (
        <div className="flex flex-row items-start justify-center w-full max-w-lg px-6 relative">
          <div className="flex mt-5 border-[1px] text-sm h-fit p-1 rounded-md backdrop-blur-md backdrop-brightness-75 shadow-sm-symmetric">
            <p className="mr-2">Welcome, {userDisplayName}!</p>
            {auth.currentUser?.photoURL != undefined && (
              <img
                src={auth.currentUser.photoURL || undefined}
                alt="User profile"
                width="20px"
                className="rounded-full"
              />
            )}
          </div>
          <button
            className="absolute left-6 mt-5 border-[1px] text-sm h-fit p-1 rounded-md backdrop-blur-md backdrop-brightness-75 shadow-sm-symmetric"
            onClick={async () => {
              // Unregister
            }}
          >
            Unregister
          </button>
          <button
            className="absolute right-6 mt-5 border-[1px] text-sm h-fit p-1 rounded-md backdrop-blur-md backdrop-brightness-75 shadow-sm-symmetric"
            onClick={async () => {
              await signOutUser();
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="relative bottom-8 flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold tracking-[0.5rem] text-white mb-2">
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
      )}
    </header>
  );
};
