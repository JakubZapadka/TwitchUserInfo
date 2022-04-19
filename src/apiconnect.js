import axios from "axios";

let api = axios.create({
    headers: {
        Authorization: "Bearer "+process.env.REACT_APP_AUTHORIZATION_API_KEY,
        "Client-ID": process.env.REACT_APP_CLIENT_ID_API_KEY,
    },
});
export default api;