import { useContext } from "react";
import { UserContext } from "./context";

const useAuth = () => {
  const {
    state: { user },
    actions: { signIn, signOut },
  } = useContext(UserContext);

  return { user, signIn, signOut };
};

export default useAuth;
