import loginController from "@/backend/controllers/login";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const login = await loginController.login(
            req.body.username,
            req.body.password
        );
        if (login.error) {
            res.status(401).json({ error: login.error });
        } else {
            res.status(200).json(login);
        }
    }
}
