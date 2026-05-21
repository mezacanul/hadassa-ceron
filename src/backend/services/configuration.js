import ConfigurationRepo from "../repositories/configuration";

async function getHorarios() {
  const horarios = await ConfigurationRepo.getByDomain(
    "horario"
  );
  const horariosObj = {
    lv: horarios
      .filter((horario) => horario.app_key.includes("LV"))
      .map((horario) => horario.app_value),
    sbd: horarios
      .filter((horario) => horario.app_key.includes("SBD"))
      .map((horario) => horario.app_value),
  };
  return horariosObj;
}

const ConfigurationService = {
  getHorarios,
};

export default ConfigurationService;
