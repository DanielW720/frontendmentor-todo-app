import { useState } from "react";
import LoginForm from "../loginForm/LoginForm";
import googleLogo from "../../assets/images/google-logo.svg";
import { signInUser } from "../../firebase";

export const SignedOut = () => {
  const [loginForm, setLoginForm] = useState(true);

  return (
    <div className="relative bottom-20">
      <div className="text-2xl flex justify-around text-darkGrayishBlue">
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
      <div className="dark:shadow-headerRight shadow-headerLeft bg-veryDarkDesaturatedBlue shadow-md-symmetric flex justify-around items-center rounded-lg mt-12 p-2 transition-all duration-500">
        <img src={googleLogo} alt="Google logo" width="20px" />
        <button
          onClick={() => {
            signInUser("google");
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
