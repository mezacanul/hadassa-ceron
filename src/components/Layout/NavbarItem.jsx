import { loadHook } from "@/utils/lattice-design";
import { Link, Text } from "@chakra-ui/react";
import { useRouter as useNextNav } from "next/navigation";
import { useState } from "react";

export default function NavbarItem({ title, pathname }) {
    const [sidebarOpen, setSidebarOpen] = loadHook(
        "useSidebarOpen"
    );
    const [_, setLoading] = loadHook("useLoader");
    const NextNav = useNextNav();
    const [isHover, setIsHover] = useState(false);
    const textDecoration = isHover ? "underline" : "none";

    return (
        <Text
            fontSize={"xl"}
            // fontWeight={600}
        >
            <Link
                onClick={() => {
                    setSidebarOpen(false);
                    setLoading(true);
                    NextNav.push(pathname);
                }}
                textDecoration={textDecoration}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                // color={"#ec4899"}
                color={"white"}
            >
                {title}
            </Link>
        </Text>
    );
}
