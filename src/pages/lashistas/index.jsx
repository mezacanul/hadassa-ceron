import { loadHook } from "@/utils/lattice-design";
import {
  capitalizeFirst,
  formatHorario,
} from "@/utils/main";
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillPicture } from "react-icons/ai";
import { useRouter as useNextNav } from "next/navigation";
import { CDN } from "@/config/cdn";
import ModalNuevaLashista from "@/components/lashista/ModalNuevaLashista";

export default function Lashistas() {
  const [lashistas, setLashistas] = useState(null);
  const [loading, setLoading] = loadHook("useLoader");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/lashistas?fetchAll=true")
      .then((lashistasResp) => {
        //   console.log(lashistasResp.data);
        setLashistas(lashistasResp.data);
        setLoading(false);
      });
  }, []);

  return (
    <Box w={"100%"}>
      <Box w={"70%"} m={"auto"}>
        <Button
          onClick={() => setOpen(true)}
          bg={"pink.500"}
          color={"white"}
          mb={"2rem"}
        >
          Agregar Lashista
        </Button>

        <ModalNuevaLashista
          open={open}
          setOpen={setOpen}
          setLashistas={setLashistas}
        />

        {lashistas && (
          <LashistasTable lashistas={lashistas} />
        )}
      </Box>
    </Box>
  );
}

function LashistasTable({ lashistas }) {
  return (
    <Table.Root
      size="md"
      // striped
      variant={"outline"}
      bg={"white"}
    >
      <Table.Header>
        <Table.Row bg={"pink.500"}>
          <Table.ColumnHeader
            color={"white"}
          ></Table.ColumnHeader>
          <Table.ColumnHeader color={"white"}>
            Lashista
          </Table.ColumnHeader>
          <Table.ColumnHeader color={"white"}>
            Lunes a Viernes
          </Table.ColumnHeader>
          <Table.ColumnHeader color={"white"}>
            Sábado
          </Table.ColumnHeader>
          <Table.ColumnHeader color={"white"}>
            Rol
          </Table.ColumnHeader>
          {/* <Table.ColumnHeader color={"white"}>
                        Acciones
                    </Table.ColumnHeader> */}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {lashistas.map((lashista, i) => (
          <LashistaRow key={i} lashista={lashista} />
        ))}
      </Table.Body>
    </Table.Root>
  );
}

function LashistaRow({ lashista }) {
  const [loading, setLoading] = loadHook("useLoader");
  const NextNav = useNextNav();

  const horariosLV = JSON.parse(lashista.horarioLV);

  return (
    <Table.Row
      _hover={{
        bg: "pink.100",
        textDecor: "underline",
        cursor: "pointer",
      }}
      onClick={() => {
        setLoading(true);
        NextNav.push(`/lashistas/${lashista.id}`);
      }}
    >
      <Table.Cell py={"1rem"}>
        <VStack alignItems={"center"}>
          <Image
            borderRadius={"50%"}
            w={"4rem"}
            // rounded={"md"}
            src={`${CDN}/img/lashistas/${lashista.image}`}
          />
        </VStack>
      </Table.Cell>
      <Table.Cell>
        <VStack alignItems={"start"}>
          <Heading size={"md"}>{lashista.nombre}</Heading>
          <Badge
            colorPalette={
              lashista.isDeleted ? "gray" : "green"
            }
          >
            {lashista.isDeleted
              ? "Deshabilitada"
              : "Habilitada"}
          </Badge>
        </VStack>
      </Table.Cell>
      <Table.Cell>
        {horariosLV.map((hr) => {
          return (
            <Text
              mb={horariosLV.length > 1 ? "1rem" : ""}
              key={hr}
            >
              {formatHorario(hr)}
            </Text>
          );
        })}
      </Table.Cell>
      <Table.Cell>
        {formatHorario(lashista.horarioSBD)}
      </Table.Cell>
      <Table.Cell fontWeight={700}>
        {capitalizeFirst(lashista.rol)}
      </Table.Cell>
    </Table.Row>
  );
}
