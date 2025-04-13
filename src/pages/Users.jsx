import React, { useState, useEffect } from "react";
import { api } from "../services/callAPI.service";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.getAllUsers();
                const data = response.data.data.map((user) => ({
                    ...user,
                    role: user.role?.name || "N/A", // Chuyển role thành chuỗi
                }));
                setUsers(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div style={{ padding: "24px" }}>
            <h2>User List</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Username</th>
                        <th style={cellStyle}>Email</th>
                        
                    </tr>
                </thead>
                <tbody>
    {users.map((user) => (
        <tr key={user._id}>
            <td style={cellStyle}>{user.username}</td>
            <td style={cellStyle}>{user.email}</td>
           
        </tr>
    ))}
</tbody>
            </table>
        </div>
    );
};

const cellStyle = {
    border: "1px solid #ddd",
    padding: "8px",
};

export default Users;
