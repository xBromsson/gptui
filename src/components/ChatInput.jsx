import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({ onSubmit }) => {
  const [input, setInput] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSubmit(input);
    }
  };

  return (
    <InputGroup zIndex={1}>
      <Input
        onChange={(event) => {
          setInput(event.target.value);
        }}
        value={input}
        onKeyDown={handleKeyPress}
        placeholder="Send a Message"
        size="lg"
        bg="gray.700"
      ></Input>
      <InputRightElement>
        <FaPaperPlane
          onClick={(input) => {
            onSubmit(input);
          }}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default ChatInput;
