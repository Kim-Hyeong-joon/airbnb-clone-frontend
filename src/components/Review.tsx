import {
  Avatar,
  Box,
  Heading,
  HStack,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IRoomOwner } from "../types";

interface IReviewProp {
  user: IRoomOwner;
  payload: string;
  rating: number;
  isReviewsLoading: boolean;
}

export default function Review({
  isReviewsLoading,
  user,
  payload,
  rating,
}: IReviewProp) {
  return (
    <Box>
      <HStack alignItems="flex-start">
        <Avatar src={user.avatar} mb="3" />
        <VStack alignItems={"flex-start"} justifyContent="flex-start">
          <Skeleton isLoaded={!isReviewsLoading} h="15">
            <Heading size={"sm"} mb="-3">
              {user.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isReviewsLoading}>
            <Text>★ {rating}</Text>
          </Skeleton>
        </VStack>
      </HStack>
      <Skeleton isLoaded={!isReviewsLoading}>
        <Text>{payload}</Text>
      </Skeleton>
    </Box>
  );
}
