import {
  Button,
  Input,
  Dialog,
  Grid,
  Portal,
  Text,
  VStack,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ConfigurationService from "@/services/configuration";
import {
  getTimeSlotOptions,
  timeToMinutes,
} from "@/utils/time";
import { SelectDefault } from "../common/SelectDefault";
import { lashistaSchema } from "@/backend/schema/lashista.schema";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LashistasService from "@/services/lashistas";

const defaultLashistaForm = {
  nombre: "",
  email: "",
  password: "",
  horarioLV_entrada: "",
  horarioLV_salida: "",
  horarioLV_extra_entrada: undefined,
  horarioLV_extra_salida: undefined,
  horarioSBD_entrada: "",
  horarioSBD_salida: "",
};

export default function ModalNuevaLashista({
  open,
  setOpen,
  setLashistas,
}) {
  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    control,
  } = useForm({
    resolver: zodResolver(lashistaSchema),
    defaultValues: defaultLashistaForm,
    mode: "onBlur",
  });
  const isSetHorarioLV_entrada = watch("horarioLV_entrada");
  const isSetHorarioExtraLV_entrada = watch(
    "horarioLV_extra_entrada"
  );
  const isSetHorarioSBD_entrada = watch(
    "horarioSBD_entrada"
  );

  useEffect(() => {
    console.log(
      "isSetHorarioLV_entrada",
      isSetHorarioLV_entrada
    );
    console.log(
      "isSetHorarioExtraLV_entrada",
      isSetHorarioExtraLV_entrada
    );
    console.log(
      "isSetHorarioSBD_entrada",
      isSetHorarioSBD_entrada
    );
  }, [
    isSetHorarioLV_entrada,
    isSetHorarioExtraLV_entrada,
    isSetHorarioSBD_entrada,
  ]);

  const [horarioExtraLV, setHorarioExtraLV] =
    useState(false);
  const [horarioOptions, setHorarioOptions] = useState({
    lv: [],
    sbd: [],
  });

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  useEffect(() => {
    ConfigurationService.getByDomain("horario").then(
      (response) => {
        console.log("horarios", response);
        const horariosObj = {
          lv: getTimeSlotOptions(
            response.lv[0],
            response.lv[1],
            true
          ),
          sbd: getTimeSlotOptions(
            response.sbd[0],
            response.sbd[1],
            true
          ),
        };
        console.log("horariosObj", horariosObj);
        setHorarioOptions(horariosObj);
      }
    );
  }, []);

  const handleSave = async (data) => {
    console.log(data);
    try {
      const {
        horarioLV_entrada,
        horarioLV_salida,
        horarioLV_extra_entrada,
        horarioLV_extra_salida,
        horarioSBD_entrada,
        horarioSBD_salida,
      } = data;

      const horarioLV = [
        `${horarioLV_entrada} - ${horarioLV_salida}`,
      ];
      if (
        horarioLV_extra_entrada &&
        horarioLV_extra_salida
      ) {
        horarioLV.push(
          `${horarioLV_extra_entrada} - ${horarioLV_extra_salida}`
        );
      }
      const horarioSBD = `${horarioSBD_entrada} - ${horarioSBD_salida}`;

      let payload = {
        nombre: data.nombre,
        email: data.email,
        password: data.password,
        horarioLV: JSON.stringify(horarioLV),
        horarioSBD,
      };
      // return new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve(payload);
      //   }, 1000);
      // });
      const response =
        await LashistasService.createLashista(payload);
      console.log("response", response);
      setLashistas((prev) => [...prev, response]);
      return true;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  };

  const handleAddHorarioExtraLV = () => {
    setHorarioExtraLV(true);
    setValue("horarioLV_extra_entrada", "");
    setValue("horarioLV_extra_salida", "");
  };

  const handleDeleteHorarioExtraLV = () => {
    setHorarioExtraLV(false);
    setValue("horarioLV_extra_entrada", undefined);
    setValue("horarioLV_extra_salida", undefined);
  };

  const handleOpenChange = (e) => {
    setOpen(e.open);
    if (e.open == false) {
      setTimeout(() => {
        reset();
        setHorarioExtraLV(false);
      }, 500);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    reset();
    setHorarioExtraLV(false);
  };

  function isValidHorarioLV(errors) {
    return (
      !errors.horarioLV_entrada &&
      !errors.horarioLV_salida &&
      !errors.horarioLV_extra_entrada &&
      !errors.horarioLV_extra_salida
    );
  }

  function isValidHorarioSBD(errors) {
    return (
      !errors.horarioSBD_entrada &&
      !errors.horarioSBD_salida
    );
  }

  function filterOptionsByStartTime(options, startTime) {
    return options.filter(
      (h) =>
        timeToMinutes(h.value) >
        timeToMinutes(watch(startTime))
    );
  }

  return (
    <Dialog.Root
      size={"md"}
      placement="center"
      lazyMount
      open={open}
      onOpenChange={handleOpenChange}
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
                {/* Formulario de nueva lashista */}
                <VStack w={"100%"} gap={"2rem"}>
                  {/* Inputs de nombre, email y contraseña */}
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

                  {/* Errores de los inputs de nombre, email y contraseña */}
                  <ErrorContainer errors={errors} />

                  <VStack w={"100%"} gap={"1rem"}>
                    {/* Titulo de la seccion de horarios
                    De Lunes a Viernes */}
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
                      {!isValidHorarioLV(errors) && (
                        <Text
                          fontSize={"0.8rem"}
                          color={"red"}
                        >
                          {"* Ingresa un horario valido"}
                        </Text>
                      )}
                    </HStack>

                    {/* Selectores de horarios De Lunes a Viernes */}
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
                        options={filterOptionsByStartTime(
                          horarioOptions.lv,
                          "horarioLV_entrada"
                        )}
                        spreadProps={register(
                          "horarioLV_salida"
                        )}
                        error={errors.horarioLV_salida}
                        // disabled={!horarioExtraLV}
                        disabled={!isSetHorarioLV_entrada}
                      />
                    </HStack>

                    {/* Selectores de horarios extra De Lunes a Viernes */}
                    {horarioExtraLV && (
                      <HStack w={"100%"} gap={"1rem"}>
                        <SelectDefault
                          label="Entrada"
                          placeholder="Selecciona un horario"
                          options={filterOptionsByStartTime(
                            horarioOptions.lv,
                            "horarioLV_salida"
                          )}
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
                          options={filterOptionsByStartTime(
                            horarioOptions.lv,
                            "horarioLV_extra_entrada"
                          )}
                          spreadProps={register(
                            "horarioLV_extra_salida"
                          )}
                          error={
                            errors.horarioLV_extra_salida
                          }
                          disabled={
                            !isSetHorarioExtraLV_entrada
                          }
                        />
                      </HStack>
                    )}

                    {/* Botones de agregar y eliminar horarios extra De Lunes a Viernes */}
                    <HStack w={"100%"} gap={"0.5rem"}>
                      <Button
                        onClick={handleDeleteHorarioExtraLV}
                        fontSize={"1.2rem"}
                        bg={"blue.600"}
                        _hover={{ bg: "blue.700" }}
                        disabled={!horarioExtraLV}
                      >
                        {"-"}
                      </Button>
                      <Button
                        onClick={handleAddHorarioExtraLV}
                        fontSize={"1.2rem"}
                        bg={"blue.600"}
                        _hover={{ bg: "blue.700" }}
                        disabled={horarioExtraLV}
                      >
                        {"+"}
                      </Button>
                    </HStack>
                  </VStack>

                  {/* Titulo de la seccion de horarios
                  De Sabado */}
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
                      {!isValidHorarioSBD(errors) && (
                        <Text
                          fontSize={"0.8rem"}
                          color={"red"}
                        >
                          {"* Ingresa un horario valido"}
                        </Text>
                      )}
                    </HStack>

                    {/* Selectores de horarios De Sabado */}
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
                        // options={horarioOptions.sbd}
                        options={filterOptionsByStartTime(
                          horarioOptions.sbd,
                          "horarioSBD_entrada"
                        )}
                        spreadProps={register(
                          "horarioSBD_salida"
                        )}
                        error={errors.horarioSBD_salida}
                        disabled={!isSetHorarioSBD_entrada}
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
                {isSubmitting && (
                  <Spinner
                    size={"lg"}
                    color={"blue.600"}
                    borderWidth={"3px"}
                    me={"0.3rem"}
                  />
                )}
                {isSubmitSuccessful && (
                  <Text
                    color={"green"}
                    py={"0.5rem"}
                    fontSize={"1rem"}
                  >
                    {"¡Lashista Agregada Exitosamente!"}
                  </Text>
                )}
                {!isSubmitting && !isSubmitSuccessful && (
                  <>
                    <Button
                      bg={"gray"}
                      _hover={{ bg: "gray.600" }}
                      onClick={handleCloseModal}
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
                  </>
                )}
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
      {errors.nombre && (
        <Text fontSize={"0.8rem"} color={"red"}>
          {"* " + errors.nombre.message}
        </Text>
      )}
      {errors.email && (
        <Text fontSize={"0.8rem"} color={"red"}>
          {"* " + errors.email.message}
        </Text>
      )}
      {errors.password && (
        <Text fontSize={"0.8rem"} color={"red"}>
          {"* " + errors.password.message}
        </Text>
      )}
    </VStack>
  );
}
