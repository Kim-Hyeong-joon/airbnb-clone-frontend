import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Skeleton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRoom } from "../api";
import { IRoomDetail } from "../types";

export default function RoomDetail() {
  const { roomPk } = useParams();
  const { isLoading, data } = useQuery<IRoomDetail>(["rooms", roomPk], getRoom);

  return (
    <Box
      mt={5}
      px={{
        base: "10",
        lg: "40",
      }}
    >
      <Skeleton h="43px" width="75%" isLoaded={!isLoading}>
        <Heading noOfLines={1}>{data?.name}</Heading>
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
            <Skeleton isLoaded={!isLoading} h="100%" w="100%">
              <Image
                objectFit={"cover"}
                w="100%"
                h="100%"
                src={data?.photos[index].file}
              />
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
