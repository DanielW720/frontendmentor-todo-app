import imageBgMobileLight from "../../assets/images/bg-mobile-light.jpg";
import imageBgMobileDark from "../../assets/images/bg-mobile-dark.jpg";
import imageBgDesktopLight from "../../assets/images/bg-desktop-light.jpg";
import imageBgDesktopDark from "../../assets/images/bg-desktop-dark.jpg";
import googleLogo from "../../assets/images/google-logo.svg";
import { auth, signInUser, signOutUser } from "../../firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export const Header = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
  const [isSignedIn, setIsSignedIn] = useState(auth.currentUser != null);

  useEffect(() => {
    // Observer on the auth object
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  const cardStyle =
    "ml-2 relative z-50 top-1 border-[1px] text-sm h-fit p-1  \
    rounded-md backdrop-blur-md backdrop-brightness-75 shadow-sm shadow-white";

  return (
    <div className="h-52 relative flex justify-center">
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
      {isSignedIn ? (
        <div className="flex justify-between">
          {" "}
          <div className={`${cardStyle} flex`}>
            <p className="mr-2">Welcome, {auth.currentUser!.displayName}!</p>
            <img
              src={auth.currentUser!.photoURL || undefined}
              alt="User profile"
              width="20px"
              className="rounded-full"
            />
          </div>
          <button
            className={cardStyle}
            onClick={() => {
              signOutUser();
            }}
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className={`${cardStyle} flex items-center`}>
          <img src={googleLogo} alt="Google logo" width="20px" />
          <button
            className="ml-2"
            onClick={() => {
              signInUser("google");
            }}
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
};
