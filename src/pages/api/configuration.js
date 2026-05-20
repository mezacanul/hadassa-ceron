import ConfigurationService from "@/backend/services/configuration";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { domain } = req.query;
      switch (domain) {
        case "horario":
          const horarios =
            await ConfigurationService.getHorarios();
          res.status(200).json(horarios);
          break;
        default:
          res.status(400).json({ error: "Invalid domain" });
          break;
      }
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
