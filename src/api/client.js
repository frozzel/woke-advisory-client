import axios from "axios";

const client = axios.create({baseURL: "https://api.wokeadvisory.com/api"});

export default client;
