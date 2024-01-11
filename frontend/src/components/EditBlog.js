import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../redux/update-blog/action";
import { getBlogList } from "../redux/get-blogs/action";
const EditBlog = ({ isOpen, onClose, onOpen, editdata }) => {
  const dispatch = useDispatch();
  const selector = useSelector((store) => {
    console.log(store.UpdateBlogReducer);
  });
  useEffect(() => {
    reset(editdata);
  }, [editdata]);
  const { register, reset, handleSubmit } = useForm();
  const toast = useToast();

  const handleSubmitFunc = (data) => {
    dispatch(updateBlog(data))
      .then((res) => {
        if (res.payload == "Blog Updated Successfully") {
          dispatch(getBlogList);
          onClose();

          toast({
            title: res.payload,
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        } else {
          toast({
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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={handleSubmit(handleSubmitFunc)}>
        <ModalContent>
          <ModalHeader>Edit your Blog</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input {...register("title")} placeholder="Title" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea {...register("content")} placeholder="Content" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Author Name</FormLabel>
              <Input {...register("author")} placeholder="Author Name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme="red" mr={3}>
              Update Blog
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default EditBlog;
