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
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import EditBlog from "../components/EditBlog";
import axios from "axios";

const Dashboard = () => {
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
        <Grid templateColumns="repeat(3, 1fr)" gap={6} w={"90%"} m="auto">
          {blogList.length > 0 ? (
            blogList.map((item, index) => {
              return (
                <GridItem key={index}>
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
                </GridItem>
              );
            })
          ) : (
            <Heading>No blog Found</Heading>
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
    </>
  );
};

export default Dashboard;
