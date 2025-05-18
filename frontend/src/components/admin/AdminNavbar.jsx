import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function AdminNavbar() {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const isActive = (path) => location.pathname === path;

    return (
        <div className=" bg-gray-50">
            <header className="bg-NavbarEfooter px-6 py-4 shadow-md flex justify-between items-center">
                <h1 className="text-2xl font-bold text-black font-serif">Painel Admin</h1>
</header>
        </div>
    );
}
