import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface RoomProps {
  imageUrl: string;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
}

export default function Room({
  pk,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: RoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <Link to={`/rooms/${pk}`}>
      <VStack alignItems={"center"}>
        <Box position="relative" overflow={"hidden"} rounded="3xl" mb={3}>
          <Image minH="280" src={imageUrl} />
          <Button
            variant={"unstyled"}
            position="absolute"
            right={0}
            top={0}
            color="white"
          >
            <FaRegHeart cursor={"pointer"} size="24px" />
          </Button>
        </Box>
        <Box>
          <Grid templateColumns={"6fr 1fr"}>
            <Text textAlign={"start"} as="b" noOfLines={1} fontSize="md">
              {name}
            </Text>
            <HStack
              _hover={{
                color: "red.100",
              }}
              spacing={1}
              justifyContent="end"
            >
              <FaStar size={15} />
              <Text textAlign="end" fontSize="sm">
                {rating}
              </Text>
            </HStack>
          </Grid>
          <Text fontSize="sm" color={gray}>
            {city}, {country}
          </Text>
          <Text textAlign={"start"} fontSize="sm" color={gray}>
            <Text as="b">${price}</Text> / night
          </Text>
        </Box>
      </VStack>
    </Link>
  );
}
