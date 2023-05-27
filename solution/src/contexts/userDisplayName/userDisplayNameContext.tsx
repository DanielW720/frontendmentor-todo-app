import { createContext, useContext, useReducer, type Dispatch } from "react";

const UserDisplayNameContext = createContext<string | null>(null);
// Dispatch<UserDiplayNameAction> because React takes care of the state argument internally
const UserDisplayNameDispatchContext =
  createContext<Dispatch<UserDisplayNameAction> | null>(null);

export function useDisplayName() {
  return useContext(UserDisplayNameContext);
}

export function useDisplayNameDispatch() {
  return useContext(UserDisplayNameDispatchContext);
}

export function UserDisplayNameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userDisplayName, dispatch] = useReducer(userDisplayNameReducer, "DW");

  return (
    <UserDisplayNameContext.Provider value={userDisplayName}>
      <UserDisplayNameDispatchContext.Provider value={dispatch}>
        {children}
      </UserDisplayNameDispatchContext.Provider>
    </UserDisplayNameContext.Provider>
  );
}

type UserDisplayNameAction = {
  type: string;
  userDisplayName: string;
};

function userDisplayNameReducer(
  _state: string | undefined,
  action: UserDisplayNameAction
) {
  switch (action.type) {
    case "set-name": {
      return action.userDisplayName;
    }
    default: {
      // throw Error("Unknown action: " + action.type);
      console.error("Unknown action: ", action.type);
      return "";
    }
  }
}
