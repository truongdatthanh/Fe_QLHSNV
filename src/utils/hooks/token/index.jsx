import { useEffect } from "react"

export const CheckAuth = () => {
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            window.location.href = "/auth/login"
        } else {
            window.location.href = "/"
        }
    }, [])
}