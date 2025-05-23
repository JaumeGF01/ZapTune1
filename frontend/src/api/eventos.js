import API from "./api";

export const getEventos = () => API.get("/eventos").then(res => res.data);
export const getEvento = (id) => API.get(`/eventos/${id}`).then(res=>res.data);
export const createEvento = async (data) => API.post("/eventos", data);