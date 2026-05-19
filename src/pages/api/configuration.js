export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const { domain } = req.query;
      const configuration =
        await ConfigurationRepo.getByDomain(domain);
      res.status(200).json(configuration);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
