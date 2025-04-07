import { http } from "../config/configHeaders";


export const api = {
    postLogin: (data) => http.post("auth/login", data),

    getMe: (token) => http.get("auth/me", token),

    postSignup: (data) => http.post("auth/signup", data),

    getLogout: () => http.get("auth/logout"),  
    
    getAllEmployees: () => http.get("employee"),
};