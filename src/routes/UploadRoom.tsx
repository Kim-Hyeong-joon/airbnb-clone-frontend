import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { FaBath, FaBed, FaWonSign } from "react-icons/fa";
import { getAmenities, getCategories } from "../api";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IAmenity, ICategory } from "../types";

export default function UploadRoom() {
  const { isLoading: isAmenitiesLoading, data: amenities } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { isLoading: isCategoriesLoading, data: categories } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Container>
            <Heading w="100%" textAlign={"center"}>
              Upload Room
            </Heading>
            <VStack spacing={6} as="form" mt={5}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <FormHelperText>Write the name of your room</FormHelperText>
                <Input required type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input required type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input required type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input required type="text" />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaWonSign />} />
                  <Input required type="number" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input required type="number" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBath />} />
                  <Input required type="number" min={0} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea />
              </FormControl>
              <FormControl>
                <Checkbox>Pet friendly</Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <Select placeholder="-- Choose a kind --">
                  <option value="entire_place">Entire Place</option>
                  <option value="private_room">Private Room</option>
                  <option value="shared_room">Shared Room</option>
                </Select>
                <FormHelperText>
                  What kind of room are you renting?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select placeholder="-- Choose a category --">
                  {categories?.map((category) => (
                    <option key={category.pk} value={category.pk}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <FormHelperText>
                  What category describes your room?
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Amenities</FormLabel>
                <Grid templateColumns={"1fr 1fr"} gap="5">
                  {amenities?.map((amenity) => (
                    <Box key={amenity.pk}>
                      <Checkbox value={amenity.pk}>{amenity.name}</Checkbox>
                      <FormHelperText>{amenity.description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </FormControl>
              <Button size={"lg"} w="100%" colorScheme={"red"}>
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
