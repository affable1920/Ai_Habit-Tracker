import { create } from 'zustand'
import http from "../services/httpService"

const endPoint = "/auth";
const tokenKey = "token";

const authStore = create((set, get, api) => ({
    user: null, 
    token: null,
    
    register: async (user) => {
        await http.post(endPoint + "/register")
    }
}))

export default authStore;