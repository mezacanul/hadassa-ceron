import axios from "axios";

function iniciarSesion(username, password) {
    return axios
        .post("/api/login", { username, password })
        .then((resp) => resp);
}

export default {
    iniciarSesion,
};
