import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadPhotos() {
  const { register, watch } = useForm();
  const { roomPk } = useParams();
  console.log(watch());
  return (
    <ProtectedPage>
      <HostOnlyPage>
        <Container>
          <Heading mt="10" mb="10" textAlign={"center"}>
            Upload a Photos
          </Heading>
          <VStack spacing={5} mt={10}>
            <FormControl>
              <Input
                required
                accept="image/*"
                {...register("file", { required: true })}
                type="file"
              />
            </FormControl>
            <Button w="100%" colorScheme={"red"}>
              Upload photos
            </Button>
          </VStack>
        </Container>
      </HostOnlyPage>
    </ProtectedPage>
  );
}
