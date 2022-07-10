import {
  Circle,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

export const Card = ({ character }) => {
  const { name, status, location, image, species } = character;

  return (
    <SimpleGrid
      columns={2}
      templateColumns="200px 1fr"
      bg="#3B3E43"
      rounded="lg"
      color="white"
    >
      <Image src={image} alt={name} roundedLeft="lg" />
      <VStack align="flex-start" p={2}>
        <Heading size="lg">{name}</Heading>
        <Flex align="center" gap={2}>
          <Circle
            size={3}
            bg={
              (status === "Alive" && "green.400") ||
              (status === "Dead" && "red.400") ||
              "white"
            }
          />
          <Text>
            {status} - {species}
          </Text>
        </Flex>
        <Text color="gray.300">Last known location:</Text>
        <Text>{location.name}</Text>
      </VStack>
    </SimpleGrid>
  );
};
