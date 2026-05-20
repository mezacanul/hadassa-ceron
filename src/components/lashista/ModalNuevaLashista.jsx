import {
  Button,
  Input,
  Dialog,
  Grid,
  Portal,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ConfigurationService from "@/services/configuration";
import { getTimeSlotOptions } from "@/utils/time";
import { SelectDefault } from "../common/SelectDefault";

const defaultHorario = {
  entrada: "",
  salida: "",
};

const defaultLashistaForm = {
  nombre: "",
  email: "",
  password: "",
  horarioLV: defaultHorario,
  horarioSBD: defaultHorario,
};

export default function ModalNuevaLashista({
  open,
  setOpen,
}) {
  const [horarioOptions, setHorarioOptions] = useState({
    lv: [],
    sbd: [],
  });
  const [lashistaForm, setLashistaForm] = useState(
    defaultLashistaForm
  );
  const [extraHorarioLV, setExtraHorarioLV] =
    useState(null);

  useEffect(() => {
    ConfigurationService.getByDomain("horario").then(
      (response) => {
        console.log("horarios", response);
        const horariosObj = {
          lv: getTimeSlotOptions(
            response.lv[0],
            response.lv[1]
          ),
          sbd: getTimeSlotOptions(
            response.sbd[0],
            response.sbd[1]
          ),
        };
        console.log("horariosObj", horariosObj);
        setHorarioOptions(horariosObj);
      }
    );
  }, []);

  const handleSave = () => {
    console.log(lashistaForm);
    const { inicio: inicioLV, cierre: cierreLV } =
      lashistaForm.horarioLV;
    const { inicio: inicioSBD, cierre: cierreSBD } =
      lashistaForm.horarioSBD;
    const formattedHorarioLV = [
      `${inicioLV} - ${cierreLV}`,
    ];
    if (extraHorarioLV) {
      const { entrada, salida } = extraHorarioLV;
      formattedHorarioLV.push(`${entrada} - ${salida}`);
    }
    const formattedHorarioSBD = [
      `${inicioSBD} - ${cierreSBD}`,
    ];
    console.log("formattedHorarioLV", formattedHorarioLV);
    console.log("formattedHorarioSBD", formattedHorarioSBD);
  };

  const handleAddExtraHorarioLV = () => {
    setExtraHorarioLV(defaultHorario);
  };

  const handleDeleteExtraHorarioLV = () => {
    setExtraHorarioLV(null);
  };

  return (
    <Dialog.Root
      size={"md"}
      placement="center"
      lazyMount
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header
              borderBottom={"1px solid #e4e4e7"}
              boxShadow={"0px 2px 4px rgba(0, 0, 0, 0.1)"}
            >
              <Dialog.Title>Nueva Lashista</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body
              py={"2rem"}
              maxH={"50vh"}
              overflowY={"auto"}
            >
              <VStack w={"100%"} gap={"2rem"}>
                <Grid
                  w={"100%"}
                  gridTemplateColumns={"1fr 1fr"}
                  gap={"1rem"}
                  alignItems={"flex-end"}
                >
                  <InputGroup
                    label={"Nombre"}
                    value={lashistaForm.nombre}
                    onChange={(e) =>
                      setLashistaForm({
                        ...lashistaForm,
                        nombre: e.target.value,
                      })
                    }
                  />
                  <InputGroup
                    label={"Email"}
                    value={lashistaForm.email}
                    onChange={(e) =>
                      setLashistaForm({
                        ...lashistaForm,
                        email: e.target.value,
                      })
                    }
                  />
                  <InputGroup
                    label={"Contraseña"}
                    value={lashistaForm.password}
                    onChange={(e) =>
                      setLashistaForm({
                        ...lashistaForm,
                        password: e.target.value,
                      })
                    }
                  />
                </Grid>

                <VStack w={"100%"} gap={"1rem"}>
                  <Text
                    w={"100%"}
                    fontWeight={600}
                    fontSize={"1rem"}
                  >
                    Horario De Lunes a Viernes
                  </Text>

                  <HStack w={"100%"} gap={"1rem"}>
                    <SelectDefault
                      label="Entrada"
                      value={lashistaForm.horarioLV.inicio}
                      placeholder="Selecciona un horario"
                      options={horarioOptions.lv}
                      setValue={(value) =>
                        setLashistaForm({
                          ...lashistaForm,
                          horarioLV: {
                            ...lashistaForm.horarioLV,
                            inicio: value,
                          },
                        })
                      }
                    />
                    <SelectDefault
                      label="Salida"
                      value={lashistaForm.horarioLV.cierre}
                      placeholder="Selecciona un horario"
                      options={horarioOptions.lv}
                      setValue={(value) =>
                        setLashistaForm({
                          ...lashistaForm,
                          horarioLV: {
                            ...lashistaForm.horarioLV,
                            cierre: value,
                          },
                        })
                      }
                    />
                  </HStack>

                  {extraHorarioLV && (
                    <HStack w={"100%"} gap={"1rem"}>
                      <SelectDefault
                        label="Entrada"
                        value={extraHorarioLV.entrada}
                        placeholder="Selecciona un horario"
                        options={horarioOptions.lv}
                        setValue={(value) =>
                          setExtraHorarioLV({
                            ...extraHorarioLV,
                            entrada: value,
                          })
                        }
                      />
                      <SelectDefault
                        label="Salida"
                        value={extraHorarioLV.salida}
                        placeholder="Selecciona un horario"
                        options={horarioOptions.lv}
                        setValue={(value) =>
                          setExtraHorarioLV({
                            ...extraHorarioLV,
                            salida: value,
                          })
                        }
                      />
                    </HStack>
                  )}

                  <HStack w={"100%"} gap={"0.5rem"}>
                    <Button
                      onClick={handleDeleteExtraHorarioLV}
                      fontSize={"1.2rem"}
                      bg={"blue.600"}
                      _hover={{ bg: "blue.700" }}
                      disabled={!extraHorarioLV}
                    >
                      {"-"}
                    </Button>
                    <Button
                      onClick={handleAddExtraHorarioLV}
                      fontSize={"1.2rem"}
                      bg={"blue.600"}
                      _hover={{ bg: "blue.700" }}
                      disabled={extraHorarioLV}
                    >
                      {"+"}
                    </Button>
                  </HStack>
                </VStack>

                <VStack w={"100%"} gap={"1rem"}>
                  <Text
                    w={"100%"}
                    fontWeight={600}
                    fontSize={"1rem"}
                  >
                    Horario De Sabado
                  </Text>

                  <HStack w={"100%"} gap={"1rem"}>
                    <SelectDefault
                      label="Entrada"
                      value={lashistaForm.horarioSBD.inicio}
                      placeholder="Selecciona un horario"
                      options={horarioOptions.sbd}
                      setValue={(value) =>
                        setLashistaForm({
                          ...lashistaForm,
                          horarioSBD: {
                            ...lashistaForm.horarioSBD,
                            inicio: value,
                          },
                        })
                      }
                    />
                    <SelectDefault
                      label="Salida"
                      value={lashistaForm.horarioSBD.cierre}
                      placeholder="Selecciona un horario"
                      options={horarioOptions.sbd}
                      setValue={(value) =>
                        setLashistaForm({
                          ...lashistaForm,
                          horarioSBD: {
                            ...lashistaForm.horarioSBD,
                            cierre: value,
                          },
                        })
                      }
                    />
                  </HStack>
                </VStack>
              </VStack>
            </Dialog.Body>

            <Dialog.Footer
              borderTop={"1px solid rgb(220, 220, 220)"}
              py={"1rem"}
              boxShadow={
                "0px -2px 4px rgba(132, 132, 132, 0.1)"
              }
            >
              <Button
                bg={"gray"}
                _hover={{ bg: "gray.600" }}
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                _hover={{ bg: "blue.700" }}
                bg={"blue.600"}
                onClick={() => handleSave()}
              >
                Guardar
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
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
