import {
  CalendarDaysIcon,
  LayoutDashboardIcon,
  LogOut,
  UsersIcon,
  Wand2Icon,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  const location = useLocation();

  const NAV_ITEMS = [
    {
      name: "Dashboard",
      icon: LayoutDashboardIcon,
      path: "/dashboard",
    },
    {
      name: "Accounts",
      icon: UsersIcon,
      path: "/accounts",
    },
    {
      name: "PostOn",
      icon: CalendarDaysIcon,
      path: "/scheduler",
    },
    {
      name: "AI Composer",
      icon: Wand2Icon,
      path: "/ai-composer",
    },
  ];

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E8F1F5] flex flex-col h-full transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* Logo */}
      <div className="p-6 pb-4">
        <Link to="/">
          <div className="flex items-center gap-2 text-xl font-semibold tracking-tight text-[#102E46]">
            <img src="/logo.svg" alt="logo" className="size-6" />
            PostOn
          </div>
        </Link>
      </div>

      {/* Menu Label */}
      <div className="px-6 py-2">
        <span className="text-xs uppercase tracking-wider text-[#7D8894]">
          Menu
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition-all duration-150 ${isActive
                  ? "border-[#CFEAF5] bg-[#EAF8FD] text-[#102E46]"
                  : "border-transparent text-[#5F6B78] hover:bg-[#F8FCFE] hover:text-[#102E46]"
                }`}
            >
              <item.icon
                className={`size-5 shrink-0 ${isActive ? "text-[#78C6E3]" : "text-[#5F6B78]"
                  }`}
              />

              <span>{item.name}</span>

              {isActive && (
                <span className="ml-auto h-5 w-1 rounded-full bg-[#78C6E3]" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="border-t border-[#E8F1F5] p-4">
        <div className="mb-3 flex items-center gap-3 rounded-lg p-2 hover:bg-[#F8FCFE] transition-colors">
          <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-500 text-sm font-semibold text-white shrink-0">
            {user?.name?.charAt(0).toUpperCase() || (
              <UsersIcon className="size-5" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#102E46]">
              {user?.name}
            </p>
            <p className="truncate text-xs text-[#7D8894]">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#5F6B78] transition-all duration-200 hover:bg-[#EAF8FD] hover:text-[#102E46]"
        >
          <LogOut className="size-4" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;