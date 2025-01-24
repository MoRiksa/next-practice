import axios from "axios";

// Membuat instance axios untuk memudahkan konfigurasi API
const api = axios.create({
  baseURL: "https://reqres.in/api", // Base URL untuk Reqres API
});

// Fungsi untuk menyimpan token di localStorage
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Fungsi untuk mengambil token dari localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Fungsi untuk menghapus token dari localStorage
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Fungsi untuk melakukan register
export const register = async (email: string, password: string) => {
  try {
    const response = await api.post("/register", {
      email,
      password,
    });

    // Jika berhasil, simpan token dan kembalikan response
    const { token } = response.data;
    setToken(token);

    return response.data; // Mengembalikan data respon (id, token)
  } catch (error) {
    // Jika gagal, kembalikan error
    throw error;
  }
};

export default api;
