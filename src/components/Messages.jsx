import { Center, Flex, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";
import { FaTrash } from "react-icons/fa";
import ChatInput from "./ChatInput.jsx";
import chatTurbo from "../modules/chatTurbo.js";

const Messages = (onSubmit) => {
  const { id } = useParams();
  const [chat, setChat] = useState();
  const [isLoading, setLoading] = useState(true);

  //fetch specific Chat
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getDoc(doc(db, "chats", id));
      setChat(data.data());
      setLoading(false);
      console.log(chat);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (input) => {
    const userMessage = { role: "user", content: input };
    const messagesArray = [...chat.messages, userMessage];

    //updates firebase chat with new user message
    await updateDoc(doc(db, "chats", id), {
      messages: arrayUnion(userMessage),
    });

    //get response from openai api
    const data = await chatTurbo("You are a helpful assistant", messagesArray);
    setChat({
      ...chat,
      messages: [
        ...chat.messages,
        userMessage,
        { role: "assistant", content: data },
      ],
    });

    //updates local chat messages
    // setChat({ ...chat, messages: [...chat.messages, userMessage] });
  };

  const handleTrash = async () => {
    //clear all messages from the chat in firestore
    await updateDoc(doc(db, "chats", id), { messages: [] });

    //update local state to match
    setChat({ ...chat, messages: [] });
  };

  return (
    <>
      <Center
        px={50}
        position="sticky"
        top={0}
        width="100%"
        bgColor={"gray.700"}
      >
        Chat
      </Center>
      <Flex flex="1 1 auto" flexDirection="column">
        <VStack>
          {!isLoading ? (
            chat.messages.map((message, index) => (
              <Center key={index} p={50}>
                {message.content}
              </Center>
            ))
          ) : (
            <Spinner />
          )}
        </VStack>
      </Flex>
      <Flex
        width="100%"
        maxWidth="800px"
        position="fixed"
        bottom={5}
        justify="center"
        align="center"
        gap="10px"
      >
        <ChatInput onSubmit={handleSubmit} />
        <FaTrash onClick={handleTrash} />
      </Flex>
    </>
  );
};

export default Messages;
