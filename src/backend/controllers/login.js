import loginService from "../services/login";

async function login(username, password) {
    return await loginService.login(username, password);
}

export default {
    login,
};
