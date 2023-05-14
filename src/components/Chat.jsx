import { Center, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Chat = ({ data, onDelete }) => {
  return (
    <Link to={"./" + data.id}>
      <Flex>
        <Center flex="1 1 auto">{data.name}</Center>
        <Center flex="1 1 auto">
          <FaTrash onClick={() => onDelete(data.id)} />
        </Center>
      </Flex>
    </Link>
  );
};

export default Chat;
