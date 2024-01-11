import React from "react";
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
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../redux/add-blogs/actions";
import { getBlogList } from "../redux/get-blogs/action";

export default function AddBlog({ isOpen, onClose }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { register, reset, handleSubmit } = useForm();
  const toast = useToast();
  const dispach = useDispatch();
  const handleSubmitfunc = (data) => {
    dispach(addBlog(data)).then((res) => {
      if (res.payload == "Blog Added Successfully") {
        dispach(getBlogList);
        onClose();
        return toast({
          title: res.payload,
          status: "success",
          duration: 1500,
          isClosable: true,
        });
      } else {
        return toast({
          title: "Something Went Wrong.",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
    });
    reset();
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={handleSubmit(handleSubmitfunc)}>
          <ModalContent>
            <ModalHeader>Create your Blog</ModalHeader>
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
                Add Blog
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
