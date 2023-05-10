import { Center, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Flex minHeight="100vh" justify="center">
      <Flex
        position="relative"
        flex="1 1 0"
        maxWidth="1440px"
        justify="space-between"
        flexDirection="column"
      >
        <Flex flexDirection="column">
          <Center flex="1 1 0" bg={"gray.600"}>
            Box
          </Center>
          <Center flex="1 1 0" bg={"gray.600"}>
            Box
          </Center>
          <Center flex="1 1 0" bg={"gray.600"}>
            Box
          </Center>
        </Flex>
        <Center position="absolute" bottom="5"></Center>
      </Flex>
    </Flex>
  );
}

export default App;
