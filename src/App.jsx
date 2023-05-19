import {
  Box,
  Button,
  Center,
  CircularProgress,
  Flex,
  Progress,
  Spinner,
  VStack,
} from "@chakra-ui/react";
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
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";

import "./index.css";

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
  const [isLoading, setLoading] = useState(false);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState();

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={atomDark}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, "")}
          {...props}
        />
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const handleInput = (input) => {
    setLoading(true);
    console.log(input);
    setChat((prevChat) => [...prevChat, { role: "user", content: input }]);

    const inputArray = [...chat, { role: "user", content: input }];

    chatTurbo(
      "You are a helpful assistant. If your response contains any programming languages you must always enclose it in ``` followed by the programming language name. for example: ```jsx <component />```",
      inputArray
    )
      .then((response) => {
        // Add the assistant's response to the chat state
        setChat((prevChat) => [
          ...prevChat,
          { role: "assistant", content: response },
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching response:", error);
      })
      .finally();
  };

  console.log(chat);

  return (
    <Flex justify="center" height="100vh">
      <Flex flex="1 1 auto" maxWidth="800px" flexDirection="column">
        <Center
          bgGradient={"linear(to right, gray.800, gray.700, gray.800 )"}
          p="5px"
        >
          Chat GPT 3.5
        </Center>

        <VStack pb="175px" flex="1 1 auto">
          {chat.map((message) => (
            <Box
              p="25px"
              width="100%"
              key={message.content}
              bgGradient={
                message.role === "user"
                  ? "linear(gray.800, gray.800)"
                  : "linear(to right, gray.800, gray.700, gray.800 )"
              }
            >
              <ReactMarkdown
                remarkPlugins={[gfm]}
                components={components}
                className="markdown-content"
              >
                {message.content}
              </ReactMarkdown>
            </Box>
          ))}

          {isLoading ? (
            <Center
              bgGradient="linear(to-r, gray.800, gray.700, gray.800)"
              p="25px"
              width="100%"
            >
              <Progress w={200} size="xs" isIndeterminate />
            </Center>
          ) : null}
        </VStack>
      </Flex>
      <Flex w="100%" maxWidth="800px" position="fixed" bottom="50px">
        <Center flex="1 1 auto">
          <ChatInput onSubmit={handleInput}></ChatInput>
        </Center>
      </Flex>
    </Flex>
  );
}

export default App;
