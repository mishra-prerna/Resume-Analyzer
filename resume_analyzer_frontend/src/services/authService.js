import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

export const loginUser = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data;
};

export const registerUser = async (email, password) => {
    const res = await axios.post(`${API_URL}/register`, { email, password });
    return res.data;
};