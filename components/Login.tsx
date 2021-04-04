import React from "react";
import firebase from "firebase";
import { Box, Container, Heading, Stack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

interface Props {
  signIn: () => Promise<firebase.auth.UserCredential>;
}

const Login: React.FC<Props> = ({ signIn }) => {
  return (
    <Container
      maxWidth="container.md"
      backgroundColor="gray.100"
      centerContent
      paddingY={16}
      marginY={16}
    >
      <Stack justifyContent="center" alignItems="center" gridGap={8}>
        <Heading>Iniciá sesión para empezar a dividir gastos</Heading>
        <Box>
          <Button variant="solid" colorScheme="green" onClick={signIn}>
            Entrar con google
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
