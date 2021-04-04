import { Container, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useToast } from "@chakra-ui/toast";
import React from "react";
import useAuth from "../auth/hooks";
import db from "../config/firebase";
import api from "./api";
import { Item } from "./types";

interface Context {
  state: {
    puchos: Item[];
  };
  actions: {
    addPucho: (pucho: Item) => Promise<void>;
    getPuchos?: (fecha?: Date) => Item[];
  };
}

const PuchoContext = React.createContext({} as Context);

const PuchoProvider: React.FC = ({ children }) => {
  const { user } = useAuth();
  const [puchos, setPuchos] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<"initial" | "done" | "error">(
    "initial"
  );
  const toast = useToast();

  React.useEffect(() => {
    if (user) {
      api.subscribe(user, (data) => {
          console.log(data)
        if (!data.empty) {
          const _puchos = data.docs.map((p) => {
            return { fecha: new Date(p.data().fecha.seconds * 1000) } as Item;
          });
          setPuchos(_puchos);
        } else {
          setPuchos([]);
        }

        setStatus("done");
      });
    }
  }, [user]);

  if (status === "initial")
    return (
      <Container centerContent marginY={24}>
        <Spinner
          thickness="4px"
          speed="0.9s"
          emptyColor="gray.200"
          color="gray.500"
          size="lg"
        />
        <Text>Cargando datos..</Text>
      </Container>
    );
  function getPuchos(fecha: Date) {
    return api.getFromDate(user, fecha);
  }

  function addPucho(pucho: Item) {
    return db
      .collection("users")
      .doc(user.uid)
      .collection("puchos")
      .doc(new Date().toLocaleDateString().replace(/\//g, ""))
      .collection("items")
      .doc()
      .set({ user: user.uid, fecha: pucho.fecha })
      .then(() => {
        toast({
          title: "Yay!",
          description: "Se agregó ok!",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Oops!",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  const state: Context["state"] = { puchos: puchos || [] };
  const actions: Context["actions"] = { addPucho };

  return (
    <PuchoContext.Provider value={{ state, actions }}>
      {children}
    </PuchoContext.Provider>
  );
};

export { PuchoContext, PuchoProvider };
