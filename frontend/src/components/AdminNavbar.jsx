import { Link, useLocation } from "react-router-dom";
import React from "react";

export default function AdminNavbar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="hidden md:flex bg-NavbarEfooter py-4 px-6 shadow-md">
            <h1 className="text-2xl font-bold text-black font-serif mr-12">
                Painel Admin
            </h1>

            <Link
                to="/admin/pedidos"
                className={`mr-8 text-black hover:text-dourado transition-colors duration-150 ${isActive("/admin/pedidos") ? "text-dourado font-semibold" : ""
                    }`}
            >
                Pedidos
            </Link>

            <Link
                to="/admin/produtos"
                className={`text-black hover:text-dourado transition-colors duration-150 ${isActive("/admin/produtos") ? "text-dourado font-semibold" : ""
                    }`}
            >
                Produtos
            </Link>
        </nav>
    );
}
