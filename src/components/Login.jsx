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
          localStorage.setItem("usuario", JSON.stringify(resp.data));
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error);
        setIsLoading(false);
      });
  };

  const onEnterPress = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <VStack
      id="Login"
      h={"100dvh"}
      w={"100vw"}
      justify={"center"}
      align={"center"}
      bg={"white"}
      // bg={"#f1f5ff"}
    >
      <VStack
        gap={"1rem"}
        w={{ base: "100%", md: "40vw", lg: "25vw" }}
        mt={"-5rem"}
        px={["2rem", "0"]}
      >
        <Image
          src={"/hadassa-logo.jpg"}
          alt="Logo"
          w={["10rem", "15rem"]}
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
          onKeyUp={onEnterPress}
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
          onKeyUp={onEnterPress}
        />
        {isLoading ? (
          <Spinner size={"lg"} borderWidth={"4px"} color={"pink.500"} />
        ) : (
          <Button
            w={"50%"}
            bg={"pink.500"}
            color={"white"}
            disabled={isLoading || form.username === "" || form.password === ""}
            onClick={handleSubmit}
          >
            {"Iniciar sesión"}
          </Button>
        )}
        {error && (
          <Text textAlign={"center"} color={"red"}>
            {error}
          </Text>
        )}
      </VStack>
    </VStack>
  );
}
