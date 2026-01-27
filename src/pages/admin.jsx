import { Heading, VStack } from "@chakra-ui/react";
import { loadHook } from "@/utils/lattice-design";
import { useEffect } from "react";
import LogoutButton from "@/components/common/LogoutButton";

export default function Admin() {
    const [loading, setLoading] = loadHook("useLoader");
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <VStack gap={"2rem"} w={"100%"}>
            <Heading>Administración</Heading>
            <LogoutButton w={"15rem"}/>
        </VStack>
    );
}
