import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    HiMenu,
    HiOutlineX,
    HiOutlineUserCircle,
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineClipboardList,
    HiOutlineCollection,
} from "react-icons/hi";
import { useAuthentication } from "../../utils/provider";

const navLinks = [
    { to: "/", label: "Dashboard", icon: <HiOutlineViewGrid /> },
    { to: "/products", label: "Products", icon: <HiOutlineCube /> },
    { to: "/orders", label: "Orders", icon: <HiOutlineClipboardList /> },
    { to: "/categories", label: "Categories", icon: <HiOutlineCollection /> },
];

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useAuthentication()

    return (
        <>
            {/* Mobile toggle */}
            <div className="md:hidden p-4 bg-white dark:bg-dark-800 shadow z-10">
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-2xl text-gray-700 dark:text-gray-200"
                >
                    <HiMenu />
                </button>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed z-30 md:static top-0 left-0 h-screen w-56 bg-white dark:bg-dark-800 shadow transform transition-transform duration-200 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    } overflow-hidden`}
            >
                <div className="h-full flex flex-col justify-between">
                    <div className="overflow-y-auto px-4 py-6 flex-1">
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                            MyAdmin
                        </h1>

                        <nav className="space-y-2 mt-[70%]">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? "bg-gray-200 dark:bg-dark-700 text-black dark:text-white"
                                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700"
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.icon}
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    <div className="px-4 py-4 border-t border-gray-200 dark:border-dark-700 flex items-center gap-3">
                        <HiOutlineUserCircle className="text-3xl text-gray-600 dark:text-gray-300" />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                {currentUser?.firstName} {currentUser?.lastName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {currentUser?.email}
                            </p>
                        </div>
                        {/* Close button on mobile */}
                        <button
                            className="ml-auto text-gray-400 md:hidden"
                            onClick={() => setIsOpen(false)}
                        >
                            <HiOutlineX className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
}
