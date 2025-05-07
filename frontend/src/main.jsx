import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Loja from './pages/Loja.jsx';
import Localizacao from './pages/Localizacao.jsx';
import Produto from './pages/Produto.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Carrinho from './pages/Carrinho.jsx';
import Sobre from './pages/Sobre.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/loja',
    element: <Loja />,
  },
  {
    path: '/localizacao',
    element: <Localizacao />,
  },
  {
    path: '/',
    element: <Loja />,
  },
  {
    path: '/Produto/:id',
    element: <Produto/>,
  },
  {
    path: '/Carrinho',
    element: <Carrinho />
  },
  {
    path: '/Sobre',
    element: <Sobre />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
