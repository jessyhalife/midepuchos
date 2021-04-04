import { ChakraProvider, Container } from "@chakra-ui/react";
import { UserProvider } from "../auth/context";
import Header from "../components/Header";
import { PuchoProvider } from "../puchos/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <UserProvider>
        <PuchoProvider>
          <Component {...pageProps} />
        </PuchoProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
