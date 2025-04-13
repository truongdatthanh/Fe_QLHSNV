
import { http } from "../config/configHeaders";


export const api = {
    postLogin: (data) => http.post("auth/login", data),
    getMe: (token) => http.get("auth/me", token),
    postSignup: (data) => http.post("auth/signup", data),
    getLogout: () => http.get("auth/logout"),  
    postChangePassword: (data) => http.post("auth/change-password", data),


    //menu 
    GetAllMenus: () => http.get("menu"),

    //product
    getAllProducts: () => http.get("products"),
    getProductById: (id) => http.get(`products/${id}`),


    //cart
    getCart: () => http.get("carts"),
    addToCart: (data) => http.post("carts", data),
    updateCart: (data) => http.put("carts", data),
    deleteCart: (id) => http.delete(`carts/${id}`),


    //order
    createOrder: (data) => http.post("orders", data),

    //voucher   
    getVoucherByCode: (code) => http.get(`vouchers/${code}`),
};