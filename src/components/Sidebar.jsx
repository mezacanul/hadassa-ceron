import { loadHook } from "@/utils/lattice-design";
import {
  VStack,
  Text,
  Button,
  HStack,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { IoMdClose, IoMdExit } from "react-icons/io";
import NavbarItem from "./Layout/NavbarItem";
import LogoutButton from "./common/LogoutButton";

export default function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = loadHook("useSidebarOpen");
  const isMobile = useBreakpointValue({ base: true, md: false });

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
    <>
      <style>
        {`
            html {
                overflow-y: ${sidebarOpen ? "hidden" : "auto"} !important;
            }
        `}
      </style>
      <Box
        position={"absolute"}
        // justify={"space-between"}
        top={0}
        //   bg={"pink.600"}
        bg={"white"}
        boxShadow={"-6px 3px 8px rgba(0,0,0,0.07)"}
        zIndex={10}
        right={0}
        bottom={0}
        w={sidebarOpen ? ["100%", "40vw"] : "0"}
        h={"100dvh"}
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
          <MenuItems isMobile={isMobile} />
          <LogoutButton />
        </VStack>
      </Box>
    </>
  );
}

function MenuItems({ isMobile }) {
  const items = useMemo(() => {
    const filtered = NavBarLinks.filter((link) => {
      return isMobile ? mobileItems.includes(link.pathname) : true;
    });
    return filtered;
  }, [isMobile]);

  return (
    <VStack gap={"1rem"} align={"flex-end"} w={"100%"}>
      {items.map((link) => (
        <NavbarItem
          key={link.title}
          title={link.title}
          pathname={link.pathname}
        />
      ))}
    </VStack>
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
        color: "gray",
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

const mobileItems = ["/", "/admin"];

const NavBarLinks = [
  {
    title: "Inicio",
    pathname: "/",
  },
  {
    title: "Admin",
    pathname: "/admin",
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
