import { http } from "../config/configHeaders";


export const api = {
    postLogin: (data) => http.post("auth/login", data),

    getMe: (token) => http.get("auth/me", token),

    postSignup: (data) => http.post("auth/signup", data),

    getLogout: () => http.get("auth/logout"),  
    // productproduct
    getAllProducts: () => http.get("/products"), // Lấy danh sách sản phẩm
    createProduct: (data) => http.post("/products", data), // Thêm sản phẩm mới
    updateProduct: (id, data) => http.put(`/products/${id}`, data), // Sửa sản phẩm
    deleteProduct: (id) => http.delete(`/products/${id}`), // Xóa sản phẩm

    // cate
    getAllCategories: () => http.get("/categories"), // Lấy danh sách danh mục
    createCategory: (data) => http.post("/categories", data), // Thêm danh mục mới
    updateCategory: (id, data) => http.put(`/categories/${id}`, data), // Sửa danh mục
    deleteCategory: (id) => http.delete(`/categories/${id}`), // Xóa danh mục
    // user 
    getAllUsers: () => http.get("/users"), // Lấy danh sách người dùng
    createUser: (data) => http.post("/users", data), // Thêm người dùng mới
    updateUser: (id, data) => http.put(`/users/${id}`, data), // Sửa thông tin người dùng
    deleteUser: (id) => http.delete(`/users/${id}`), // Xóa người dùng
};