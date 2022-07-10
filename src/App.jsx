import { useEffect, useState } from "react";
import axios from "axios";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Center,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Stack,
  VStack,
} from "@chakra-ui/react";

import { Card } from "./components/character/Card";
import { Filter } from "./components/filter";

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState({
    name: "",
    status: "",
    gender: "",
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    const getCharacters = async () => {
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${filter.name}&status=${filter.status}&gender=${filter.gender}&page=${page}`
        );
        setCharacters(data);
      } catch (error) {
        setError(true);
      }
      setIsLoading(false);
    };
    getCharacters();
  }, [filter, page]);

  const handleFilter = (name, value) => {
    setPage(1);
    setFilter({
      ...filter,
      [name]: value,
    });
  };

  return (
    <VStack>
      <Stack w="full" py={16} bg="gray.700" color="white" textAlign="center">
        <Heading size="4xl" as="h1">
          Practica useEffect
        </Heading>
        <Heading size="2xl" as="h2">
          Rick and Morty API
        </Heading>
      </Stack>
      <VStack w="full" p={2}>
        <Filter handleFilter={handleFilter} />
        {error && (
          <Center p={2}>
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>
                Ups hubo un error al obtener los personajes
              </AlertDescription>
            </Alert>
          </Center>
        )}
        {isLoading && (
          <Center h="50vh">
            <Spinner />
          </Center>
        )}
        {!isLoading && !error && (
          <>
            <SimpleGrid spacing={5} columns={{ base: 1, md: 2, lg: 3 }} p={2}>
              {characters?.results.map((character) => (
                <Card character={character} key={character.id} />
              ))}
            </SimpleGrid>
            <HStack>
              <Button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                colorScheme="blue"
              >
                <ChevronLeftIcon w={8} h={8} />
              </Button>
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page === characters?.info.pages}
                colorScheme="blue"
              >
                <ChevronRightIcon w={8} h={8} />
              </Button>
            </HStack>
          </>
        )}
      </VStack>
    </VStack>
  );
}

export default App;
