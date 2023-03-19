import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api";

export default function useUser() {
  const { isLoading, data, isError } = useQuery(["me"], getMe, {
    retry: false,
  });
  console.log("isLoading:", isLoading);
  console.log("isError:", isError);
  return {
    userLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
