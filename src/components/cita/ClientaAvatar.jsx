import { CDN } from "@/config/cdn";
import { useCita } from "@/pages/citas/[citaID]";
import { loadHook } from "@/utils/lattice-design";
import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useRouter as useNextNav } from "next/navigation";

export default function ClientaAvatar({
  clientaID,
  foto,
  nombres,
  apellidos,
  lada,
  telefono,
}) {
  const [loading, setLoading] = loadHook("useLoader");
  const NextNav = useNextNav();
  // const [cita] = useCita();

  return (
    <VStack align={"start"} gap={"0"}>
      <HStack align={"center"} gap={"1rem"}>
        <Image
          shadow={"md"}
          mb={"1.7rem"}
          rounded={"lg"}
          w={"5rem"}
          src={`${CDN}/img/clientas/${foto || "avatar-woman.png"}`}
        />
        <VStack justifyContent={"center"} align={"start"} gap={"0.5rem"}>
          <Heading
            color={"pink.700"}
            _hover={{
              textDecor: "underline",
              cursor: "pointer",
            }}
            onClick={() => {
              NextNav.push(`/clientas/${clientaID}`);
              setLoading(true);
            }}
            // borderWidth={"0 0 2px"}
            borderColor={"pink.700"}
            size={"2xl"}
          >{`${nombres} ${apellidos}`}</Heading>
          <Text opacity={0.6} fontSize={"sm"}>
            +{`${lada} ${telefono}`}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}
