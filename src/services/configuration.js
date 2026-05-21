import axios from "axios";

async function getByDomain(domain) {
  return axios
    .get(`/api/configuration?domain=${domain}`)
    .then((response) => response.data);
}

const ConfigurationService = {
  getByDomain,
};

export default ConfigurationService;
