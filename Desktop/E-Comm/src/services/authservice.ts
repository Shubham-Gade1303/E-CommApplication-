import api from "./api";

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await api.post("/auth/login", { username, password });
  return response.data.token;
};