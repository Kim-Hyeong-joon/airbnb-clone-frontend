import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(kakaoLogin, {
    onSuccess: () => {
      toast({
        status: "success",
        title: "어서오세요!",
        description: "와주셨군요!",
        position: "top",
      });
      queryClient.refetchQueries(["me"]);
      navigate("/");
    },
    onError: () => {
      navigate("/");
      toast({
        status: "error",
        variant: "subtle",
        title: "오류가 발생했습니다.",
        description: "다시 시도해주세요",
        position: "top",
      });
    },
  });
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      mutation.mutate(code);
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt="40">
      <Heading>Processing log in...</Heading>
      <Text>Don't go anywhere.</Text>
      <Spinner size="xl" />
    </VStack>
  );
}
