import { loadHook } from "@/utils/lattice-design";
import {
    VStack,
    Text,
    Button,
    HStack,
    Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { IoMdClose, IoMdExit } from "react-icons/io";
import NavbarItem from "./Layout/NavbarItem";

export default function Sidebar() {
    const [showMenu, setShowMenu] = useState(false);
    const [sidebarOpen, setSidebarOpen] = loadHook(
        "useSidebarOpen"
    );

    useEffect(() => {
        if (sidebarOpen) {
            setTimeout(() => {
                setShowMenu(true);
            }, 200);
        } else {
            setShowMenu(false);
        }
    }, [sidebarOpen]);

    return (
        <Box
            position={"absolute"}
            // justify={"space-between"}
            top={0}
            bg={"pink.600"}
            zIndex={100}
            right={0}
            bottom={0}
            w={sidebarOpen ? "40vw" : "0"}
            h={"100vh"}
            transition={"all ease 0.3s"}
        >
            <VStack
                w={"100%"}
                h={"100%"}
                justify={"space-between"}
                // display={showMenu ? "flex" : "none"}
                opacity={showMenu ? 1 : 0}
                padding={"4rem 3rem"}
                transition={"all ease 0.3s"}
            >
                <CloseButton />
                <MenuItems />
                <LogoutButton />
            </VStack>
        </Box>
    );
}

function MenuItems() {
    return (
        <VStack gap={"1rem"} align={"flex-end"} w={"100%"}>
            {NavBarLinks.map((link) => (
                <NavbarItem
                    key={link.title}
                    title={link.title}
                    pathname={link.pathname}
                />
            ))}
        </VStack>
    );
}

function LogoutButton() {
    const [usuario, setUsuario] = loadHook("useUsuario");
    const [_, setSidebarOpen] = loadHook("useSidebarOpen");
    const handleLogout = () => {
        setUsuario(null);
        setSidebarOpen(false);
    };

    return (
        <Button
            bg="white"
            color="pink.500"
            w={"70%"}
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
function CloseButton() {
    const [_, setSidebarOpen] = loadHook("useSidebarOpen");
    const [isHover, setIsHover] = useState(false);
    const opacity = isHover ? 1 : 0.6;
    const transform = isHover ? "scale(1.05)" : "scale(1)";
    const handleClose = () => {
        setSidebarOpen(false);
    };

    return (
        <IoMdClose
            onClick={handleClose}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{
                color: "white",
                cursor: "pointer",
                position: "absolute",
                top: "1rem",
                right: "1rem",
                opacity: opacity,
                transition: "all ease 0.3s",
                transform: transform,
            }}
            size={"1.5rem"}
        />
    );
}

const NavBarLinks = [
    {
        title: "Inicio",
        pathname: "/",
    },
    {
        title: "Citas",
        pathname: "/citas",
    },
    {
        title: "Clientas",
        pathname: "/clientas",
    },
    {
        title: "Servicios",
        pathname: "/servicios",
    },
    {
        title: "Lashistas",
        pathname: "/lashistas",
    },
    {
        title: "Disponibilidad",
        pathname: "/disponibilidad",
    },
];
