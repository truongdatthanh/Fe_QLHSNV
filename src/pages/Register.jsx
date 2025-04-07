import React from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/callAPI.service';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const res = await api.postSignup(data);
        if (res.status !== 200) {
            alert("Đăng ký thất bại");
            return;
        }
        navigate("/auth/login", { replace: true });
        alert("Đăng ký thành công");
    };

    return (
        <div className="register-form">
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>UserName:</label>
                    <input
                        type="text"
                        placeholder="Nhập tên tài khoản"
                        {...register("username", { required: "Vui lòng nhập tên tài khoản" })}
                    />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
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
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Nhập email"
                        {...register("email", { required: "Vui lòng nhập email" })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        placeholder="Nhập họ tên"
                        {...register("fullname", { required: "Vui lòng nhập họ tên" })}
                    />
                    {errors.fullname && <p>{errors.fullname.message}</p>}
                </div>

                <button type="submit">Đăng ký</button>
            </form>
        </div>
    );
};

export default Register;
