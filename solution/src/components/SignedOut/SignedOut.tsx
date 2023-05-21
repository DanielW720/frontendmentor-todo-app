import googleLogo from "../../assets/images/google-logo.svg";
import { signInUser } from "../../firebase";

export const SignedOut = () => {
  return (
    <div>
      <div className="h-32 w-[75vw] relative bottom-32 border-b-[2px] border-[color:#561d8e] backdrop-blur-sm shadow-blur flex justify-center items-center rounded-t-lg">
        <div className="flex justify-center items-center ml-2 h-10 w-fit border-[1px] text-sm p-1 rounded-md backdrop-blur-md backdrop-brightness-75 shadow-sm-symmetric">
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
      </div>

      <div className="h-32 w-[75vw] relative bottom-32 border-t-[1px] border-[color:#561d8e] shadow-blur flex justify-center items-center rounded-b-lg">
        <p className="dark:text-lightGrayishBlue text-darkGrayishBlue">
          Welcome to the Frontend Mentor Todo-app challange! <br />
          Please log in to view your todo list.
        </p>
      </div>
    </div>
  );
};
