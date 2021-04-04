import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import useAuth from "../../auth/hooks";
import usePuchos from "../../puchos/hooks";

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [hora, setHora] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const { addPucho } = usePuchos();

  const hourRegex = /(([0-1][0-9]|2[0-3]):[0-5][0-9])/;

  const validateHour = React.useMemo(() => {
    if (!hourRegex.test(hora) && hora !== "") {
      setError("Formato de hora inváido HH:MM");
      return false;
    } else {
      setError("");
      return true;
    }
  }, [hora]);

  const handleAdd = () => {
    if (hora !== "" && validateHour) {
      let fecha = new Date();
      fecha.setHours(Number(hora.split(":")[0]), Number(hora.split(":")[1]), 0);
      addPucho({ fecha });
      setHora("")
    }
  };
  return (
    <Box position="sticky" top={0}>
      <Stack
        backgroundColor="white"
        direction="row"
        justifyContent="space-between"
        padding={4}
        borderBottomWidth={1}
        alignItems="center"
      >
        <Text fontWeight="500">¡Hola 👋🏻 {user?.displayName}!</Text>
        <Button variant="solid" colorScheme="red" onClick={signOut}>
          Salir
        </Button>
      </Stack>

      <Stack
        alignItems="center"
        direction="row"
        gridGap={4}
        justifyContent="center"
        paddingY={4}
        backgroundColor="gray.200"
        boxShadow="md"
        paddingX={4}
      >
        <Text>Hora</Text>
        <Flex direction="column" alignItems="center">
          <Input
            maxWidth="sm"
            backgroundColor="white"
            borderColor={validateHour ? "gray.300" : "red.500"}
            focusBorderColor={validateHour ? "" : "red.500"}
            placeholder="hh:mm"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" ? handleAdd() : undefined
            }
          />
          <Text fontSize="sm" color="red.300">
            {error}
          </Text>
        </Flex>
        <Button onClick={() => handleAdd()}>Agregar</Button>
      </Stack>
    </Box>
  );
};

export default Header;
