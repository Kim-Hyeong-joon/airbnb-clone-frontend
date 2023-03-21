import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { FaAirbnb, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { logOut } from "../api";
import useUser from "../lib/useUser";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const onLogOut = async () => {
    const toastId = toast({
      title: "로그아웃 중..",
      description: "우리 이제 언제봐요..?",
      status: "loading",
      variant: "subtle",
      position: "top",
    });
    await logOut();
    queryClient.refetchQueries(["me"]);
    toast.update(toastId, {
      title: "로그아웃 완료",
      description: "다음에 또 봐요!",
      status: "success",
      variant: "subtle",
      position: "top",
    });
  };
  return (
    <HStack
      justifyContent={"space-between"}
      py={5}
      px={{
        base: "10",
        lg: "40",
      }}
      borderBottomWidth={1}
      alignItems="center"
    >
      <Link to="/">
        <Box color={logoColor}>
          <FaAirbnb size={"48"} />
        </Box>
      </Link>
      <HStack spacing={2}>
        <IconButton
          onClick={toggleColorMode}
          variant={"ghost"}
          aria-label="Toggle dark mode"
          icon={<Icon />}
        />
        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Button onClick={onSignUpOpen} colorScheme={"red"}>
                  Sign up
                </Button>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatar} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>
      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      <SignUpModal isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </HStack>
  );
}
