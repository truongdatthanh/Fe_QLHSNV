import { http } from "../config/configHeaders";


export const api = {
    postLogin: (data) => http.post("auth/login", data),
    getMe: (token) => http.get("auth/me", token),

    postSignup: (data) => http.post("auth/signup", data),

    getLogout: () => http.get("auth/logout"),  
    getAllEmployees: () => http.get("employee"),
    getContractByEmployeeId: (id) => http.get(`contract/${id}`),
    getAllContracts: () => http.get("contract"),
    getEducationByEmployeeId: (id) => http.get(`education/${id}`),
    postCreateEmployee: (data) => http.post("employee", data),
    postCreateContract: (data) => http.post("contract", data),
    postCreateEducation: (data) => http.post("education", data),
    getAllPositions: () => http.get("position"),

    getAllDepartments: () => http.get("department"),
    postCreateDepartment: (data) => http.post("department", data),
    deleteDepartment: (id) => http.delete(`department/${id}`),
    
    postCreatePosition: (data) => http.post("position", data),
    deletePosition: (id) => http.delete(`position/${id}`),


};