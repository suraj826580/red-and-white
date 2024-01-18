import React from "react";
import {
  Flex,
  Spacer,
  useDisclosure,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import AddBlog from "./AddBlog";
import { Link, useNavigate } from "react-router-dom";
import { AddIcon, ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import Profile from "./Profile";
const Navbar = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  return (
    <>
      <Profile onProfileClose={onProfileClose} isProfileOpen={isProfileOpen} />
      <AddBlog onClose={onClose} isOpen={isOpen} />
      <Flex p="3" mb={4} bg="red.400" color="white">
        <Link to="/dashboard">
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Blog App
          </span>
        </Link>
        <Spacer />

        <Menu bg={"red.400"} color="#000">
          <MenuButton
            as={IconButton}
            color={"white"}
            _hover={{
              bg: "red.300",
            }}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem
              icon={<CgProfile size={17} />}
              color={"#000"}
              onClick={onProfileOpen}>
              Profile
            </MenuItem>
            <MenuItem onClick={onOpen} icon={<AddIcon />} color={"#000"}>
              Add Blog
            </MenuItem>
            <MenuItem
              onClick={() => navigate("/my-dashboard")}
              icon={<ExternalLinkIcon />}
              color={"#000"}>
              My Blogs
            </MenuItem>
            <MenuItem
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              icon={<IoIosLogOut size={17} />}
              color={"#000"}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
};

export default Navbar;
