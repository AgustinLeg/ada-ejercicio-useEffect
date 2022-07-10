import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";

export const Filter = ({ handleFilter }) => {
  const handleChange = (e) => {
    handleFilter(e.target.name, e.target.value);
  };

  return (
    <SimpleGrid w="full" columns={{ base: 1, md: 3 }} gap={2}>
      <InputGroup>
        <Input
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleFilter("name", e.target.value.toLowerCase());
            }
          }}
          placeholder="Search by name..."
        />
        <InputRightElement role="button">
          <Search2Icon />
        </InputRightElement>
      </InputGroup>
      <Select placeholder="Status - All" name="status" onChange={handleChange}>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unkown">Unkown</option>
      </Select>
      <Select
        placeholder="Gender - All"
        name="gender"
        onChange={handleChange}
        defaultValue=""
      >
        <option value="Male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unkown">Unkown</option>
      </Select>
    </SimpleGrid>
  );
};
