import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon } from "lucide-react";
import axios from "axios";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import { setUser } from "../redux/features/authSlice";
import toast from "react-hot-toast";

export default function Login() {
    const [loginState, setLoginState] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((store) => store.auth)
    
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [showPasswordErrors, setShowPasswordErrors] = useState(false);

    const validatePassword = (password) => {
        const minLength = password.length >= 6;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        return {
            minLength,
            hasUpperCase,
            hasNumber,
            isValid: minLength && hasUpperCase && hasNumber
        };
    };
    const passwordValidation = validatePassword(password);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!loginState && !passwordValidation.isValid) {
            setShowPasswordErrors(true);
            return;
        }

        setShowPasswordErrors(false);

        try {
            setLoading(true)

            const Payload = loginState ? {
                email: email.trim().toLocaleLowerCase(),
                password
            } : {
                name,
                email: email.trim().toLocaleLowerCase(),
                password
            }

            const res = await api.post(`/api/auth/${loginState ? "login" : "register"}`, Payload)
            if (res.data.success) {
                localStorage.setItem("token", res.data.token)
                dispatch(setUser(res.data.user));
                toast(res.data.message);
                navigate("/dashboard");
            }

        } catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, [user])

    return (
        <div className="min-h-screen bg-[#F1F8FC] flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="flex flex-col items-center mb-8">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/logo.svg" alt="Logo" className="size-6.5" />
                            <h1 className="text-2xl">PostOn</h1>
                        </Link>
                        <p className="text-[#7D8894] text-sm mt-1">Sign in to your Dashboard</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5 text-sm">
                        {!loginState && (
                            <div>
                                <label className="block mb-1.5">Name</label>
                                <div className="relative">
                                    <User2Icon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D8894]" />
                                    <input type="text" required placeholder="Enter your name" className="w-full pl-10 pr-4 py-2.5 bg-[#F1F8FC] outline-[#CFEAF5] border border-[#E8F1F5] rounded-full" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block mb-1.5">Email</label>
                            <div className="relative">
                                <MailIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D8894]" />
                                <input type="email" required placeholder="you@company.com" className="w-full pl-10 pr-4 py-2.5 bg-[#F1F8FC] outline-[#CFEAF5] border border-[#E8F1F5] rounded-full" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1.5">Password</label>
                            <div className="relative">
                                <LockIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7D8894]" />
                                <input type="password" required placeholder="********" className="w-full pl-10 pr-4 py-2.5 bg-[#F1F8FC] outline-[#CFEAF5] border border-[#E8F1F5] rounded-full" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {showPasswordErrors && !passwordValidation.isValid && (
                                <div className="mt-2 text-sm space-y-1">
                                    {!passwordValidation.minLength && (
                                        <p className="text-[#78C6E3]">
                                            • At least 6 characters
                                        </p>
                                    )}
                                    {!passwordValidation.hasNumber && (
                                        <p className="text-[#78C6E3]">
                                            • Contains a number
                                        </p>
                                    )}
                                    {!passwordValidation.hasUpperCase && (
                                        <p className="text-[#78C6E3]">
                                            • Contains a capital letter
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <button type="submit" disabled={loading} className="w-full py-2.5 px-4 bg-linear-to-r from-[#102E46] to-[#183D5C] text-white rounded-full text-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                            {loading ? (
                                loginState ? "Signing in..." : "Signing up..."
                            ) : (
                                <>
                                    {loginState ? "Sign In" : "Sign Up"} <ArrowRightIcon className="size-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-[#7D8894]">
                        {loginState ? (
                            <>
                                Don't have an account?{" "}
                                <button onClick={() => setLoginState(false)} className="text-[#102E46] hover:text-[#183D5C]">
                                    Create one free
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button onClick={() => setLoginState(true)} className="text-[#102E46] hover:text-[#183D5C]">
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}