import {
  Button,
  Container,
  Heading,
  HStack,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { QueryFunction, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getReservation, GetReservationQueryKey } from "../api";
import Reservation from "../components/Reservation";

export interface IBooking {
  pk: string;
  user: string;
  check_in: string;
  check_out: string;
  experience_time: string;
  guests: number;
  room: string;
}

interface IForm {
  year: number;
  month: number;
}

export default function RoomReservation() {
  const { roomPk } = useParams();
  const { register, handleSubmit } = useForm<IForm>();
  const [formData, setFormData] = useState<IForm>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const { data: bookingsData, isLoading } = useQuery<
    IBooking[],
    unknown,
    IBooking[],
    GetReservationQueryKey
  >(["bookings", roomPk, formData], getReservation, {
    enabled: Boolean(formData),
  });
  const onSubmit = (data: IForm) => {
    setFormData(data);
  };
  console.log(bookingsData);
  return (
    <>
      {isLoading ? (
        <Spinner color="red.500" size="xl" />
      ) : (
        <Container>
          <HStack
            my="5"
            justifyContent={"center"}
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Select {...register("year")} defaultValue={formData.year} w="20%">
              <option value={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
              <option value={new Date().getFullYear() + 1}>
                {new Date().getFullYear() + 1}
              </option>
            </Select>
            <Select
              {...register("month")}
              w="20%"
              defaultValue={formData.month}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => {
                return (
                  <option key={month} value={month}>
                    {month}
                  </option>
                );
              })}
            </Select>
            <Button type="submit" colorScheme={"red"}>
              검색
            </Button>
          </HStack>
          <Heading textAlign={"center"}>
            {bookingsData?.length === 0
              ? "예약이 없습니다"
              : `Bookings: ${bookingsData ? bookingsData[0].room : null}`}
          </Heading>

          {bookingsData?.map((booking) => (
            <Reservation
              key={booking.pk}
              checkIn={booking.check_in}
              checkOut={booking.check_out}
              guests={booking.guests}
              user={booking.user}
            />
          ))}
        </Container>
      )}
    </>
  );
}
