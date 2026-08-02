import { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { MenuIcon } from "lucide-react";

const PAGE_TITLES = {
    "/dashboard": "Dashboard",
    "/accounts": "Social Accounts",
    "/ai-composer": "AI Composer",
    "/scheduler": "Post Scheduler",
};

const Layout = () => {
    const location = useLocation();

    const title = PAGE_TITLES[location.pathname] || "SocialAI";

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen bg-[#F1F8FC]">
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-[#102E46]/40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <Sidebar
                isOpen={isMobileMenuOpen}
                setIsOpen={setIsMobileMenuOpen}
            />

            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center gap-4 border-b border-[#E8F1F5] bg-white px-4 md:px-8">
                    <button
                        className="p-2 -ml-2 text-[#5F6B78] md:hidden"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <MenuIcon className="size-6" />
                    </button>

                    <div>
                        <h1 className="text-[#102E46]">
                            {title}
                        </h1>

                        <p className="hidden text-sm text-[#7D8894] sm:block">
                            Manage and automate your social presence
                        </p>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;