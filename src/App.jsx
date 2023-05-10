import { Center, Flex } from "@chakra-ui/react";
import ChatInput from "./components/chatInput";

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
        <Center width="100%" position="absolute" bottom="5">
          <ChatInput />
        </Center>
      </Flex>
    </Flex>
  );
}

export default App;
