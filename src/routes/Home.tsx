import { Box, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

export default function Home() {
  return (
    <Grid
      mt={10}
      px={10}
      columnGap={4}
      rowGap={8}
      templateColumns={"repeat(2, 1fr)"}
    >
      <VStack alignItems={"flex-start"}>
        <Box overflow={"hidden"} rounded="3xl" mb={3}>
          <Image src="https://source.unsplash.com/random/400x400?house" />
        </Box>
        <Box>
          <Grid templateColumns={"5fr 1fr"}>
            <Text as="b" noOfLines={1} fontSize="md">
              Brålanda, Västra Götalands län, 스웨덴
            </Text>
            <HStack spacing={1}>
              <FaStar size={15} />
              <Text textAlign="end" fontSize="sm" color={"gray.600"}>
                3.9
              </Text>
            </HStack>
          </Grid>
          <Text fontSize="sm" color={"gray.600"}>
            Seoul, S. Korea
          </Text>
        </Box>
        <Text fontSize="sm" color={"gray.600"}>
          <Text as="b">$63</Text> / night
        </Text>
      </VStack>
    </Grid>
  );
}
