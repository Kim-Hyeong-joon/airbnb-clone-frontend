import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

export interface IBookingProp {
  user: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function Reservation({
  checkIn,
  checkOut,
  user,
  guests,
}: IBookingProp) {
  return (
    <Card my="5" variant={"outline"} size="md">
      <CardBody>
        <Stack divider={<StackDivider />}>
          <Text>체크인: {checkIn}</Text>
          <Text>체크아웃: {checkOut}</Text>
          <Text>게스트: {guests}</Text>
          <Text>예약자: {user}</Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
