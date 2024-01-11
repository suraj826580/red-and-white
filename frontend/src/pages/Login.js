import React from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../redux/sign-in/actions.js";
import { Spinner } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  // states
  const [showPassword, setShowPassword] = React.useState(false);
  // react-redux-form
  const { register, handleSubmit, reset } = useForm();
  // redux
  const dispatch = useDispatch();
  const { isLoading } = useSelector((store) => {
    return store.AuthReducer;
  });

  // function
  const handleSubmitFunc = (data) => {
    dispatch(getAuth(data)).then((res) => {
      if (res?.payload?.msg == "Login successful") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
        return toast({
          title: res?.payload?.msg,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      } else {
        return toast({
          title: "Something went wrong",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
    });
    reset();
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <form onSubmit={handleSubmit(handleSubmitFunc)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email")} />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register("password")}
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
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}>
                  <Checkbox>Remember me</Checkbox>
                  <Text color={"red.400"}>Forgot password?</Text>
                </Stack>
                <Button
                  type="submit"
                  colorScheme={"red"}
                  bg={"red.400"}
                  color={"white"}
                  _hover={{
                    bg: "red.500",
                  }}>
                  {!isLoading ? "Sign in" : <Spinner size="sm" />}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
