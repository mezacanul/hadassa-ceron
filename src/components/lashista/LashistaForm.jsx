import {
  Box,
  Button,
  Grid,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  decodeHorario,
  encodeHorarios,
} from "@/utils/main";
import { addMinutes, format } from "date-fns";
import { loadHook } from "@/utils/lattice-design";
import LashistasService from "@/services/lashistas";

export default function LashistaForm({
  lashista,
  fetchLashista,
}) {
  const [horarios] = loadHook("useHorarios");
  const [actualizarStatus, setActualizarStatus] =
    useState("iddle");
  const [lashistaForm, setLashistaForm] = useState({
    nombre: "",
    email: "",
    password: "",
    horarioLV: null || [],
    horarioSBD: null || [],
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const incoming = {
      nombre: lashista.nombre,
      email: lashista.email,
      password: lashista.password,
      // Array of [ "HH:mm - HH:mm", ... ]
      horarioLV: JSON.parse(lashista.horarioLV),
      // Array - [ "HH:mm", "HH:mm" ]
      horarioSBD: lashista.horarioSBD
        .split("-")
        .map((hora) => hora.replace(" ", "")),
    };
    // console.log("incoming", incoming);
    setLashistaForm(incoming);
  }, []);

  useEffect(() => {
    console.log(lashistaForm);
  }, [lashistaForm]);

  function actualizarLashista() {
    setActualizarStatus("updating");
    const send = {
      ...lashistaForm,
      horarioLV: JSON.stringify(lashistaForm.horarioLV),
      horarioSBD: `${lashistaForm.horarioSBD[0]} - ${lashistaForm.horarioSBD[1]}`,
    };
    console.log("lashista", lashista);
    console.log("send", send);
    axios
      .patch(`/api/lashistas/${lashista.id}`, {
        type: "batch",
        payload: send,
      })
      .then((axiosResp) => {
        console.log(axiosResp);
        setActualizarStatus("success");
        fetchLashista();
      })
      .catch((error) => {
        console.log(error);
        setActualizarStatus("error");
      });
  }

  function toggleLashistaStatus() {
    setActualizarStatus("updating");
    LashistasService.toggleLashistaStatus(
      lashista.id,
      lashista.isDeleted
    )
      .then((response) => {
        console.log(response);
        if (
          response.success &&
          response.affectedRows == 1
        ) {
          setActualizarStatus("success");
          fetchLashista();
          setIsOpen(false);
        } else {
          setActualizarStatus("error");
        }
      })
      .catch((error) => {
        console.log(error);
        setActualizarStatus("error");
      });
  }

  const addHorario = () => {
    // console.log("horarios", horarios);
    const horariosLV = horarios.filter(
      (horario) => horario.clave == "LV"
    )[0];
    // console.log("horariosLV", horariosLV);

    const decodedHorarios = lashistaForm.horarioLV.map(
      (horario) => decodeHorario(horario)
    );
    console.log("decodedHorarios", decodedHorarios);

    const l1 = decodedHorarios[decodedHorarios.length - 1];
    const l11 = l1[l1.length - 1];
    // Add 30 minutes to l11 using date-fns
    const [hours, minutes] = l11.split(":").map(Number);
    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);
    const newTime = addMinutes(baseDate, 30);
    const fNewTime = format(newTime, "HH:mm");

    const newHorarios = [
      ...decodedHorarios,
      [fNewTime, horariosLV.final],
    ];

    console.log(
      encodeHorarios(newHorarios),
      lashistaForm.horarioLV
    );
    setLashistaForm({
      ...lashistaForm,
      horarioLV: encodeHorarios(newHorarios),
    });
  };

  function deleteLastHorario() {
    const newHorarios = lashistaForm.horarioLV.slice(0, -1);
    setLashistaForm({
      ...lashistaForm,
      horarioLV: newHorarios,
    });
  }

  // const horariosLV = JSON.parse(lashista.horarioLV)
  // const horarioSBD = lashista.horarioSBD.split("-").map((hora) => (hora.replace(" ", "")))

  return (
    <>
      <VStack
        alignItems={"start"}
        w={"100%"}
        gap={"1.5rem"}
        mb={"5rem"}
      >
        <Grid
          w={"100%"}
          gridTemplateColumns={"1fr 1fr"}
          gap={"1rem"}
        >
          <InputGroup
            label={"Nombre"}
            value={lashistaForm.nombre}
            onChange={(e) => {
              setLashistaForm({
                ...lashistaForm,
                nombre: e.target.value,
              });
            }}
          />
          <InputGroup
            label={"Correo"}
            value={lashistaForm.email}
            onChange={(e) => {
              setLashistaForm({
                ...lashistaForm,
                email: e.target.value,
              });
            }}
          />
          <InputGroup
            label={"Contraseña"}
            value={lashistaForm.password}
            onChange={(e) => {
              setLashistaForm({
                ...lashistaForm,
                password: e.target.value,
              });
            }}
          />
          {/* <InputGroup label={"Rol"} value={lashista.rol} /> */}
        </Grid>

        {/* Horario LV Selector  */}
        <VStack
          alignItems={"start"}
          w={"100%"}
          gap={"1rem"}
        >
          <Text
            mb={"0.5rem"}
            fontWeight={600}
            fontSize={"0.8rem"}
            color={"pink.600"}
          >
            {"Horario de Lunes a Viernes"}
          </Text>
          <VStack w={"100%"} gap={"1.5rem"}>
            {lashistaForm.horarioLV &&
              lashistaForm.horarioLV.map((horarios, i) => (
                <TimeSelector
                  label={"Seleccionar hora"}
                  key={i}
                  index={i}
                  horarios={horarios}
                  lashistaForm={lashistaForm}
                  setLashistaForm={setLashistaForm}
                />
              ))}
          </VStack>

          <HStack w={"100%"} gap={"0.5rem"}>
            <Button
              onClick={deleteLastHorario}
              colorPalette={"pink"}
              fontSize={"1.2rem"}
              disabled={lashistaForm.horarioLV.length == 1}
            >
              {"-"}
            </Button>
            <Button
              onClick={addHorario}
              colorPalette={"pink"}
              fontSize={"1.2rem"}
              disabled={lashistaForm.horarioLV.length == 2}
            >
              {"+"}
            </Button>
          </HStack>
        </VStack>

        {/* Horario SBD Selector  */}
        <VStack alignItems={"start"} w={"100%"}>
          <Text
            mb={"0.5rem"}
            fontWeight={600}
            fontSize={"0.8rem"}
            color={"pink.600"}
          >
            {"Horario Sábado"}
          </Text>
          <HStack w={"100%"}>
            {lashistaForm.horarioSBD &&
              lashistaForm.horarioSBD.map((hora, i) => (
                <TimePickMUI
                  key={i}
                  label={"Seleccionar hora"}
                  value={hora}
                  loc={{
                    i,
                    period: "SBD",
                  }}
                  lashistaForm={lashistaForm}
                  onChange={(newValue) => {
                    const newHorario =
                      lashistaForm.horarioSBD;
                    newHorario[i] =
                      newValue.format("HH:mm");
                    setLashistaForm({
                      ...lashistaForm,
                      horarioSBD: newHorario,
                    });
                  }}
                />
              ))}
          </HStack>
        </VStack>

        <HStack gap={"1rem"} w={"100%"}>
          {actualizarStatus != "updating" && (
            <HStack
              justifyContent={"space-between"}
              w={"100%"}
            >
              <Button
                fontWeight={800}
                bg={"white"}
                shadow={"md"}
                variant={"outline"}
                colorPalette={
                  lashista.isDeleted ? "green" : "red"
                }
                _hover={{
                  bg: lashista.isDeleted
                    ? "green.50"
                    : "red.50",
                }}
                onClick={() => setIsOpen(true)}
              >
                {lashista.isDeleted
                  ? "Habilitar"
                  : "Deshabilitar"}
              </Button>
              <Button
                onClick={actualizarLashista}
                fontWeight={800}
                bg={"white"}
                _hover={{ bg: "blue.50" }}
                shadow={"md"}
                variant={"outline"}
                colorPalette={"blue"}
              >
                Actualizar Datos
              </Button>
            </HStack>
          )}
        </HStack>

        {actualizarStatus == "success" && (
          <Text color={"green"}>
            ¡Lashista Actualizada Exitosamente!
          </Text>
        )}
        {actualizarStatus == "error" && (
          <Text color={"red"}>Error al actualizar</Text>
        )}
        {actualizarStatus == "updating" && (
          <Spinner
            size={"lg"}
            borderWidth={"3px"}
            color={"blue.600"}
          />
        )}
      </VStack>
      <ModalToggleLashistaStatus
        isDeleted={lashista.isDeleted}
        actualizarStatus={actualizarStatus}
        open={isOpen}
        setOpen={setIsOpen}
        toggleLashistaStatus={toggleLashistaStatus}
      />
    </>
  );
}

