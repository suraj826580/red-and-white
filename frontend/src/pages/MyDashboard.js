import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBlogList } from "../redux/get-blogs/action";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Grid,
  GridItem,
  Skeleton,
  Heading,
  Text,
  Stack,
  useDisclosure,
  useToast,
  Flex,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditBlog from "../components/EditBlog";
import axios from "axios";

const MyDashboard = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editdata, seteditdata] = useState({});
  const dispatch = useDispatch();
  const { isLoading, blogList } = useSelector((store) => store.blogReducer);

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_URL}/blogs/delete-blog/${id}`, {
        headers: { Authorization: JSON.parse(localStorage.getItem("token")) },
      })
      .then((res) => {
        if (res.data.message == "Blog Deleted Successfully") {
          dispatch(getBlogList);
          return toast({
            title: res.data.message,
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        } else {
          return toast({
            title: "Something went wrong !!",
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleEdit(data) {
    seteditdata(data);
    onOpen();
  }

  useEffect(() => {
    dispatch(getBlogList);
  }, []);
  return (
    <>
      <EditBlog
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        editdata={editdata}
      />
      {!isLoading ? (
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          w={"90%"}
          m="auto">
          {blogList.length > 0 ? (
            blogList.map((item, index) => {
              return (
                <>
                  <GridItem
                    py={4}
                    key={index}
                    w={"450px"}
                    minH={"300px"}
                    maxH={"300px"}
                    overflow={"auto"}
                    mb={10}>
                    <Card
                      maxW="sm"
                      boxShadow="lg"
                      borderRadius="md"
                      minHeight="150px"
                      overflow="hidden"
                      color={"#000"}
                      className="hover-card"
                      bgGradient="linear(to-r, red.200, #fff)">
                      <CardBody>
                        <Flex
                          justifyContent={"space-between"}
                          borderBottom="1px solid"
                          alignItems={"center"}
                          pb={2}
                          mb={4}>
                          <Heading size="sm" fontWeight="bold" color="#000">
                            {item.title}
                          </Heading>
                          <Heading as="h6" size="xs" color="red.400">
                            {item.author}
                          </Heading>
                        </Flex>
                        <Text color="#000" fontSize="sm">
                          {item.content}
                        </Text>
                      </CardBody>
                      {/* <Divider /> */}
                      <CardFooter justify="flex-end">
                        <ButtonGroup spacing="2">
                          <Button
                            onClick={() => handleEdit(item)}
                            variant="solid"
                            colorScheme="red"
                            size={"sm"}
                            leftIcon={<EditIcon />}>
                            Edit
                          </Button>
                          <Button
                            size={"sm"}
                            onClick={() => handleDelete(item._id)}
                            variant="outline"
                            colorScheme="red"
                            leftIcon={<DeleteIcon />}>
                            Delete
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                      <style jsx>{`
                        .hover-card {
                          transition: transform 0.3s ease-in-out;
                        }

                        .hover-card:hover {
                          transform: translateY(-10px);
                        }
                      `}</style>
                    </Card>
                  </GridItem>
                  {/* <GridItem key={index}>
                    <Card maxW="sm">
                      <CardBody>
                        <Flex justifyContent={"between"}>
                          <Heading size="md">{item.title}</Heading>
                        </Flex>
                        <Text>{item.content}</Text>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing="2">
                          <Button
                            onClick={() => handleEdit(item)}
                            variant="solid"
                            colorScheme="red"
                            leftIcon={<EditIcon />}>
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDelete(item._id)}
                            variant="outline"
                            colorScheme="red"
                            leftIcon={<DeleteIcon />}>
                            Delete
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                  </GridItem> */}
                </>
              );
            })
          ) : (
            <Box>
              <Flex
                minH={"100vh"}
                width={"85vw"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Heading>No blog Found</Heading>
              </Flex>
            </Box>
          )}
        </Grid>
      ) : (
        <Stack>
          {new Array(20).fill(0).map((item, index) => (
            <>
              <Skeleton key={index}>
                <div>contents wrapped</div>
                <div>won't be visible</div>
              </Skeleton>
            </>
          ))}
        </Stack>
      )}
      <style jsx>{`
        /* Hide scrollbar for Chrome, Safari, and Edge */
        ::-webkit-scrollbar {
          width: 0;
          background: transparent; /* make scrollbar transparent */
        }

        /* Optional: Hide scrollbar for Firefox */
        /* Firefox 64 and earlier */
        html {
          scrollbar-width: none;
        }

        /* Firefox 65+ */
        html {
          scrollbar-color: transparent transparent;
        }
      `}</style>
    </>
  );
};

export default MyDashboard;
