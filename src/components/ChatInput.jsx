import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = () => {
  return (
    <InputGroup>
      <Input width="100%" placeholder="Send a Message" size="lg"></Input>
      <InputRightElement>
        <FaPaperPlane />
      </InputRightElement>
    </InputGroup>
  );
};

export default ChatInput;
