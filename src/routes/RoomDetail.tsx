import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Skeleton,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  checkBooking,
  getReviews,
  getRoom,
  IReserveBooking,
  IReserveError,
  IReserveSuccess,
  reserveBooking,
} from "../api";
import Review from "../components/Review";
import { IReview, IRoomDetail } from "../types";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { FaPencilAlt, FaUserFriends } from "react-icons/fa";
import { useForm } from "react-hook-form";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading: isRoomLoading, data: roomData } = useQuery<IRoomDetail>(
    ["rooms", roomPk],
    getRoom
  );
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >(["rooms", roomPk, "reviews"], getReviews);
  const [dates, setDates] = useState<Date[] | undefined>();
  // Checking the dates are valid immediately
  const {
    isLoading: isBookingChecking,
    data: checkBookingData,
    refetch,
  } = useQuery(["check", roomPk, dates], checkBooking, {
    cacheTime: 0,
    enabled: dates !== undefined,
  });
  const handleDateChange = (value: any) => {
    setDates(value);
  };
  // Reserving booking
  const toast = useToast();
  const mutation = useMutation<IReserveSuccess, IReserveError, IReserveBooking>(
    reserveBooking,
    {
      onSuccess: (data) => {
        refetch();
        toast({
          position: "top",
          status: "success",
          title: "Reserved room",
          description: `room: ${data.room}, check in: ${data.check_in} check out: ${data.check_out}`,
        });
      },
      onError: (error) => console.log(error),
    }
  );
  interface IGuest {
    guests: number;
  }
  const { register, watch, handleSubmit } = useForm<IGuest>();

  const onReservationSubmit = (data: IGuest) => {
    if (dates && roomPk) {
      const guests = data.guests;
      console.log(guests);
      mutation.mutate({ dates, roomPk, guests });
    }
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
                  src={roomData?.photos[index]?.file}
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
              <Heading size={"lg"}>후기 {roomData?.reviews_count}개</Heading>
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
          <VStack as="form" onSubmit={handleSubmit(onReservationSubmit)}>
            <FormControl>
              <FormLabel>Guests</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaUserFriends />} />
                <Input
                  {...register("guests", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              my={5}
              w="100%"
              colorScheme={"red"}
              isLoading={isBookingChecking}
              isDisabled={!checkBookingData?.ok && Boolean(dates)}
            >
              Make booking
            </Button>
          </VStack>
          {localStorage.getItem("token") ? (
            <Link to={`/rooms/${roomPk}/reservations`}>
              <Button colorScheme={"pink"} mt="5" w="100%">
                {roomData?.is_owner ? "방 예약 현황" : "나의 예약 현황"}
              </Button>
            </Link>
          ) : null}

          {!isBookingChecking && !checkBookingData?.ok ? (
            <Text color="red.500">Can't book on those dates, sorry.</Text>
          ) : null}
        </Box>
      </Grid>
    </Box>
  );
}
