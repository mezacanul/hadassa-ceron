import { useEffect, useState } from "react";
import { loadHook } from "@/utils/lattice-design";
import {
    VStack,
    Heading,
    Input,
    Button,
    Image,
    Spinner,
    Text,
} from "@chakra-ui/react";
import API from "@/services/main";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [loading, setLoading] = loadHook("useLoader");
    const [usuario, setUsuario] = loadHook("useUsuario");
    const [error, setError] = useState(null);

    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        setIsLoading(true);
        setError(null);
        API.login
            .iniciarSesion(form.username, form.password)
            .then((resp) => {
                console.log(resp);
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setUsuario(resp.data);
                    localStorage.setItem(
                        "usuario",
                        JSON.stringify(resp.data)
                    );
                    setIsLoading(false);
                }, 500);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.error);
                setIsLoading(false);
            });
    };
    return (
        <VStack
            h={"100vh"}
            w={"100vw"}
            justify={"center"}
            align={"center"}
            // bg={"#f1f5ff"}
        >
            <VStack gap={"1rem"} w={"25vw"} mt={"-5rem"}>
                <Image
                    src={"/hadassa-logo.jpg"}
                    alt="Logo"
                    w={"15rem"}
                    objectFit={"cover"}
                />
                <Input
                    type="username"
                    placeholder="Usuario"
                    bg={"white"}
                    borderColor={"pink.500"}
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                    shadow={"sm"}
                    disabled={isLoading}
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    bg={"white"}
                    borderColor={"pink.500"}
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    disabled={isLoading}
                    shadow={"sm"}
                />
                {isLoading ? (
                    <Spinner
                        size={"lg"}
                        borderWidth={"4px"}
                        color={"pink.500"}
                    />
                ) : (
                    <Button
                        w={"50%"}
                        bg={"pink.500"}
                        color={"white"}
                        disabled={
                            isLoading ||
                            form.username === "" ||
                            form.password === ""
                        }
                        onClick={handleSubmit}
                    >
                        {"Iniciar sesión"}
                    </Button>
                )}
                {error && (
                    <Text
                        textAlign={"center"}
                        color={"red"}
                    >
                        {error}
                    </Text>
                )}
            </VStack>
        </VStack>
    );
}
