import { Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { IRoomOwner } from "../types";

interface IReviewProp {
  user: IRoomOwner;
  payload: string;
  rating: number;
}

export default function Review({ user, payload, rating }: IReviewProp) {
  return (
    <Box>
      <HStack alignItems="flex-start">
        <Avatar src={user.avatar} mb="3" />
        <VStack alignItems={"flex-start"} justifyContent="flex-start">
          <Heading size={"sm"} mb="-3">
            {user.name}
          </Heading>
          <Text>★ {rating}</Text>
        </VStack>
      </HStack>
      <Text>{payload}</Text>
    </Box>
  );
}
