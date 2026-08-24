import { formatSpanishDate, formatTimeToAMPM } from "./main";

function createWhatsappLink(lada, telefono) {
  const phone = `${lada}${telefono}`;
  return `https://wa.me/${phone}`;
}

function createWhatsAppUrl(cita, tipo) {
  const phone = `${cita.lada}${cita.telefono}`;
  const message = createMessage(cita, tipo);
  const encodedMessage = encodeURIComponent(message);
  //   const instructions = "Presiona Ctrl + A y después Ctrl + V";
  //   const encodedInstructions = encodeURIComponent(instructions);

  //   return `https://wa.me/${phone}?text=${encodedInstructions}`;
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

function createMessage(cita, tipo) {
  const spanishDate = formatSpanishDate(cita.fecha);
  console.log("spanishDate", spanishDate);
  console.log("cita", cita);

  let message = "";
  if (tipo == "confirmacion") {
    message = `Confirmo tu cita del día *${spanishDate} a la${
      cita.hora.includes("13") ? "" : "s"
    } ${formatTimeToAMPM(cita.hora)}* para servicio de *${cita.servicio}* ✨
          \n🙋🏻‍♀️ La persona que te realizará el servicio es *${cita.lashista}*
          \n⏱️ Tu servicio tiene una duración de *${
            cita.minutos ? cita.minutos : "N/A"
          } minutos*
          \n⏰ Tienes una tolerancia de *5 minutos*, posterior a eso tu cita queda cancelada
          \n💵 *El costo del servicio es de $${cita.precio_tarjeta}*
          \nPagando en efectivo el costo es de $${cita.precio}`;
  }
  if (tipo == "recordatorio") {
    message = `Hola! Buen día 🌞
          \n*${spanishDate.includes("Lunes") ? "El lunes" : "Mañana"} es tu cita a la${
            cita.hora.includes("13") ? "" : "s"
          } ${formatTimeToAMPM(cita.hora)}* ✨
          \nEs necesario asistir sin maquillaje ni productos en el área que se te realizará el servicio 🌸
          \n¿Podrás asistir? ☺️`;
  }
  //   navigator.clipboard.writeText(message);
  return message;
}

const whatsappUtils = {
  createWhatsAppUrl,
  createMessage,
  createWhatsappLink,
};

export default whatsappUtils;
