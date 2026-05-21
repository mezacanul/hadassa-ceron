import axios from "axios";

async function createLashista(data) {
  const response = await axios.post("/api/lashistas", data);
  return response.data;
}

async function toggleLashistaStatus(id, isDeleted) {
  const response = await axios.patch(
    `/api/lashistas/${id}`,
    {
      type: "toggleStatus",
      payload: {
        isDeleted,
      },
    }
  );
  return response.data;
}

const LashistasService = {
  createLashista,
  toggleLashistaStatus,
};
export default LashistasService;
