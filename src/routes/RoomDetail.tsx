import {
  Avatar,
  Box,
  Button,
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
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { checkBooking, getReviews, getRoom } from "../api";
import Review from "../components/Review";
import { IReview, IRoomDetail } from "../types";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaPencilAlt } from "react-icons/fa";

export default function RoomDefiltail() {
  const { roomPk } = useParams();
  const { isLoading: isRoomLoading, data: roomData } = useQuery<IRoomDetail>(
    ["rooms", roomPk],
    getRoom
  );
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >(["rooms", roomPk, "reviews"], getReviews);
  const [dates, setDates] = useState<Date[] | undefined>();
  const { isLoading: isBookingChecking, data: checkBookingData } = useQuery(
    ["check", roomPk, dates],
    checkBooking,
    {
      cacheTime: 0,
      enabled: dates !== undefined,
    }
  );

  const handleDateChange = (value: any) => {
    setDates(value);
  };
  return (
    <Box
      mt={5}
      px={{
        base: "10",
        lg: "40",
      }}
    >
      <Helmet>
        <title>{roomData ? roomData.name : "Loading"}</title>
      </Helmet>
      <HStack justifyContent={"space-between"}>
        <Skeleton h="43px" width="75%" isLoaded={!isRoomLoading}>
          <Heading noOfLines={1}>{roomData?.name}</Heading>
        </Skeleton>
        {roomData?.is_owner ? (
          <Link to={`/rooms/${roomPk}/edit`}>
            <Button colorScheme={"gray"}>
              <FaPencilAlt fontSize={"15"} />
            </Button>
          </Link>
        ) : null}
      </HStack>
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
              {roomData?.photos && roomData.photos.length > 0 ? (
                <Image
                  objectFit={"cover"}
                  w="100%"
                  h="100%"
                  src={roomData?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <Grid templateColumns={"2fr 1fr"} gap={20}>
        <Box>
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
          <Grid templateColumns={"1fr"} rowGap={10} columnGap={20}>
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
        <Box pt={10}>
          <Calendar
            onChange={handleDateChange}
            prev2Label={null}
            next2Label={null}
            minDetail="month"
            minDate={new Date()}
            maxDate={new Date(Date.now() + 60 * 60 * 24 * 7 * 4 * 6 * 1000)}
            selectRange
          />
          <Button
            my={5}
            w="100%"
            colorScheme={"red"}
            isLoading={isBookingChecking}
            isDisabled={!checkBookingData?.ok}
          >
            Make booking
          </Button>
          {!isBookingChecking && !checkBookingData?.ok ? (
            <Text color="red.500">Can't book on those dates, sorry.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
