import axios from "axios";

const client = axios.create({baseURL: "http://api.wokeadvisory.com/api"});

export default client;

// https://woke-advisory-server-yyyxt.ondigitalocean.app/api
// "http://localhost:8080/api"