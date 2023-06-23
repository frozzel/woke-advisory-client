import axios from "axios";

const client = axios.create({baseURL: process.env.API || "http://localhost:8080/api"});

export default client;
