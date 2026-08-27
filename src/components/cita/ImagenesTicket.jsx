import { CDN } from "@/config/cdn";
import { loadHook } from "@/utils/lattice-design";
import { Text } from "@chakra-ui/react";
import { Badge, Heading, HStack, Image, VStack } from "@chakra-ui/react";
import { useRouter as useNextNav } from "next/navigation";
import { useEffect, useMemo } from "react";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

export default function ImagenesTicket({ cita }) {
  const [loading, setLoading] = loadHook("useLoader");
  const NextNav = useNextNav();
  // const [cita] = useCita();
  const statusBadgeColor = useMemo(() => {
    switch (cita.status) {
      case 1:
        return "yellow";
      case 2:
        return "green";
      case 0:
        return "red";
      default:
        return "gray";
    }
  }, [cita.status]);

  useEffect(() => {
      }, []);

  return (
    <VStack w={"100%"} gap={"0.5rem"} align={"start"}>
      <Heading
        onClick={() => {
          setLoading(true);
          NextNav.push(`/servicios/${cita.servicio_id}`);
        }}
        _hover={{
          textDecor: "underline",
          cursor: "pointer",
        }}
        color={"pink.700"}
        borderColor={"pink.700"}
        size={"2xl"}
      >
        {cita.servicio}
      </Heading>

      <Clienta nombre={`${cita.clienta_nombres} ${cita.clienta_apellidos}`} />

      <HStack justifyContent={"space-between"} w={"100%"}>
        <Lashista nombre={cita.lashista} foto={cita.lashista_foto} />
        <Badge
          shadow={"sm"}
          p={"0.5rem"}
          fontWeight={800}
          fontSize={"0.9rem"}
          colorPalette={statusBadgeColor}
        >
          {cita.status == 2 && "Confirmada"}
          {cita.status == 1 && "Pendiente"}
          {cita.status == 0 && "Cancelada"}
        </Badge>
      </HStack>
    </VStack>
  );
}

function Lashista({ foto, nombre }) {
  return (
    <HStack justifyContent={"start"} gap={"0.5rem"}>
      <Image
        shadow={"sm"}
        rounded={"full"}
        w={"2rem"}
        src={`${CDN}/img/lashistas/${foto}`}
      />
      <Heading size={"lg"} fontWeight={700}>
        {nombre}
      </Heading>
    </HStack>
  );
}

function Clienta({ nombre }) {
  return (
    <HStack justifyContent={"start"} gap={"0.5rem"}>
      <Text>Para:</Text>
      <Heading size={"lg"} fontWeight={700}>
        {nombre}
      </Heading>
    </HStack>
  );
}
