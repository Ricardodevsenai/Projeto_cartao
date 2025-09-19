import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext";
import {
  useNavigate,
  Link,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import logo from "../assets/logo2.png";
import {
  MdDescription,
  MdGroups,
  MdClass,
  MdPeopleAlt,
  MdCached,
  MdClose,
  MdCreditCard,
  MdGridView,
  MdLogout,
  MdOutlineLocalOffer,
  MdPeople,
  MdMenu,
  MdFoodBank,
  MdOutlineLocalCafe,
} from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";

import Turmas from "./Turmas.jsx";
import CadTurmas from "./CadTurma.jsx";
import CadAlunos from "./CadAlunos.jsx";
import Alunos from "./Alunos.jsx";
import Dashboard from "./Dashboard.jsx";
import Registros from "./Registro.jsx";
import Inspetores from "./Inspetores.jsx";
import Cozinha from "./Cozinha.jsx";
import Usuarios from "./Usuarios.jsx";

export default function Principal() {
  const { dadosUsuario, setDadosUsuario, carregando } =
    useContext(UsuarioContext);

  const [menuAberto, setMenuAberto] = useState(false);

  const navigate = useNavigate();
  const location = useLocation(); // Obter a rota atual

  useEffect(() => {
    if (!dadosUsuario && !carregando) {
      navigate("/login");
    }
  }, [dadosUsuario, carregando, navigate]);
  const botaoLogout = () => {
    try {
      localStorage.removeItem("UsuarioLogado");
      setDadosUsuario(null); // Limpa os dados do usuário no contexto
      navigate("/");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <div className="flex h-screen font-sans bg-[#8e2de2]">
      {/* div para fechar o menu clicando fora */}
      <div
        className={`fixed inset-0  bg-opacity-80 z-30 md:hidden transition-opacity duration-300 ${
          menuAberto ? "block" : "hidden"
        }`}
        onClick={() => setMenuAberto(false)}
      ></div>
      {/* sidebar */}
      <section
        className={`fixed top-0 left-0 h-full w-64 bg-[#4b0082]  text-gray-200 flex flex-col z-40 transform transition-transform md:relative md:w-20 lg:w-60 md:translate-x-0 ${
          menuAberto == true ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6 p-4 border-b border-gray-700">
          <div className="flex gap-2 items-center justify-center">
            <img
              src="https://www.ielrs.org.br/sites/default/files/logos/logos_senai_branco.png"
              alt=""
              className="w-15 h-5"
            />

            <button className="md:hidden" onClick={() => setMenuAberto(false)}>
              <MdClose className="w-6 h-6" />
            </button>
          </div>
        </div>
        <nav className="flex-1">
          {dadosUsuario?.tipo_acesso.trim() == "ADMINISTRADOR" && (
            <div className="px-4 lg:px-6 mb-2">
              <Link
                to="/"
                onClick={() => setMenuAberto(false)}
                className={`flex items center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/"
                    ? "bg-purple-600 text-white shadow-md"
                    : " hover:bg-purple-900"
                }`}
              >
                <MdGridView className="w-8 h-8" />
                <span className="font-medium md:hidden lg:block">
                  Dashboard
                </span>
              </Link>
            </div>
          )}
          {dadosUsuario?.tipo_acesso.trim() == "ADMINISTRADOR" && (
            <div className="px-4 lg:px-6 mb-2">
              <Link
                to="/turmas"
                onClick={() => setMenuAberto(false)}
                className={`flex items center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/turmas"
                    ? "bg-purple-600 text-white shadow-md"
                    : " hover:bg-purple-900"
                }`}
              >
                <MdClass className="w-8 h-8" />
                <span className="font-medium md:hidden lg:block">Turmas</span>
              </Link>
            </div>
          )}

          {dadosUsuario?.tipo_acesso.trim() == "ADMINISTRADOR" && (
            <div className="px-4 lg:px-6 mb-2">
              <Link
                to="/alunos"
                onClick={() => setMenuAberto(false)}
                className={`flex items center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/alunos"
                    ? "bg-purple-600 text-white shadow-md"
                    : " hover:bg-purple-900"
                }`}
              >
                <MdGroups className="w-8 h-8" />
                <span className="font-medium md:hidden lg:block">Alunos</span>
              </Link>
            </div>
          )}

          {dadosUsuario?.tipo_acesso.trim() == "ADMINISTRADOR" && (
            <div className="px-4 lg:px-6 mb-2">
              <Link
                to="/registros"
                onClick={() => setMenuAberto(false)}
                className={`flex items center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/registros"
                    ? "bg-purple-600 text-white shadow-md"
                    : " hover:bg-purple-900"
                }`}
              >
                <MdDescription className="w-8 h-8" />
                <span className="font-medium md:hidden lg:block">
                  Registros
                </span>
              </Link>
            </div>
          )}

          {dadosUsuario?.tipo_acesso.trim() == "ADMINISTRADOR" && (
            <div className="px-4 lg:px-6 mb-2">
              <Link
                to="/usuarios"
                onClick={() => setMenuAberto(false)}
                className={`flex items center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/usuarios"
                    ? "bg-purple-600 text-white shadow-md"
                    : " hover:bg-purple-900"
                }`}
              >
                <FaUsersGear className="w-8 h-8" />
                <span className="font-medium md:hidden lg:block">Usuarios</span>
              </Link>
            </div>
          )}

          {(dadosUsuario?.tipo_acesso.trim() == "INSPETOR" ||
            dadosUsuario?.tipo_acesso.trim() == "ADMINISTRADOR") && (
            <div className="px-4 lg:px-6 mb-2">
              <Link
                to="/inspetores"
                onClick={() => setMenuAberto(false)}
                className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/inspetores"
                    ? "bg-purple-600 text-white shadow-md"
                    : " hover:bg-purple-900"
                }`}
              >
                <MdPeopleAlt className="w-8 h-8" />
                <span className="font-medium md:hidden lg:block">
                  Inspetores
                </span>
              </Link>
            </div>
          )}

          {(dadosUsuario?.tipo_acesso.trim() == "COZINHA" ||
            dadosUsuario?.tipo_acesso.trim() == "ADMINISTRADOR") && (
            <div className="px-4 lg:px-6 mb-2">
              <Link
                to="/cozinha"
                onClick={() => setMenuAberto(false)}
                className={`flex items center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                  location.pathname === "/cozinha"
                    ? "bg-purple-600 text-white shadow-md"
                    : " hover:bg-purple-900"
                }`}
              >
                <MdFoodBank className="w-8 h-8" />
                <span className="font-medium md:hidden lg:block">Cozinha</span>
              </Link>
            </div>
          )}
        </nav>

        <div className="border-t border-gray-700 pt-4 ">
          <div className="flex items-center gap-3 px-4 lg:px-6 mb-4">
            <div className="flex-shrink-0">
              <MdPeople className="w-12 h-12 p-2 bg-gradient-to-tr from-purple-400 to-blue-500 text-white rounded-full shadow-lg" />
            </div>
            <div className="ml-2 md:hidden lg:block">
              <p className="font-bold text-white text-lg truncate">
                {dadosUsuario?.nome}
              </p>
              <p className="text-gray-300 text-sm truncate">
                {dadosUsuario?.email}
              </p>
            </div>
          </div>
          <button
            className="flex items-center gap-3 w-full justify-center p-3  rounded-lg text-white font-medium transition-all duration-200 shadow-md"
            onClick={() => botaoLogout()}
          >
            <MdLogout className="w-8 h-8" />
            <span className="md:hidden lg:block">Sair</span>
          </button>
        </div>
      </section>

      {/* conteudo principal */}
      <section className="flex-1 p-4 text-gray-100 overflow-auto">
        <header className="flex items-center mb-3">
          <button className="md:hidden" onClick={() => setMenuAberto(true)}>
            <MdMenu className="w-8 h-8" />
          </button>
          <div className="flex items-center justify-center flex-1 gap-2 md:hidden">
            <img
              src="https://sesirs.iev.com.br/uploads/companies/8572/VDxChWKBicbkEnsc4FvVaPtiPRUIFY0WP7HR09Lg.png"
              alt=""
              className="w-15 h-6"
            />
            <img
              src="https://www.ielrs.org.br/sites/default/files/logos/logos_senai_branco.png"
              alt=""
              className="w-15 h-6"
            />
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/turmas" element={<Turmas />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/cadturmas" element={<CadTurmas />} />
            <Route path="/cadalunos" element={<CadAlunos />} />
            <Route path="/registros" element={<Registros />} />
            <Route path="/inspetores" element={<Inspetores />} />
            <Route path="/cozinha" element={<Cozinha />} />
            <Route path="/usuarios" element={<Usuarios />} />
          </Routes>
        </main>
      </section>
    </div>
  );
}
