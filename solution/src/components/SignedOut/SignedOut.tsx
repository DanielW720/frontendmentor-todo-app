import { useState } from "react";
import LoginForm from "../loginRegisterForm/LoginRegisterForm";
import googleLogo from "../../assets/images/google-logo.svg";
import { auth, signInUser } from "../../firebase";
import { useDisplayNameDispatch } from "../../contexts/userDisplayName/userDisplayNameContext";

export const SignedOut = () => {
  const [loginForm, setLoginForm] = useState(true);
  const userDisplayNameDispatch = useDisplayNameDispatch();

  /**
   * Signs in user with Google provider and, if successfull sign-in, sets the display
   * name of the user locally.
   * @returns Promise<void>
   */
  const onSignInWithGoogle = async () => {
    // Todo: Default of the dispatch is null which might be unnecessary
    if (!userDisplayNameDispatch) return;
    try {
      await signInUser("google");
      if (auth.currentUser && auth.currentUser.displayName) {
        userDisplayNameDispatch({
          type: "set-name",
          userDisplayName: auth.currentUser?.displayName,
        });
      }
    } catch (e) {
      console.error("Couldn't sign in user with Google provider: ", e);
    }
  };

  return (
    <div className="relative bottom-20">
      <div className="flex justify-around text-2xl text-darkGrayishBlue">
        <button
          className={`${
            loginForm && "text-brightBlue"
          } transition-all duration-300`}
          onClick={() => setLoginForm(true)}
        >
          <h2>Login</h2>
        </button>
        <button
          className={`${
            !loginForm && "text-brightBlue"
          } transition-all duration-300`}
          onClick={() => setLoginForm(false)}
        >
          <h2>Register</h2>
        </button>
      </div>
      <LoginForm loginForm={loginForm} />
      <button onClick={onSignInWithGoogle} className="w-full">
        <div className="mt-12 flex items-center justify-around rounded-lg bg-veryDarkDesaturatedBlue p-2 shadow-md-symmetric shadow-headerLeft transition-all duration-500 dark:shadow-headerRight">
          <img src={googleLogo} alt="Google logo" width="20px" />
          <p>Sign in with Google</p>
        </div>
      </button>
    </div>
  );
};
