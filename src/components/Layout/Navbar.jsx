import { loadHook } from "@/utils/lattice-design";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRouter as useNextNav } from "next/navigation";
import {
    useCitaID,
    useMetodoPago,
    useAgendarLoading,
} from "@/components/agendar-cita/OrderSummary";
import FechaLogo from "@/components/FechaLogo";
import {
    Button,
    Heading,
    HStack,
    Text,
    Grid,
    Link,
    useToken,
} from "@chakra-ui/react";
import { LuCalendarPlus } from "react-icons/lu";
import { FaHouseChimney } from "react-icons/fa6";
import { format, parse } from "date-fns";
import NavbarItem from "@/components/Layout/NavbarItem";
import { RxHamburgerMenu } from "react-icons/rx";

export default function NavBar({ h }) {
    const [selectedDate] = loadHook("useSelectedDate");
    const NextNav = useNextNav();
    const router = useRouter();
    const [events] = loadHook("useEvents");
    const [loading, setLoading] = loadHook("useLoader");
    const [DOM, setDOM] = loadHook("useDOM");
    const pink = useToken("colors", "pink.500");
    const [_, setSidebarOpen] = loadHook("useSidebarOpen");
    const [citaID, setCitaID] = useCitaID();
    const [mp, setMp] = useMetodoPago();
    const [agendarLoading, setAgendarLoading] =
        useAgendarLoading();

    useEffect(() => {
        console.log("route", router);
    }, [router]);

    useEffect(() => {
        setDOM({ title: PathnameToTitle[router.pathname] });
    }, [router.pathname]);

    function goToAgendar() {
        setLoading(true);
        console.log("events", events);

        const parsedDate = parse(
            selectedDate,
            "yyyy-MM-dd",
            new Date()
        );
        const formattedDate = format(
            parsedDate,
            "dd-MM-yyyy"
        );
        console.log(
            selectedDate,
            parsedDate,
            formattedDate
        );
        // console.log(formattedDate); // "26-04-2025"
        NextNav.push(`/nueva-cita/${formattedDate}`);
    }

    function goToInicio() {
        setMp([]);
        setCitaID(null);
        setAgendarLoading(null);
        setLoading(true);
        NextNav.push("/");
    }

    return (
        <Grid
            boxShadow={"-3px 3px 10px rgba(0,0,0,0.05)"}
            px={"2rem"}
            templateColumns="3fr 2fr"
            gap={"2.5rem"}
            w={"100%"}
            py={"1rem"}
            position={"sticky"}
            top={0}
            bg={"white"}
            zIndex={10}
            borderBottom={"2px solid #ec4899"}
        >
            <HStack
                gap={"2rem"}
                // justify={"space-between"}
            >
                {router.pathname == "/" && (
                    <FechaLogo
                        selectedDate={selectedDate}
                    />
                )}
                {router.pathname != "/" && (
                    <Heading
                        fontWeight={300}
                        size={"4xl"}
                        fontStyle={"italic"}
                    >
                        {PathnameToHeading[router.pathname]}
                    </Heading>
                )}
                {/* format(info.date, "yyyy-MM-dd"); */}
                {router.pathname == "/" && (
                    <Button
                        bg={"pink.500"}
                        onClick={goToAgendar}
                    >
                        <HStack>
                            <Text
                                fontSize={"1rem"}
                            >{`Agendar`}</Text>
                            <LuCalendarPlus />
                        </HStack>
                    </Button>
                )}
            </HStack>

            <HStack
                w={"100%"}
                gap={"1rem"}
                justify={"flex-end"}
                align={"center"}
            >
                {NavBarLinks.map((link) => (
                    <NavbarItem
                        key={link.title}
                        title={link.title}
                        pathname={link.pathname}
                    />
                ))}
                {/* <RxHamburgerMenu
                    onClick={() => {
                        setSidebarOpen(true);
                    }}
                    style={{
                        color: pink,
                        cursor: "pointer",
                    }}
                    size={"1.8rem"}
                /> */}
            </HStack>
        </Grid>
    );
}

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

const PathnameToTitle = {
    "/": "Hadassa Cerón | Inicio",
    "/nueva-cita/[date]": "Agendar Cita",
    "/citas": "Citas",
    "/citas/[citaID]": "Cita",
    "/clientas": "Clientas",
    "/clientas/[clientaID]": "Clienta",
    "/lashistas": "Lashistas",
    "/lashistas/[lashistaID]": "Lashista",
    "/servicios": "Servicios",
    "/servicios/[servicioID]": "Servicio",
    "/disponibilidad": "Disponibilidad",
    "/admin": "Administración",
    "/dev": "Developer",
};

const PathnameToHeading = {
    "/nueva-cita/[date]": "Agendar Cita",
    "/citas": "Citas",
    "/citas/[citaID]": "Cita",
    "/clientas": "Clientas",
    "/clientas/[clientaID]": "Clienta",
    "/lashistas": "Lashistas",
    "/lashistas/[lashistaID]": "Lashista",
    "/servicios": "Servicios",
    "/servicios/[servicioID]": "Servicio",
    "/disponibilidad": "Disponibilidad",
    "/admin": "Administración",
    "/dev": "Developer",
};

// function NavbarLink({ title, pathname }) {
//     const [_, setLoading] = loadHook("useLoader");
//     const NextNav = useNextNav();
//     return (
//         <Text
//             fontSize={"md"}
//             // fontWeight={600}
//         >
//             <Link
//                 onClick={() => {
//                     setLoading(true);
//                     NextNav.push(pathname);
//                 }}
//                 color={"#ec4899"}
//             >
//                 {title}
//             </Link>
//         </Text>
//     );
// }
