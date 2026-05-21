import axios from "axios";

async function createLashista(data) {
  const response = await axios.post("/api/lashistas", data);
  return response.data;
}

const LashistasService = {
  createLashista,
};
export default LashistasService;
