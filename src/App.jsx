import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import ChatInput from "./components/chatInput";
import { db } from "./firebase/firebaseConfig.js";
import { useEffect, useState } from "react";
import chatTurbo from "./modules/chatTurbo";
import Chat from "./components/Chat";
import { Outlet, useParams } from "react-router-dom";

// FOR LATER: HOW TO ADD DATA TO FIRESTORE
// addDoc(collection(db, "messages"), input)
//   .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
//   })
//   .catch((err) => {
//     console.error("Error adding document: ", err);
//   });

// FOR LATER: HOW TO GET DATA FROM FIRESTORE
// const getData = () => {
//   getDocs(collection(db, "users"))
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         console.log(`${doc.id} => ${doc.data().first}`);
//       });
//     })
//     .catch((err) => {
//       console.error("Error getting Documents: ", err);
//     });
// };

//just for my visual pleasure, CHATS LOOK LIKE THIS:

[
  {
    id: "",
    name: "",
    messages: [
      { role: "system", content: "" },
      { role: "user", content: "" },
      { role: "assistant", content: "" },
    ],
  },
];

function App() {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isloading, setLoading] = useState(false);
  const { id } = useParams();

  //fetch chats
  useEffect(() => {
    //fetch chats from firestore
    const fetchData = async () => {
      const chatData = await getDocs(collection(db, "chats"));
      const chatArray = chatData.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      //update local state to match firestore
      setChats(chatArray);
    };

    fetchData();
  }, []);

  //SENDS THE USERS INPUT TO OPENAI TO PROCESS AND DISPLAY A REQUEST
  const handleSubmit = async (input) => {
    //if not on a specific chat then create a new chat and go to it

    const userMessage = { role: "user", content: input };

    //add message to currently selected document
    const chatRef = doc(db, "chats", id);
    await updateDoc(chatRef, { messages: arrayUnion(userMessage) });

    // prettier-ignore
    // const userMessage = [...messages, {"role": "user", "content": input}]

    // prettier-ignore
    // const data = await chatTurbo("You are a helpful assistant", userMessage);
    // setMessages([...userMessage, { role: "assistant", content: data }]);
  };

  const handleNewChat = async () => {
    //add new chat to firestore
    setLoading(true);
    addDoc(collection(db, "chats"), { name: "chat", message: [] })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((err) => {
        console.error("Error adding document: ", err);
      })
      .finally(setLoading(false));
  };

  return (
    <Flex minHeight="100vh">
      <Flex flex="1 1 0">
        <Flex width="100%" flexDirection="column">
          <Center position="sticky" top={0} bg="gray.700" py="20px">
            <Button onClick={handleNewChat}>New Chat</Button>
          </Center>
          {!isloading ? (
            chats.map((chat) => <Chat key={chat.id} data={chat}></Chat>)
          ) : (
            <Spinner />
          )}
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
          <Outlet />
          {/* {messages.map((message) => (
            <Center
              py={50}
              bg={message.role === "user" ? "gray.800" : "gray.700"}
              key={Math.random()}
            >
              <Center maxWidth="800px"> {message.content}</Center>
            </Center>
          ))} */}
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
