import api from "./api";
import { user } from "../types/index";

export const getUserById = async (id: number): Promise<user> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};