import {
  Button,
  Input,
  Dialog,
  Grid,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ModalNuevaLashista({
  open,
  setOpen,
}) {
  const [lashistaForm, setLashistaForm] = useState({
    nombre: "",
    email: "",
    password: "",
    horarioLV: [],
    horarioSBD: [],
  });

  const handleSave = () => {
    console.log(lashistaForm);
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
            <Dialog.Header>
              <Dialog.Title>Nueva Lashista</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <Grid
                w={"100%"}
                gridTemplateColumns={"1fr 1fr"}
                gap={"1rem"}
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
                <InputGroup
                  label={"Horario LV"}
                  value={lashistaForm.horarioLV}
                  onChange={(e) =>
                    setLashistaForm({
                      ...lashistaForm,
                      horarioLV: e.target.value,
                    })
                  }
                />
                <InputGroup
                  label={"Horario SBD"}
                  value={lashistaForm.horarioSBD}
                  onChange={(e) =>
                    setLashistaForm({
                      ...lashistaForm,
                      horarioSBD: e.target.value,
                    })
                  }
                />
              </Grid>
            </Dialog.Body>

            <Dialog.Footer>
              <Button onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => handleSave()}>
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
