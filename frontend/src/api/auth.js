import API from "./api";

export const register = (data) => API.post("/register", data);
export const login = (data) => API.post("/login", data);
export const update = (data) => API.put("/user", data);

// const API = axios.create({
//     baseURL: "http://127.0.0.1:8000/api",
//     withCredentials: true,
// });

// export const register = (data) => API.post("/register", data);
// export const login = (data) => API.post("/login", data);
