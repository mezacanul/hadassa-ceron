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
import { lashistaSchema } from "@/backend/schema/lashista.schema";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(lashistaSchema),
    defaultValues: defaultLashistaForm,
    mode: "onBlur",
  });

  const [extraHorarioLV, setExtraHorarioLV] =
    useState(null);
  const [horarioOptions, setHorarioOptions] = useState({
    lv: [],
    sbd: [],
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

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

  const handleSave = (data) => {
    console.log(data);
    // console.log(lashistaForm);
    // const { inicio: inicioLV, cierre: cierreLV } =
    //   lashistaForm.horarioLV;
    // const { inicio: inicioSBD, cierre: cierreSBD } =
    //   lashistaForm.horarioSBD;
    // const formattedHorarioLV = [
    //   `${inicioLV} - ${cierreLV}`,
    // ];
    // if (extraHorarioLV) {
    //   const { entrada, salida } = extraHorarioLV;
    //   formattedHorarioLV.push(`${entrada} - ${salida}`);
    // }
    // const formattedHorarioSBD = [
    //   `${inicioSBD} - ${cierreSBD}`,
    // ];
    // console.log("formattedHorarioLV", formattedHorarioLV);
    // console.log("formattedHorarioSBD", formattedHorarioSBD);
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
            <Form
              onSubmit={handleSubmit(handleSave)}
              control={control}
            >
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
                      spreadProps={register("nombre")}
                      error={errors.nombre}
                    />
                    <InputGroup
                      label={"Email"}
                      spreadProps={register("email")}
                      error={errors.email}
                    />
                    <InputGroup
                      label={"Contraseña"}
                      spreadProps={register("password")}
                      error={errors.password}
                    />
                  </Grid>

                  <ErrorContainer errors={errors} />

                  <VStack w={"100%"} gap={"1rem"}>
                    <HStack
                      w={"100%"}
                      gap={"1rem"}
                      justifyContent={"space-between"}
                    >
                      <Text
                        fontWeight={600}
                        fontSize={"1rem"}
                      >
                        Horario De Lunes a Viernes
                      </Text>
                      {errors.horarioLV_entrada && (
                        <Text
                          fontSize={"0.8rem"}
                          color={"red"}
                        >
                          {"* Ingresa un horario valido"}
                        </Text>
                      )}
                    </HStack>

                    <HStack w={"100%"} gap={"1rem"}>
                      <SelectDefault
                        label="Entrada"
                        placeholder="Selecciona un horario"
                        options={horarioOptions.lv}
                        spreadProps={register(
                          "horarioLV_entrada"
                        )}
                        error={errors.horarioLV_entrada}
                      />
                      <SelectDefault
                        label="Salida"
                        placeholder="Selecciona un horario"
                        options={horarioOptions.lv}
                        spreadProps={register(
                          "horarioLV_salida"
                        )}
                        error={errors.horarioLV_salida}
                      />
                    </HStack>

                    {extraHorarioLV && (
                      <HStack w={"100%"} gap={"1rem"}>
                        <SelectDefault
                          label="Entrada"
                          placeholder="Selecciona un horario"
                          options={horarioOptions.lv}
                          spreadProps={register(
                            "horarioLV_extra_entrada"
                          )}
                          error={
                            errors.horarioLV_extra_entrada
                          }
                        />
                        <SelectDefault
                          label="Salida"
                          placeholder="Selecciona un horario"
                          options={horarioOptions.lv}
                          spreadProps={register(
                            "horarioLV_extra_salida"
                          )}
                          error={
                            errors.horarioLV_extra_salida
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
                    <HStack
                      w={"100%"}
                      gap={"1rem"}
                      justifyContent={"space-between"}
                    >
                      <Text
                        fontWeight={600}
                        fontSize={"1rem"}
                      >
                        Horario De Sabado
                      </Text>
                      {errors.horarioSBD_entrada && (
                        <Text
                          fontSize={"0.8rem"}
                          color={"red"}
                        >
                          {"* Ingresa un horario valido"}
                        </Text>
                      )}
                    </HStack>

                    <HStack w={"100%"} gap={"1rem"}>
                      <SelectDefault
                        label="Entrada"
                        placeholder="Selecciona un horario"
                        options={horarioOptions.sbd}
                        spreadProps={register(
                          "horarioSBD_entrada"
                        )}
                        error={errors.horarioSBD_entrada}
                      />
                      <SelectDefault
                        label="Salida"
                        placeholder="Selecciona un horario"
                        options={horarioOptions.sbd}
                        spreadProps={register(
                          "horarioSBD_salida"
                        )}
                        error={errors.horarioSBD_salida}
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
                  type="submit"
                  _hover={{ bg: "blue.700" }}
                  bg={"blue.600"}
                >
                  Guardar
                </Button>
              </Dialog.Footer>
            </Form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

function InputGroup({
  label,
  value,
  onChange,
  error,
  spreadProps,
}) {
  return (
    <VStack alignItems={"start"} w={"100%"}>
      <Text
        w={"100%"}
        fontWeight={600}
        fontSize={"0.8rem"}
        color={error ? "red" : "black"}
      >
        {label}
      </Text>
      <Input
        w={"100%"}
        {...inputStyles}
        {...spreadProps}
        borderColor={error ? "red" : "gray.300"}
        // value={value}
        // placeholder={label}
        // onChange={onChange}
      />
    </VStack>
  );
}
const inputStyles = {
  fontSize: "md",
  shadow: "sm",
  bg: "white",
};

function ErrorContainer({ errors }) {
  return (
    <VStack
      w={"100%"}
      alignItems={"start"}
      display={
        errors.password || errors.email || errors.nombre
          ? "flex"
          : "none"
      }
    >
      {errors.password && (
        <Text fontSize={"0.8rem"} color={"red"}>
          {"* " + errors.password.message}
        </Text>
      )}
      {errors.email && (
        <Text fontSize={"0.8rem"} color={"red"}>
          {"* " + errors.email.message}
        </Text>
      )}
      {errors.nombre && (
        <Text fontSize={"0.8rem"} color={"red"}>
          {"* " + errors.nombre.message}
        </Text>
      )}
    </VStack>
  );
}
