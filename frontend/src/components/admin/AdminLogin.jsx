
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAdminLine } from "react-icons/ri";


export default function AdminLogin() {
    const [nome, setNome] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, senha: password }),
            });

            const data = await response.json();

            if (response.ok) {

                localStorage.setItem("token", data.token)

                navigate("/admin");
            } else {

                setError(data.erro || "Erro ao fazer login");
            }
        } catch (err) {
            console.error("Erro na requisição:", err);
            setError("Erro na conexão com o servidor");
        }
    };


    return (
        <div className="flex min-h-screen col-1 justify-center items-center px-6 py-12 bg-gray-50">
            <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <RiAdminLine size={32} />
                    </div>
                    <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
                        Acesso Administrativo
                    </h2>
                </div>


                <form className="space-y-6" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                            Nome
                        </label>
                        <input
                            id="nome"
                            name="nome"
                            type="name"
                            autoComplete="nome"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Senha
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-dourado focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-NavbarEfooter px-4 py-2 text-white font-medium hover:bg-dourado focus:outline-none focus:ring-2 focus:ring-dourado"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
