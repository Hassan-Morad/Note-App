import axios from "axios";
import { useState } from "react";
import { createContext } from "react";

export const UserContext = createContext(0);

export default function UserContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  async function sendDataToSignup(values) {
    try{
      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        values
      );
      return data;
    }catch(error){
      let err = error.response.data.msg;
      return err
    }
  }
  async function sendDataToLogin(values) {
    try {
      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );

      return data;
    } catch (error) {
      let err = error.response.data.msg;
      return err;
    }
  }
  async function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <UserContext.Provider
      value={{ sendDataToSignup, sendDataToLogin, logout, token, setToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
