import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile({ isProfileOpen, onProfileClose }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  // react-hook-form
  const { register, handleSubmit, reset, unregister, setValue } = useForm();

  // update the user details
  const handleSubmitFunc = (data) => {
    axios
      .patch(
        `${process.env.REACT_APP_URL}/user/update-user/${data._id}`,
        data,
        {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        }
      )
      .then((res) => {
        if (res.data.msg === "Profile Updated Sucessfully") {
          onProfileClose();
          setTimeout(() => {
            localStorage.removeItem("token");
            navigate("/sign-in");
            reset();
          }, 1500);
          return toast({
            title: res.data.msg,
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        } else {
          return toast({
            title: "Something Went Wrong!!!",
            status: "error",
            duration: 1500,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        toast({
          title: err.response.data.msg,
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      });
  };

  // get the user Details

  useEffect(() => {
    axios(`${process.env.REACT_APP_URL}/user/get-user`, {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    })
      .then((res) => {
        reset(res.data.user);
        unregister("password");
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isProfileOpen}
        onClose={onProfileClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(handleSubmitFunc)}>
            <ModalHeader>Edit Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input {...register("firstName")} type="text" />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input {...register("lastName")} type="text" />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" {...register("email")} />
                </FormControl>
                <FormControl id="old-password" isRequired>
                  <FormLabel>Old password</FormLabel>
                  <InputGroup>
                    <Input
                      {...register("old_password")}
                      type={showPassword ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...register("password")}
                      type={showPassword2 ? "text" : "password"}
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword2((showPassword) => !showPassword)
                        }>
                        {showPassword2 ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme={"red"} bg={"red.400"} mr={3}>
                Save
              </Button>
              <Button onClick={onProfileClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