function TimeSelector({
  label,
  horarios,
  lashistaForm,
  setLashistaForm,
  index,
}) {
  //Array of [ "HH:mm", ... ]
  const [horariosArr, setHorariosArr] = useState(
    decodeHorario(horarios)
  );

  function handleChange(newValue, index, i) {
    // console.log(newValue.format("HH:mm"), index, i);

    let newHorarioLV = horariosArr;
    newHorarioLV[i] = newValue.format("HH:mm");

    let newSlotsLV = lashistaForm.horarioLV;
    newSlotsLV[
      index
    ] = `${newHorarioLV[0]} - ${newHorarioLV[1]}`;

    // console.log(newSlotsLV);
    // console.log(lashistaForm.horarioLV);

    setHorariosArr(newHorarioLV);
    setLashistaForm({
      ...lashistaForm,
      horarioLV: newSlotsLV,
    });
  }

  useEffect(() => {
    console.log("horariosArr", horariosArr);
  }, []);

  return (
    <HStack w={"100%"}>
      {horariosArr.map((hora, i) => {
        return (
          <TimePickMUI
            key={i}
            value={hora}
            label={label}
            loc={{ index, i, period: "LV" }}
            lashistaForm={lashistaForm}
            onChange={(newValue) => {
              handleChange(newValue, index, i);
            }}
          />
        );
      })}
    </HStack>
  );
}

