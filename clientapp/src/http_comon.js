import axios from "axios";

export const baseURL = "http://localhost:8080/"


const myAxios = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-type": "application/json",
    }
});

export default myAxios;

