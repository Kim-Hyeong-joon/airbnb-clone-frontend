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
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaBath, FaBed, FaWonSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  getAmenities,
  getCategories,
  IUplaodRoomVariables,
  IUploadError,
  uploadRoom,
} from "../api";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import { IAmenity, ICategory, IRoomDetail } from "../types";

export default function UploadRoom() {
  const { register, handleSubmit } = useForm<IUplaodRoomVariables>();
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation<IRoomDetail, IUploadError, IUplaodRoomVariables>(
    uploadRoom,
    {
      onSuccess: (data) => {
        toast({
          status: "success",
          position: "top",
          title: "Room Created",
        });
        navigate(`/rooms/${data.id}`);
      },
    }
  );
  const { isLoading: isAmenitiesLoading, data: amenities } = useQuery<
    IAmenity[]
  >(["amenities"], getAmenities);
  const { isLoading: isCategoriesLoading, data: categories } = useQuery<
    ICategory[]
  >(["categories"], getCategories);
  const onSubmit = (data: IUplaodRoomVariables) => {
    mutation.mutate(data);
  };
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
          <Container>
            <Heading w="100%" textAlign={"center"}>
              Upload Room
            </Heading>
            <VStack
              spacing={6}
              as="form"
              mt={5}
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormControl>
                <FormLabel>Name</FormLabel>
                <FormHelperText>Write the name of your room</FormHelperText>
                <Input
                  {...register("name", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  {...register("country", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  {...register("city", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  {...register("address", { required: true })}
                  required
                  type="text"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaWonSign />} />
                  <Input
                    {...register("price", { required: true })}
                    required
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Rooms</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBed />} />
                  <Input
                    {...register("rooms", { required: true })}
                    required
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Toilets</FormLabel>
                <InputGroup>
                  <InputLeftAddon children={<FaBath />} />
                  <Input
                    {...register("toilets", { required: true })}
                    required
                    type="number"
                    min={0}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description", { required: true })}
                  required
                />
              </FormControl>
              <FormControl>
                <Checkbox {...register("pet_friendly")}>Pet friendly</Checkbox>
              </FormControl>
              <FormControl>
                <FormLabel>Kind of room</FormLabel>
                <Select
                  required
                  {...register("kind", { required: true })}
                  placeholder="-- Choose a kind --"
                >
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
                <Select
                  required
                  {...register("category", { required: true })}
                  placeholder="-- Choose a category --"
                >
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
                      <Checkbox {...register("amenities")} value={amenity.pk}>
                        {amenity.name}
                      </Checkbox>
                      <FormHelperText>{amenity.description}</FormHelperText>
                    </Box>
                  ))}
                </Grid>
              </FormControl>
              {mutation.isError ? (
                <Text color={"red.500"}>Something went wrong</Text>
              ) : null}
              <Button
                isLoading={mutation.isLoading}
                type="submit"
                size={"lg"}
                w="100%"
                colorScheme={"red"}
              >
                Upload Room
              </Button>
            </VStack>
          </Container>
        </Box>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
