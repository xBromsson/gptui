import { Center, Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";

const Messages = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState();

  //fetch messages from related chat
  useEffect(() => {
    //fetch related messages from firestore
    const fetchData = async () => {
      const messages = await getDoc(collection(db, "chats", id));
      console.log(messages);
    };

    //update local state to match
  }, []);

  return (
    <Flex>
      {!isLoading ? (
        messages.map((message, index) => (
          <Center key={index} p={50}>
            {message.content}
          </Center>
        ))
      ) : (
        <Spinner />
      )}
    </Flex>
  );
};

export default Messages;
