import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}>
              The Blog App,
            </Text>
            <br />
            <Text as={"span"} color={"red.400"}>
              Post your blogs!
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            My app is a streamlined blog platform, allowing users to easily
            share their thoughts and experiences. With a user-friendly
            interface, it caters to both seasoned writers and casual bloggers,
            fostering a vibrant community of diverse voices.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}>
            <Button
              onClick={() => navigate("/sign-in")}
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}>
              Login
            </Button>

            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              onClick={() => navigate("/sign-up")}>
              Sign Up
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}>
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            p={10}
            overflow={"hidden"}>
            <Image
              alt={"Hero Image"}
              fit={"contain"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={"https://stackideas.cachefly.net/images/apps/2429/logo.png"}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
