import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/callAPI.service';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    const onSubmit = async (data) => {
        try {
            const user = await api.postLogin(data);
            if (user.status === 200) {
                localStorage.setItem("token", user.data.data);
                navigate("/", { replace: true });
                alert("Đăng nhập thành công");
            } else {
                alert("Đăng nhập thất bại");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Đăng nhập thất bại");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>UserName:</label>
                <input
                    type="text"
                    defaultValue="truongdat1"
                    placeholder="Nhập tên tài khoản"
                    {...register("username", { required: "Vui lòng nhập tên tài khoản" })}
                />
                {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
                <label>Password:</label>
                <input
                    type="password"
                    defaultValue="Dat20031@"
                    placeholder="Nhập mật khẩu"
                    {...register("password", {
                        required: "Vui lòng nhập mật khẩu",
                        minLength: {
                            value: 8,
                            message: "Mật khẩu phải ít nhất 8 ký tự"
                        }
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button type="submit">Đăng nhập</button>

            <div>Nếu chưa có tài khoản
                <a href="/auth/register">Đăng ký ngay</a>
            </div>
        </form>
    );
};

export default Login;