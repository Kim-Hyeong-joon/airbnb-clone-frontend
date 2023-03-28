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
import { FaCamera, FaRegHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

interface RoomProps {
  imageUrl: string;
  isOwner: boolean;
  name: string;
  rating: number;
  city: string;
  country: string;
  price: number;
  pk: number;
}

export default function Room({
  pk,
  isOwner,
  imageUrl,
  name,
  rating,
  city,
  country,
  price,
}: RoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  const navigate = useNavigate();
  const onCameraClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(`/rooms/${pk}/photos`);
  };
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
            onClick={onCameraClick}
          >
            {isOwner ? <FaCamera size="24px" /> : <FaRegHeart size="24px" />}
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
