import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import { useSelector } from "react-redux";

export default function Navbar() {
    const { user } = useSelector((store) => store.auth);

    return (
        <nav className="sticky top-0 z-50 bg-[#F8FCFE]/90 backdrop-blur-lg border-b border-[#E8F1F5]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link
                    to="/"
                    onClick={() => scrollTo(0, 0)}
                    className="flex items-center gap-2"
                >
                    <img src="/logo.svg" alt="logo" className="size-7" />
                    <span className="text-xl lg:text-2xl font-medium font-serif text-[#102E46]">
                        PostOn
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm text-[#5F6B78]">
                    <a href="#features" className="hover:text-[#102E46] transition-colors">
                        Features
                    </a>
                    <a href="#how-it-works" className="hover:text-[#102E46] transition-colors">
                        How it works
                    </a>
                    <a href="#pricing" className="hover:text-[#102E46] transition-colors">
                        Pricing
                    </a>
                </div>

                {user ? (
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-1.5 text-sm font-medium bg-[#102E46] hover:bg-[#183D5C] text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md"
                    >
                        Go to Dashboard
                        <ArrowRightIcon className="size-3.5" />
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="text-sm text-[#5F6B78] hover:text-[#102E46] hidden sm:block transition-colors"
                        >
                            Sign In
                        </Link>

                        <Link
                            to="/login"
                            className="flex items-center gap-1.5 text-sm bg-[#102E46] hover:bg-[#183D5C] text-white px-4 py-2 rounded-full shadow-sm hover:shadow-md"
                        >
                            Get Started
                            <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}