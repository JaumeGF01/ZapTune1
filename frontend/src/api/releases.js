import API from "./api";

export const getReleases = () => API.get("/lanzamientos").then(res => res.data);
export const getRelease = (id) => API.get(`/lanzamientos/${id}`).then(res=>res.data);
export const playRelease = (id) => API.post(`/lanzamientos/${id}/play`);
export const createRelease = async (data) => API.post("/lanzamientos", data);
export const ultimos = () => API.get("/lanzamientos/ultimos").then(res => res.data);
export const populares = () => API.get("/lanzamientos/populares").then(res => res.data);
