import { Box, Center, Flex, Spacer, VStack } from "@chakra-ui/react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ChatInput from "./components/chatInput";
import { db } from "./firebase/firebaseConfig.js";
import { useState } from "react";
import chatTurbo from "./modules/chatTurbo";
import { FaRandom } from "react-icons/fa";

function App() {
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (input) => {
    console.log(input);

    // prettier-ignore
    const userMessage = [...messages, {"role": "user", "content": input}]

    // prettier-ignore
    // const array = [...messages, { "role": "user", "content": input}];

    // prettier-ignore
    const data = await chatTurbo("You are a helpful assistant", userMessage);
    setMessages([...userMessage, { role: "assistant", content: data }]);
    // console.log(data);

    // addDoc(collection(db, "messages"), input)
    //   .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch((err) => {
    //     console.error("Error adding document: ", err);
    //   });
  };
  console.log(messages);

  const getData = () => {
    getDocs(collection(db, "users"))
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data().first}`);
        });
      })
      .catch((err) => {
        console.error("Error getting Documents: ", err);
      });
  };

  //working chat completion that takes an array of messages to be used later
  // chatTurbo("You are a helpful assistant", [
  //   { role: "user", content: "Hello! How Are you Today?" },
  // ]);

  //add bionics reading to gpt

  return (
    <Flex minHeight="100vh">
      <Flex flex="1 1 0">
        <Flex width="100%" flexDirection="column">
          <Center bg="gray.700" py="20px">
            New Chat
          </Center>
        </Flex>
      </Flex>
      <Flex
        position="relative"
        flex="7 1 0"
        justify="space-between"
        flexDirection="column"
      >
        <Flex pb={150} flexDirection="column">
          <Center
            px={50}
            position="sticky"
            top={0}
            width="100%"
            bgColor={"gray.700"}
          >
            CHAT
          </Center>
          {messages.map((message) => (
            <Center
              py={50}
              bg={message.role === "user" ? "gray.800" : "gray.700"}
              key={Math.random()}
            >
              <Center maxWidth="800px"> {message.content}</Center>
            </Center>
          ))}
        </Flex>

        <Center position="sticky" bottom="5">
          <Box width="100%" maxWidth="800px">
            <ChatInput onSubmit={handleSubmit} />
          </Box>
        </Center>
      </Flex>
    </Flex>
  );
}

export default App;
