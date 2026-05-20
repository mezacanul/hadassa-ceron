import { z } from "zod";

export const lashistaSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.email("Ingrese un correo electrónico válido"),
  password: z
    .string()
    .min(
      6,
      "La contraseña debe tener al menos 6 caracteres"
    ),
  horarioLV_entrada: z
    .string()
    .min(5, "Seleccione un horario"),
  horarioLV_salida: z
    .string()
    .min(5, "Seleccione un horario"),
  // horarioLV_extra_entrada: z
  //   .string()
  //   .min(5, "Seleccione un horario")
  //   .nullable(),
  // horarioLV_extra_salida: z
  //   .string()
  //   .min(5, "Seleccione un horario")
  //   .nullable(),
  horarioSBD_entrada: z
    .string()
    .min(5, "Seleccione un horario"),
  horarioSBD_salida: z
    .string()
    .min(5, "Seleccione un horario"),
  // horarioLV: z.object({
  //   entrada: z.string().min(5, "Seleccione un horario"),
  //   salida: z.string().min(5, "Seleccione un horario"),
  // }),
  // horarioLV_extra: z.object({
  //   entrada: z.string().min(5, "Seleccione un horario"),
  //   salida: z.string().min(5, "Seleccione un horario"),
  // }),
  // horarioSBD: z.object({
  //   entrada: z.string().min(5, "Seleccione un horario"),
  //   salida: z.string().min(5, "Seleccione un horario"),
  // }),
});
