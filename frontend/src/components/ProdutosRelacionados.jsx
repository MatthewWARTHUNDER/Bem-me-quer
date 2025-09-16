import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProdutosRelacionados({ produtoId }) {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    if (!produtoId) return;

    fetch(`http://localhost:3000/produtos-relacionados/${produtoId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProdutos(data);
        } else {
          console.warn("Resposta inesperada:", data);
          setProdutos([]);
        }
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar produtos relacionados:", err);
        setCarregando(false);
      });
  }, [produtoId]);

  return (
    <section className=" max-w-6xl mx-auto mt-12 px-4">
      <h2 className="text-3xl font-bold mb-8 ml-3">Produtos Relacionados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {produtos.map((p) => (
          <Link
            to={`/produto/${p.id}`}
            key={p.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden flex flex-col"
          >
            <img
              src={`/images/${p.imagem}`}
              alt={p.nome}
              className="w-full h-48 object-cover rounded-t-xl"
              loading="lazy"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-1 text-gray-900 truncate">
                {p.nome}
              </h3>
              <p className="text-gray-600 mb-3 capitalize">{p.categoria}</p>
              <p className="text-dourado font-bold text-lg mt-auto">
                R$ {Number(p.preco).toFixed(2)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
