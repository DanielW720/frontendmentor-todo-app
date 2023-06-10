import { useDisplayName } from "../../contexts/userDisplayName/userDisplayNameContext";
import { auth } from "../../firebase";

/**
 * WelcomeUser is only rendered when a user is signed in.
 */
export const WelcomeUser = () => {
  // useDisplayName() is an empty string, unless the user just registered, in which case it
  // is the new users display name.
  const displayName = useDisplayName();
  const user = auth.currentUser!;

  return (
    <div className="relative flex w-full max-w-lg flex-row items-start justify-center px-6">
      <div className="mt-5 flex h-fit rounded-md border-[1px] p-1 text-sm shadow-sm-symmetric backdrop-blur-md backdrop-brightness-75">
        <p className="mr-2">
          Welcome,{" "}
          {displayName && displayName != ""
            ? getFirstName(displayName)
            : getFirstName(user.displayName!)}
          !
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
  );
};

function getFirstName(displayName: string) {
  return displayName.split(" ")[0];
}
