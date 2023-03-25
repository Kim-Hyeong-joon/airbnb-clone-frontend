import {
  Avatar,
  Box,
  Circle,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getReviews, getRoom } from "../api";
import Review from "../components/Review";
import { IReview, IRoomDetail } from "../types";

export default function RoomDefiltail() {
  const { roomPk } = useParams();
  const { isLoading: isRoomLoading, data: roomData } = useQuery<IRoomDetail>(
    ["rooms", roomPk],
    getRoom
  );
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >(["rooms", roomPk, "reviews"], getReviews);
  return (
    <Box
      mt={5}
      px={{
        base: "10",
        lg: "40",
      }}
    >
      <Skeleton h="43px" width="75%" isLoaded={!isRoomLoading}>
        <Heading noOfLines={1}>{roomData?.name}</Heading>
      </Skeleton>
      <Grid
        mt={5}
        templateColumns="repeat(4,1fr)"
        templateRows="1fr 1fr"
        h={{
          base: "40vh",
          lg: "60vh",
        }}
        gridGap={2}
        rounded={10}
        overflow="hidden"
      >
        {[0, 1, 2, 3, 4].map((index) => (
          <GridItem
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
            overflow={"hidden"}
            key={index}
          >
            <Skeleton isLoaded={!isRoomLoading} h="100%" w="100%">
              <Image
                objectFit={"cover"}
                w="100%"
                h="100%"
                src={roomData?.photos[index]?.file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack w="100%" justifyContent={"space-between"} mt={10}>
        <VStack alignItems={"flex-start"}>
          <Skeleton isLoaded={!isRoomLoading}>
            <Heading size={"lg"} noOfLines={1}>
              {roomData?.owner.name}님이 호스팅 하는 {roomData?.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isRoomLoading}>
            <HStack w="100%" justifyContent="flex-start">
              <Text>방 {roomData?.rooms}개</Text>
              <Text>∙</Text>
              <Text>욕실 {roomData?.toilets}개</Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar
          name={roomData?.owner.name}
          overflow={"hidden"}
          size={"lg"}
          src={roomData?.owner.avatar}
        />
      </HStack>
      <Divider mt={10} mb={10} />
      <Skeleton isLoaded={!isRoomLoading} w="50%">
        <HStack mb="10">
          <Heading size={"lg"}>★ {roomData?.rating}</Heading>
          <Heading size={"lg"}>∙</Heading>
          <Heading size={"lg"}>후기 {reviewsData?.length}개</Heading>
        </HStack>
      </Skeleton>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr 1fr",
        }}
        rowGap={10}
        columnGap={20}
      >
        {reviewsData?.map((review, index) => (
          <Review
            isReviewsLoading={isReviewsLoading}
            key={index}
            user={review.user}
            payload={review.payload}
            rating={review.rating}
          />
        ))}
      </Grid>
    </Box>
  );
}
