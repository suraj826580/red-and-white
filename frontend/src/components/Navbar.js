import React from "react";
import {
  Flex,
  Box,
  Spacer,
  Button,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import AddBlog from "./AddBlog";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <AddBlog onClose={onClose} isOpen={isOpen} />
      <Flex p="3" mb={4} bg="red.400" color="white">
        <Box>
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Blog App
          </span>
        </Box>
        <Spacer />
        <Stack direction={"row"} spacing={2}>
          <Button onClick={onOpen} colorScheme="red.400" variant="outline">
            Add Blog
          </Button>
          <Button
            colorScheme="red.400"
            variant="outline"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/sign-in");
            }}>
            Logout
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default Navbar;
