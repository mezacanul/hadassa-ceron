import clientasService from "./clientas";
import citasService from "./citas";
import horariosService from "./horarios";
import liveService from "./live";
import loginService from "./login";

const API = {
    clientas: clientasService,
    citas: citasService,
    horarios: horariosService,
    live: liveService,
    login: loginService,
};

export default API;