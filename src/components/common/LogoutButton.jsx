import { loadHook } from "@/utils/lattice-design";
import { Button, HStack, Text } from "@chakra-ui/react";
import { IoMdExit } from "react-icons/io";
import { useRouter as useNextNav } from "next/navigation";

export default function LogoutButton({ w = "70%" }) {
    const [usuario, setUsuario] = loadHook("useUsuario");
    const [_, setSidebarOpen] = loadHook("useSidebarOpen");
    const [loading, setLoading] = loadHook("useLoader");
    const nextNav = useNextNav();

    const handleLogout = () => {
        setSidebarOpen(false);
        setLoading(true);
        setTimeout(() => {
            setUsuario(null);
            localStorage.removeItem("usuario");
            setLoading(false);
            nextNav.push("/");
        }, 500);
    };

    return (
        <Button
            // bg="white"
            // color="pink.500"
            bg="pink.500"
            color="white"
            w={w}
            fontWeight={"bold"}
            p={"1rem"}
            borderRadius={"0.5rem"}
            shadow={"sm"}
            onClick={handleLogout}
        >
            <HStack>
                <Text>{"Cerrar sesión"}</Text>
                <IoMdExit />
            </HStack>
        </Button>
    );
}
