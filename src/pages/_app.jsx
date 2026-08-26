// import "@/styles/globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "@/components/ui/provider";
import Head from "next/head";
import { loadHook, Nexus, Singleton } from "@/utils/lattice-design";
import { Box, HStack, Spinner, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import "@/styles/Tables.css";
import "@/styles/main.css";
import API from "@/services/main";
import NavBar from "@/components/Layout/Navbar";
import Login from "@/components/Login";
import Sidebar from "@/components/Sidebar";

// import 'ag-grid-community/styles/ag-grid.css'
// import 'ag-grid-community/styles/ag-theme-alpine.css'

// import Router from 'next/router';

Nexus({
  useDOM: Singleton({ title: "Hadassa Cerón" }),
  useSelectedDate: Singleton(null),
  useEvents: Singleton([]),
  useLoader: Singleton(true),
  useClientas: Singleton(null),
  useHorarios: Singleton(null),
  useUsuario: Singleton(null),
  useSidebarOpen: Singleton(false),
});

export default function App({ Component, pageProps }) {
  const [DOM] = loadHook("useDOM");
  const [loading, setLoading] = loadHook("useLoader");
  const [clientas, setClientas] = loadHook("useClientas");
  const [horarios, setHorarios] = loadHook("useHorarios");
  const [usuario, setUsuario] = loadHook("useUsuario");

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("usuario"));
    if (localUser) {
      setUsuario(localUser);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (usuario && usuario.username) {
      API.horarios.getAll().then((horariosResp) => {
        console.log("horariosResp", horariosResp);
        setHorarios(horariosResp.data);
      });
      setLoading(false);
      API.clientas.getClientas().then((clientasResp) => {
        console.log("clientasResp", clientasResp);
        setClientas(clientasResp.data);
      });
    }
  }, [usuario]);

  return (
    <Provider>
      <Head>
        <title>{DOM.title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      {!usuario ? (
        <Login />
      ) : (
        <Box
          id="App"
          bg={"#f3faff"}
          h={loading ? "100vh" : "initial"}
          overflow={"hidden"}
          position={"relative"}
        >
          {/**
           * @component Top Navigation Bar
           * @description Barra de navegación superior de la aplicación
           */}
          <NavBar h={"11vh"} />

          {/**
           * @component Body
           * @description Contenedor principal de la aplicación
           */}
          <VStack id="Body" px={["1.5rem", "2rem"]} py={"2.5rem"} minH={"90vh"}>
            <Component {...pageProps} />
          </VStack>

          {/**
           * @component Sidebar
           * @default Closed
           * @description Barra lateral de la aplicación, se abre y se cierra con el botón de la barra de navegación
           */}
          <Sidebar />
        </Box>
      )}
      <Loader loading={loading} />
    </Provider>
  );
}

function Loader({ loading }) {
  return (
    <Box
      id="Loader"
      display={loading ? "block" : "none"}
      position={"absolute"}
      w={"100%"}
      h={"100%"}
      bg={"white"}
      zIndex={100}
      top={0}
      left={0}
    >
      <HStack
        justifyContent={"center"}
        alignItems={"center"}
        w={"100%"}
        h={"100%"}
      >
        <Box transform={"scale(2)"}>
          <Spinner size="xl" color="pink.500" borderWidth={"2px"} />
        </Box>
      </HStack>
    </Box>
  );
}
