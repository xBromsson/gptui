import { Center, Flex } from "@chakra-ui/react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import ChatInput from "./components/chatInput";
import { db } from "./firebase/firebaseConfig.js";
import { useState } from "react";
import chatTurbo from "./modules/chatTurbo";

function App() {
  const [messages, setMessages] = useState();
  const [input, setInput] = useState();

  const handleSubmit = () => {
    console.log("submitted");

    // addDoc(collection(db, "messages"), input)
    //   .then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch((err) => {
    //     console.error("Error adding document: ", err);
    //   });
  };

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

  chatTurbo("You are a helpful assistant", [
    { role: "user", content: "Hello! How Are you Today?" },
  ]);

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
          <ChatInput onSubmit={handleSubmit} />
        </Center>
      </Flex>
    </Flex>
  );
}

export default App;
