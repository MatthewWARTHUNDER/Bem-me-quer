import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavbar from "../../components/admin/AdminNavbar";

export default function AdminCreateForm() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [categoria, setCategoria] = useState('buque');
    const [estoque, setEstoque] = useState('');
    const [imagem, setImagem] = useState(null);
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCarregando(true);
        setMensagem('');

        if (!imagem) {
            setMensagem('Por favor, selecione uma imagem.');
            setCarregando(false);
            return;
        }

        const fd = new FormData();
        fd.append('nome', nome);
        fd.append('descricao', descricao);
        fd.append('preco', preco);
        fd.append('categoria', categoria);
        fd.append('estoque', estoque);
        fd.append('imagem', imagem);

        try {
            await axios.post('http://localhost:3000/produtos', fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Produto criado com sucesso!');
            navigate('/admin/produtos');
        } catch (error) {
            setMensagem('Erro ao criar o produto.');
        } finally {
            setCarregando(false);
        }
    };

    return (
        <>
            <AdminNavbar />
            <section className="bg-CorDeFundo py-12 px-4">
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-4xl font-serif text-VerdeMusgo text-center mb-8">
                        Adicionar Novo Produto
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do Produto</label>
                            <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-VerdeMusgo focus:border-VerdeMusgo" required />
                        </div>
                        <div>
                            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
                            <textarea id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-VerdeMusgo focus:border-VerdeMusgo" required></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="preco" className="block text-sm font-medium text-gray-700">Preço (ex: 99.90)</label>
                                <input type="number" id="preco" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-VerdeMusgo focus:border-VerdeMusgo" required />
                            </div>
                            <div>
                                <label htmlFor="estoque" className="block text-sm font-medium text-gray-700">Estoque</label>
                                <input type="number" id="estoque" value={estoque} onChange={(e) => setEstoque(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-VerdeMusgo focus:border-VerdeMusgo" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
                            <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-VerdeMusgo focus:border-VerdeMusgo">
                                <option value="buque">Buquê</option>
                                <option value="arranjomesas">Arranjos de Mesa</option>
                                <option value="box">Box de Flores</option>
                                <option value="maternidade">Maternidade</option>
                                <option value="vasos">Flores em Vasos</option>
                                <option value="paraeles">Para Eles</option>
                                <option value="agradecimento">Agradecimento</option>
                                <option value="formatura">Formatura</option>
                                <option value="bomboniereEbebibas">Bomboniere & Bebidas</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">Imagem do Produto</label>
                            <input type="file" id="imagem" onChange={(e) => setImagem(e.target.files[0])} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-VerdeMusgo/10 file:text-VerdeMusgo hover:file:bg-VerdeMusgo/20" required />
                        </div>
                        <div className="pt-4 flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => navigate('/admin')}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                disabled={carregando}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-VerdeMusgo hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-VerdeMusgo disabled:bg-gray-400"
                            >
                                {carregando ? 'Salvando...' : 'Criar Produto'}
                            </button>
                        </div>
                    </form>
                    {mensagem && <p className={`mt-6 text-center text-sm text-red-600`}>{mensagem}</p>}
                </div>
            </section>
        </>
    );
}