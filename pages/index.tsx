import React from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import useAuth from "../auth/hooks";
import { Input } from "@chakra-ui/input";

const shortName = (displayName: string): string => {
  return displayName
    .split(" ")
    .reduce((short, val) => short + val.charAt(0), "");
};

interface Item {
  hora: Date;
}

const Home: React.FC = () => {
  const { user, signOut } = useAuth();
  const [fumados, setFumados] = React.useState<Item[]>([]);
  const [hora, setHora] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const hourRegex = /(([0-1][0-9]|2[0-3]):[0-5][0-9])/;
  function handleAdd() {
    if (!validateHour || hora === "") return;
    let fecha = new Date();
    fecha.setHours(Number(hora.split(":")[0]), Number(hora.split(":")[1]), 0);
    setError("");
    setFumados((fum) => fum.concat({ hora: fecha }));
    setHora("");
  }
  
  const validateHour = React.useMemo(() => {
    if (!hourRegex.test(hora) && hora !== "") {
      setError("Formato de hora inváido HH:MM");
      return false;
    } else {
      setError("");
      return true;
    }
  }, [hora]);

  return (
    <>
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
              onKeyPress={(e) => (e.key === "Enter" ? handleAdd() : undefined)}
            />
            <Text fontSize="sm" color="red.300">
              {error}
            </Text>
          </Flex>
          <Button onClick={handleAdd}>Agregar</Button>
        </Stack>
      </Box>

      <Container        
        marginY={16}
        gridGap={4}
        maxWidth="container.xl"
        centerContent
      >
        <Heading>Hoy {new Date().toLocaleDateString()}</Heading>
        <Text fontSize="sm" color="gray.700" fontWeight="semibold" marginTop={2}>
          Último: {fumados.sort((a, b) => Number(b.hora) - Number(a.hora))[0]?.hora.toLocaleTimeString()}
        </Text>
        <List marginTop={8} width="100%" spacing={1} >
          {fumados.map((x, i) => {
            return (
              <ListItem
                key={i}
                padding={3}
                borderWidth={1}
                borderColor="gray.200"
                boxShadow="sm"
                backgroundColor="white"
              >
                <Text>{x.hora.toLocaleTimeString()}</Text>
              </ListItem>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default Home;
