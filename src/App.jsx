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
  deleteDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import ChatInput from "./components/ChatInput.jsx";
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
      { role: "system", content: "" }, //this actually isn't stored in the chat object
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

  //intial fetch of chats list
  useEffect(() => {
    //fetches chats from firestore
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

  //ON CHAT BOX SUBMISSION
  //SENDS THE USERS INPUT TO OPENAI TO PROCESS RETURN A REPONSE
  const handleSubmit = async (input) => {
    //if not on a specific chat then create a new chat and go to it
    //...code will go here

    console.log(input)

    // const userMessage = { role: "user", content: input }; ..

    //add message to currently selected document
    // const chatRef = doc(db, "chats", id); ..
    // await updateDoc(chatRef, { messages: arrayUnion(userMessage) }); ..

    // prettier-ignore
    // const userMessage = [...messages, {"role": "user", "content": input}]

    // prettier-ignore
    // const data = await chatTurbo("You are a helpful assistant", userMessage);
    // setMessages([...userMessage, { role: "assistant", content: data }]);
  };

  const handleNewChat = async () => {
    //add new chat to firestore
    setLoading(true);
    addDoc(collection(db, "chats"), { name: "chat", messages: [] })
      .then((docRef) => {
        //update local chat state
        setChats([
          ...chats,
          {
            id: docRef.id,
            name: "chat",
            messages: [],
          },
        ]);
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((err) => {
        console.error("Error adding document: ", err);
      })
      .finally(setLoading(false));
  };

  const handleChatDelete = async (id) => {
    //find and delete document from firestore
    await deleteDoc(doc(db, "chats", id));

    //update local state
    setChats(chats.filter((v) => v.id !== id));
  };

  return (
    <Flex minHeight="100vh">
      <Flex flex="1 1 0">
        <Flex width="100%" flexDirection="column">
          <Center position="sticky" top={0} bg="gray.700" py="20px">
            <Button onClick={handleNewChat}>New Chat</Button>
          </Center>
          {!isloading ? (
            chats.map((chat) => (
              <Chat
                key={chat.id}
                data={chat}
                onDelete={handleChatDelete}
              ></Chat>
            ))
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
