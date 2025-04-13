import React, { useState, useEffect } from "react";
import { api } from "../services/callAPI.service";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formValues, setFormValues] = useState({
        name: "",
        price: "",
        quantity: "",
        category: "",
    });

    // Lấy danh sách sản phẩm từ backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.getAllProducts();
                console.log("Products data:", response.data); // Kiểm tra dữ liệu trả về
                const data = response.data.data; // Truy cập vào mảng sản phẩm
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
    
        fetchProducts();
    }, []);
    
    const loadProducts = async () => {
        try {
            const response = await api.getAllProducts();
            const data = response.data.data; // Truy cập vào mảng sản phẩm
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error loading products:", error);
        }
    };
    // Thêm hoặc chỉnh sửa sản phẩm
    const handleAddEditProduct = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await api.updateProduct(editingProduct._id, formValues);
            } else {
                await api.createProduct(formValues);
            }
            setIsModalVisible(false);
            setEditingProduct(null);
            setFormValues({ name: "", price: "", quantity: "", category: "" });
            loadProducts();
        } catch (error) {
            console.error("Error saving product:", error);
        }
    };

    // Chỉnh sửa sản phẩm
    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormValues(product);
        setIsModalVisible(true);
    };

    // Xóa sản phẩm
    const handleDelete = async (id) => {
        try {
            await api.deleteProduct(id);
            loadProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    // Hiển thị modal
    const showModal = () => {
        setIsModalVisible(true);
        setEditingProduct(null);
        setFormValues({ name: "", price: "", quantity: "", category: "" });
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingProduct(null);
        setFormValues({ name: "", price: "", quantity: "", category: "" });
    };

    return (
        <div style={{ padding: "24px" }}>
            <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h2>Manage Products</h2>
                    <button onClick={showModal} style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                        Add Product
                    </button>
                </div>

                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Product Name</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.price}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.quantity}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.category?.name || "N/A"}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    <button onClick={() => handleEdit(product)} style={{ marginRight: "8px", padding: "4px 8px", backgroundColor: "#ffc107", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(product._id)} style={{ padding: "4px 8px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
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
                        <h3>{editingProduct ? "Edit Product" : "Add Product"}</h3>
                        <form onSubmit={handleAddEditProduct}>
                            <div style={{ marginBottom: "16px" }}>
                                <label>Product Name</label>
                                <input
                                    type="text"
                                    value={formValues.name}
                                    onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label>Price</label>
                                <input
                                    type="number"
                                    value={formValues.price}
                                    onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    value={formValues.quantity}
                                    onChange={(e) => setFormValues({ ...formValues, quantity: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: "16px" }}>
                                <label>Category</label>
                                <input
                                    type="text"
                                    value={formValues.category}
                                    onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                                    style={{ width: "100%", padding: "8px", marginTop: "4px" }}
                                    required
                                />
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <button type="button" onClick={handleCancel} style={{ marginRight: "8px", padding: "8px 16px", backgroundColor: "#6c757d", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                    Cancel
                                </button>
                                <button type="submit" style={{ padding: "8px 16px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                                    {editingProduct ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;