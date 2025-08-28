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
  MdAdd,
  MdCached,
  MdClose,
  MdCreditCard,
  MdGridView,
  MdLogout,
  MdOutlineLocalOffer,
  MdPeople,
  MdMenu,
} from "react-icons/md";
import Turmas from "./Turmas.jsx";
import CadTurmas from "./CadTurma.jsx";
import CadAlunos from "./CadAlunos.jsx";
import Alunos from "./Alunos.jsx";

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
    <div className="flex h-screen font-sans bg-[#4b0082]">
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
          <div className="flex gap-2 items-center">
            <img src={logo} alt="Logo-GFP" className="w-8 h-8" />
            <span className="text-xl font-bold md:hidden lg:block">Nome Projeto</span>
            <button className="md:hidden" onClick={() => setMenuAberto(false)}>
              <MdClose className="w-6 h-6" />
            </button>
          </div>
        </div>
        <nav className="flex-1">
          <div className="px-4 lg:px-6 mb-2">
            <Link
              to="/turmas"
              onClick={() => setMenuAberto(false)}
              className={`flex items center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                location.pathname === "/turmas"
                  ? "bg-cyan-600 text-white shadow-md"
                  : " hover:bg-slate-700"
              }`}
            >
              <MdGridView className="w-8 h-8" />
              <span className="font-medium md:hidden lg:block">Turmas</span>
            </Link>
          </div>
          <div className="px-4 lg:px-6 mb-2">
            <Link
              to="/alunos"
              onClick={() => setMenuAberto(false)}
              className={`flex items center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                location.pathname === "/alunos"
                  ? "bg-cyan-600 text-white shadow-md"
                  : " hover:bg-slate-700"
              }`}
            >
              <MdGridView className="w-8 h-8" />
              <span className="font-medium md:hidden lg:block">Alunos</span>
            </Link>
          </div>
        </nav>

        <div className="border-t border-slate-700 pt-4 ">
          <div className="flex items-center gap-2 px-4 lg:px-6 mb-4">
          <div className="flex items-center p-2">
            <MdPeople className="w-10 h-10 p-2 bg-slate-700 text-cyan-400 rounded-full" />
          </div>
          <div className="ml-3 md:hidden lg:block">
            <p className="font-bold text-white">{dadosUsuario?.nome}</p>
            <p>{dadosUsuario?.email}</p>
          </div>
          </div>
          <button className="flex gap-2 item-center w-full justify-center p-3 text-slate-300" onClick={()=>botaoLogout()}>
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
            <img src={logo} alt="" className="w-8 h-8" />
            <span className="font-bold text-xl">GFP</span>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/turmas" element={<Turmas />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/cadturmas" element={<CadTurmas />} />
            <Route path="/cadalunos" element={<CadAlunos />} />
          </Routes>
        </main>
      </section>
    </div>
  );
}
