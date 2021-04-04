import { Container } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import firebase from "firebase";
import { useRouter } from "next/router";
import React from "react";
import Login from "../components/Login";
import { auth } from "../config/firebase";

interface Context {
  state: {
    user: firebase.User;
  };
  actions: {
    signIn: () => Promise<firebase.auth.UserCredential>;
    signOut: () => void;
  };
}

const UserContext = React.createContext({} as Context);

const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<firebase.User>(null);
  const router = useRouter();
  const [status, setStatus] = React.useState<"initial" | "done">("initial");

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setStatus("done");
      setUser(user);
      if (user) router.push("/");
      else router.push("/auth/login");
    });
  }, []);

  if (status === "initial")
    return (
      <Container centerContent paddingY={24}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="gray.500"
          size="xl"
        />
      </Container>
    );
  return (
    <UserContext.Provider
      value={{
        state: { user },
        actions: {
          signIn: () =>
            auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
          signOut: () => auth.signOut(),
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
