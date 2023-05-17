import { Box, Button, Center, Flex, Spinner, VStack } from "@chakra-ui/react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase/firebaseConfig.js";
import { useEffect, useState } from "react";
import chatTurbo from "./modules/chatTurbo";
import { Outlet } from "react-router-dom";
import ChatInput from "./components/ChatInput.jsx";

//just for my visual pleasure, CHATS LOOK LIKE THIS:

[
  {
    id: "",
    name: "",
    messages: [
      { role: "system", content: "" }, //this actually isn't stored in the chat object
      { role: "user", content: "" },
      { role: "assistant", content: "" },
    ],
  },
];

function App() {
  const [isLoading, setLoading] = useState();
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState();

  const handleInput = (input) => {
    console.log(input);
    setChat((prevChat) => [...prevChat, { role: "user", content: input }]);

    const inputObj = [...chat, { role: "user", content: input }];

    chatTurbo("You are a helpful assistant", inputObj)
      .then((response) => {
        // Add the assistant's response to the chat state
        setChat((prevChat) => [
          ...prevChat,
          { role: "assistant", content: response },
        ]);
      })
      .catch((error) => {
        console.error("Error fetching response:", error);
      });
  };

  console.log(chat);

  return (
    <Flex justify="center" height="100vh">
      <Flex flex="1 1 auto" maxWidth="800px" flexDirection="column">
        <Center p="5px">Chat GPT 3.5</Center>
        <VStack pb="125px" spacing="0" flex="1 1 auto">
          {chat.map((message) => (
            <Center key={message.content} p="25px" width="100%" bg="blue.500">
              {message.content}
            </Center>
          ))}
        </VStack>
      </Flex>
      <Flex w="100%" maxWidth="800px" position="fixed" bottom="5px">
        <Center flex="1 1 auto">
          <ChatInput onSubmit={handleInput}></ChatInput>
        </Center>
      </Flex>
    </Flex>
  );
}

export default App;
