import imageBgMobileLight from "../../assets/images/bg-mobile-light.jpg";
import imageBgMobileDark from "../../assets/images/bg-mobile-dark.jpg";
import imageBgDesktopLight from "../../assets/images/bg-desktop-light.jpg";
import imageBgDesktopDark from "../../assets/images/bg-desktop-dark.jpg";
import { auth } from "../../firebase";
import imageSun from "../../assets/images/icon-sun.svg";
import imageMoon from "../../assets/images/icon-moon.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDisplayName } from "../../contexts/userDisplayName/userDisplayNameContext";

export const Header = ({
  isDarkTheme,
  updateTheme,
}: {
  isDarkTheme: boolean;
  updateTheme: any;
}) => {
  const [user, _loading, _error] = useAuthState(auth);
  // useDisplayName() is an empty string, unless the user just registered, in which case it
  // is the new users display name.
  const displayName = useDisplayName();

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
      {user ? (
        <div className="relative flex w-full max-w-lg flex-row items-start justify-center px-6">
          <div className="mt-5 flex h-fit rounded-md border-[1px] p-1 text-sm shadow-sm-symmetric backdrop-blur-md backdrop-brightness-75">
            <p className="mr-2">
              Welcome, {displayName != "" ? displayName : user.displayName}!
            </p>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User profile"
                width="20px"
                className="rounded-full"
              />
            )}
          </div>
        </div>
      ) : (
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
      )}
    </header>
  );
};
