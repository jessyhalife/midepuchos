import React from "react";

import { Box, Container, Heading, Stack, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import useAuth from "../../auth/hooks";

const Login: React.FC = () => {
  const { signIn } = useAuth();
  
  return (
    <Container
      maxWidth="container.md"
      backgroundColor="gray.100"
      centerContent
      paddingY={16}
      marginY={16}
    >
      <Stack justifyContent="center" alignItems="center" gridGap={4}>
        <Heading textAlign="center" fontSize="xl">¡Hola!</Heading>
        <Text fontSize="lg">Para continuar necesitamos saber quién sos</Text>
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
