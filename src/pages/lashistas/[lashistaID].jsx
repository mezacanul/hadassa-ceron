import Eventos from "@/components/clienta/Eventos";
import FotoLashistaInput from "@/components/lashista/FotoLashistaInput";
import LashistaForm from "@/components/lashista/LashistaForm";
import { loadHook } from "@/utils/lattice-design";
import { capitalizeFirst } from "@/utils/main";
import {
  Badge,
  Grid,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Lashista() {
  const router = useRouter();
  const { lashistaID } = router.query;
  const [loading, setLoading] = loadHook("useLoader");
  const [lashista, setLashista] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    return setLashista(null);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      fetchLashista();
    }
  }, [router.isReady]);

  const fetchLashista = async () => {
    const axiosResp = await axios.get(
      `/api/lashistas/${lashistaID}`
    );
    setLashista(axiosResp.data);
    setTitle(axiosResp.data.nombre);
    setLoading(false);
  };

  return (
    <Grid
      w={"100%"}
      gridTemplateColumns={"1fr 1fr"}
      gap={"2rem"}
    >
      {!lashista && (
        <Spinner
          size={"lg"}
          transform={"scale(1.2)"}
          color={"pink.500"}
        />
      )}
      {lashista && (
        <VStack alignItems={"start"}>
          <LashistaTitle
            lashista={lashista}
            title={title}
          />
          <FotoLashistaInput lashista={lashista} />
          <LashistaForm
            lashista={lashista}
            fetchLashista={fetchLashista}
          />
        </VStack>
      )}

      <Eventos w={"100%"} lashistaID={lashistaID} />
    </Grid>
  );
}

function LashistaTitle({ lashista, title }) {
  return (
    <VStack
      w={"100%"}
      alignItems={"start"}
      mb={"1rem"}
      gap={"0.5rem"}
    >
      <Heading size={"4xl"} color={"pink.500"}>
        {title}
      </Heading>
      {lashista && (
        <HStack gap={"0.7rem"}>
          <Badge
            px={3}
            fontSize={"0.8rem"}
            shadow={"sm"}
            fontWeight={600}
            colorPalette={
              lashista.isDeleted ? "gray" : "green"
            }
          >
            {lashista.isDeleted
              ? "Deshabilitada"
              : "Habilitada"}
          </Badge>
          <Badge
            px={3}
            fontSize={"0.8rem"}
            shadow={"sm"}
            fontWeight={600}
            colorPalette={"purple"}
          >
            {capitalizeFirst(lashista.rol)}
          </Badge>
        </HStack>
      )}
    </VStack>
  );
}
