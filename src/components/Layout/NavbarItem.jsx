import { loadHook } from "@/utils/lattice-design";
import { Link, Text, useToken } from "@chakra-ui/react";
import { useRouter as useNextNav } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/router";

export default function NavbarItem({ title, pathname }) {
    // const [sidebarOpen, setSidebarOpen] = loadHook(
    //     "useSidebarOpen"
    // );
    const [_, setLoading] = loadHook("useLoader");
    const NextNav = useNextNav();
    const [isHover, setIsHover] = useState(false);
    const textDecoration = isHover ? "underline" : "none";
    const router = useRouter();
    const pink = useToken("colors", "pink.500");

    return (
        <Text
            fontSize={"md"}
            // fontWeight={600}
        >
            <Link
                onClick={() => {
                    // console.log("pathname", pathname, router.pathname);
                    // return;
                    // setSidebarOpen(false);
                    if (router.pathname === pathname) {
                        return;
                    } else {
                        setLoading(true);
                        NextNav.push(pathname);
                    }
                }}
                textDecoration={textDecoration}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                // color={"#ec4899"}
                color={pink}
            >
                {title}
            </Link>
        </Text>
    );
}
