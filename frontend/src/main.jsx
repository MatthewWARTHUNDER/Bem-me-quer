import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

// Importações das Páginas Principais
import App from './App.jsx'
import Loja from './pages/Loja.jsx';
import Produto from './pages/Produto.jsx';
import Carrinho from './pages/Carrinho.jsx';
import Sobre from './pages/Sobre.jsx';
import Localizacao from './pages/Localizacao.jsx';
import Privacidade from './pages/Privacidade.jsx';

// Importações das Páginas de Admin
import AdminPanel from './pages/admin/AdminPanel.jsx'; 
import AdminLoginPage from './pages/admin/AdminLoginPage.jsx'; 
import AdminProductsPage from './pages/admin/AdminProductsPage.jsx'; 
import AdminCreateForm from './pages/admin/AdminCreateForm.jsx';
import AdminPut from './pages/admin/AdminAtualizarProducts.jsx';

const router = createBrowserRouter([
  // Rotas Públicas
  { path: "/", element: <App /> },
  { path: "/loja", element: <Loja /> },
  { path: "/produto/:id", element: <Produto /> },
  { path: "/carrinho", element: <Carrinho /> },
  { path: "/sobre", element: <Sobre /> },
  { path: "/localizacao", element: <Localizacao /> },
  { path: "/politica-de-privacidade", element: <Privacidade /> },

  // Rotas do Administrador
  { path: "/admin/login", element: <AdminLoginPage /> },
  { path: "/admin", element: <AdminPanel /> },
  { path: "/admin/produtos", element: <AdminProductsPage /> },
  { path: "/admin/produtos/criar", element: <AdminCreateForm /> },
  { path: "/admin/produtos/editar/:id", element: <AdminPut /> }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);