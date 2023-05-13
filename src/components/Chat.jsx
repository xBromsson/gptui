import { Center } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Chat = ({ data }) => {
  return (
    <Link to={"./" + data.id}>
      <Center>{data.name}</Center>
    </Link>
  );
};

export default Chat;
