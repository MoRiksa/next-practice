import axios from "axios";
import { CreateUser, User } from "../Interfaces/UsersInterfaces";

const API_URL = "https://reqres.in/api/users";

export const UsersService = {
  async fetchUsers(): Promise<User[]> {
    const response = await axios.get(API_URL);
    return response.data.data; // Data pengguna
  },

  async addUser(data: { name: string; job: string }): Promise<CreateUser> {
    const response = await axios.post(API_URL, data);
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
  },
};
