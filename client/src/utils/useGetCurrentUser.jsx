import { useDispatch } from "react-redux"
import { useEffect } from "react";
import api from "../api/api.js";
import { setUser } from "../redux/features/authSlice";


const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                dispatch(setUser(null));
                return;
            }
            try {
                const res = await api.get("/api/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.data.user) {
                    dispatch(setUser(res.data.user))
                }

            } catch (error) {
                localStorage.removeItem("token");
                dispatch(setUser(null));
            }
        }
        fetchUser()
    }, [dispatch])
}

export default useGetCurrentUser