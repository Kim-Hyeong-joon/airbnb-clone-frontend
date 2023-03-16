import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Skeleton,
  SkeletonText,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import Room from "../components/Room";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={10}
      columnGap={4}
      rowGap={8}
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
        xl: "repeat(4, 1fr)",
        "2xl": "repeat(5, 1fr)",
      }}
    >
      <Box>
        <Skeleton rounded="2xl" height={280} mb={6} />
        <SkeletonText w="50%" noOfLines={3} />
      </Box>
      <Box>
        <Skeleton rounded="2xl" height={280} mb={6} />
        <SkeletonText w="50%" noOfLines={3} />
      </Box>
      <Box>
        <Skeleton rounded="2xl" height={280} mb={6} />
        <SkeletonText w="50%" noOfLines={3} />
      </Box>
      <Room key={1} index={1} />
    </Grid>
  );
}
