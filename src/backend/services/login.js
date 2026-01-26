import usuariosRepository from "../repositories/usuarios";

async function login(username, password) {
    const user =
        await usuariosRepository.getByUsernameAndPassword(
            username,
            password
        );
    if (user) {
        return { username: user.username, id: user.id };
    } else {
        return {
            error: "Usuario o contraseña incorrectos",
        };
    }
}

export default {
    login,
};
