import React, { useState, useEffect } from "react";
import { api } from "../services/callAPI.service";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formValues, setFormValues] = useState({
        name: "",
        description: "",
    });

    // Lấy danh sách danh mục từ backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.getAllCategories();
                console.log("Categories data:", response.data); // Kiểm tra dữ liệu trả về
                const data = response.data.data; // Truy cập vào mảng danh mục
                setCategories(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await api.getAllCategories();
            const data = response.data.data; // Truy cập vào mảng danh mục
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading categories:", error);
        }
    };

    // Thêm hoặc chỉnh sửa danh mục
    const handleAddEditCategory = async (e) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await api.updateCategory(editingCategory._id, formValues);
            } else {
                await api.createCategory(formValues);
            }
            setIsModalVisible(false);
            setEditingCategory(null);
            setFormValues({ name: "", description: "" });
            loadCategories();
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    // Chỉnh sửa danh mục
    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormValues(category);
        setIsModalVisible(true);
    };

    // Xóa danh mục
    const handleDelete = async (id) => {
        try {
            await api.deleteCategory(id);
            loadCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    // Hiển thị modal
    const showModal = () => {
        setIsModalVisible(true);
        setEditingCategory(null);
        setFormValues({ name: "", description: "" });
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingCategory(null);
        setFormValues({ name: "", description: "" });
    };

    return (
        <div style={{ padding: "24px" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h2>Manage Categories</h2>
                    <button onClick={showModal} style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        Add Category
                    </button>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category Name</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Description</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{category.name}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{category.description}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    <button onClick={() => handleEdit(category)} style={{ marginRight: "8px", padding: "4px 8px", backgroundColor: "#ffc107", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(category._id)} style={{ padding: "4px 8px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalVisible && (
                <div style={{ position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ backgroundColor: "#fff", padding: "24px", borderRadius: "8px", width: "400px" }}>
                        <h3>{editingCategory ? "Edit Category" : "Add Category"}</h3>
                        <form onSubmit={handleAddEditCategory}>
                            <div style={{ marginBottom: "16px" }}>
                                <label>Category Name</label>
                                <input
                                    type="text"
                                    value={formValues.name}
                                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={formValues.description}
                                    onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                                />
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <button type="button" onClick={handleCancel} style={{ marginRight: "8px", padding: "8px 16px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                    Cancel
                                </button>
                                <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                    {editingCategory ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;