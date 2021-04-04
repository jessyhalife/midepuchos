import React from "react";
import { Container, Heading, List, ListItem, Text } from "@chakra-ui/layout";

import useAuth from "../auth/hooks";

import db from "../config/firebase";

import Header from '../components/Header'
import usePuchos from "../puchos/hooks";

const Home: React.FC = () => {
  const {puchos} = usePuchos();

  return (
    <>
    <Header />
    <Container marginY={16} gridGap={4} maxWidth="container.xl" centerContent>
      <Heading>Hoy {new Date().toLocaleDateString()}</Heading>
      <Text fontSize="sm" color="gray.700" fontWeight="semibold" marginTop={2}>
        Último:{" "}
        {puchos
          .sort((a, b) => Number(b.fecha) - Number(a.fecha))[0]
          ?.fecha.toLocaleTimeString()}
      </Text>
      <List marginTop={8} width="100%" spacing={1}>
        {puchos.map((x, i) => {
          return (
            <ListItem
              key={i}
              padding={3}
              borderWidth={1}
              borderColor="gray.200"
              boxShadow="sm"
              backgroundColor="white"
            >
              <Text>{x.fecha.toLocaleTimeString()}</Text>
            </ListItem>
          );
        })}
      </List>
    </Container>
    </>
  );
};

export default Home;
