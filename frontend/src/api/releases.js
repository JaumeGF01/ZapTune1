import API from "./api";

export const getReleases = () => API.get("/lanzamientos").then(res => res.data);
export const getRelease = (id) => API.get(`/lanzamientos/${id}`).then(res=>res.data);
export const playRelease = (id) => API.post(`/lanzamientos/${id}/play`);
export const createRelease = async (data) => API.post("/lanzamientos", data);
export const ultimos = () => API.get("/lanzamientos/ultimos").then(res => res.data);
export const populares = () => API.get("/lanzamientos/populares").then(res => res.data);

// const API_URL = 'http://localhost:8000/api';

// const API = axios.create({
//   baseURL: API_URL,
  
// });

// export const getReleases = async () => {
//   const res = await axios.get(`${API_URL}/releases`);
//   return res.data;
// };

// export const getRelease = async (id) => {
//   const res = await axios.get(`${API_URL}/releases/${id}`);
//   return res.data;
// };

// export const createRelease = async (data) => {
//   const res = await API.post('/releases', data);
//   return res.data;
// };