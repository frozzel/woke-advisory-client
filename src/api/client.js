import axios from "axios";

const client = axios.create({baseURL: "https://woke-advisory-server-yyyxt.ondigitalocean.app"});

export default client;