function TimePickMUI({
  label,
  value,
  onChange,
  loc,
  lashistaForm,
}) {
  // const formattedValue = dayjs(`2025-01-01T${value}`)
  const [valueMUI, setValueMUI] = useState(
    formatHourMUI(value)
  );

  useEffect(() => {
    if (lashistaForm) {
      // console.log(lashistaForm.horarioLV);

      if (loc.period == "LV") {
        const decodedHorarioLV = lashistaForm.horarioLV.map(
          (horario) => {
            return horario
              .split("-")
              .map((hora) => hora.replace(" ", ""));
          }
        );
        const newVal = formatHourMUI(
          decodedHorarioLV[loc.index][loc.i]
        );
        setValueMUI(newVal);
        // console.log(newVal);
      }

      if (loc.period == "SBD") {
        const newVal = formatHourMUI(
          lashistaForm.horarioSBD[loc.i]
        );
        // console.log(lashistaForm.horarioSBD[loc.i]);
        setValueMUI(newVal);
        // console.log(lashistaForm.horarioSBD[loc.i]);
      }
    }
  }, [lashistaForm]);

  return (
    <Box {...inputStyles} w={"100%"}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          sx={{
            width: "100%",
            backgroundColor: "white",
          }}
          label={label}
          value={valueMUI}
          onChange={onChange}
          timeSteps={{ minutes: 30 }}
        />
      </LocalizationProvider>
    </Box>
  );
}

function formatHourMUI(value) {
  return dayjs(`2025-01-01T${value}`);
}

function InputGroup({ label, value, onChange }) {
  return (
    <VStack alignItems={"start"} w={"100%"}>
      <Text w={"100%"} fontWeight={600} fontSize={"0.8rem"}>
        {label}
      </Text>
      <Input
        w={"100%"}
        {...inputStyles}
        value={value}
        placeholder={label}
        onChange={onChange}
      />
    </VStack>
  );
}
const inputStyles = {
  fontSize: "md",
  shadow: "sm",
  bg: "white",
};

function ModalToggleLashistaStatus({
  open,
  setOpen,
  toggleLashistaStatus,
  isDeleted,
  actualizarStatus,
}) {
  return (
    <Dialog.Root
      size={"md"}
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Text fontWeight={600} fontSize={"1rem"}>
                {isDeleted ? "Habilitar" : "Deshabilitar"}{" "}
                Lashista
              </Text>
            </Dialog.Header>
            <Dialog.Body>
              <Text fontSize={"1rem"}>
                ¿Estás seguro de querer{" "}
                {isDeleted ? "habilitar" : "deshabilitar"}{" "}
                esta lashista?
              </Text>

              {isDeleted === 0 && (
                <VStack
                  gap={"0.5rem"}
                  py={"1rem"}
                  alignItems={"start"}
                  color={"gray.600"}
                >
                  <Text>
                    {
                      "- Ya no podrás asignar citas a esta lashista."
                    }
                  </Text>
                  <Text>
                    {
                      "- Las citas pendientes de esta lashista se mantendrán."
                    }
                  </Text>
                </VStack>
              )}
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                variant={"outline"}
                colorPalette={"gray"}
                bg={"gray.100"}
                _hover={{ bg: "gray.300" }}
                onClick={() => setOpen(false)}
                disabled={actualizarStatus == "updating"}
              >
                Cancelar
              </Button>
              <Button
                variant={"outline"}
                colorPalette={isDeleted ? "green" : "red"}
                bg={isDeleted ? "green.100" : "red.100"}
                onClick={toggleLashistaStatus}
                _hover={{
                  bg: isDeleted ? "green.300" : "red.300",
                }}
                disabled={actualizarStatus == "updating"}
              >
                {isDeleted ? "Habilitar" : "Deshabilitar"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
