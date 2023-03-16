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

interface RoomProps {
  key: number;
  index: number;
}

export default function Room({ index }: RoomProps) {
  const gray = useColorModeValue("gray.600", "gray.300");
  return (
    <VStack alignItems={"center"}>
      <Box position="relative" overflow={"hidden"} rounded="3xl" mb={3}>
        <Image
          minH="280"
          src={`https://source.unsplash.com/random/400x400?house/${index}`}
        />
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
            Brålanda, Västra Götalands län, 스웨덴
          </Text>
          <HStack spacing={1} justifyContent="end">
            <FaStar size={15} />
            <Text textAlign="end" fontSize="sm" color={gray}>
              3.9
            </Text>
          </HStack>
        </Grid>
        <Text fontSize="sm" color={gray}>
          Seoul, S. Korea
        </Text>
        <Text textAlign={"start"} fontSize="sm" color={gray}>
          <Text as="b">$63</Text> / night
        </Text>
      </Box>
    </VStack>
  );
}
