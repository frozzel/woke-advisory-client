import axios from "axios";

const client = axios.create({baseURL: "https://urchin-app-gykiq.ondigitalocean.app/"});

export default client;