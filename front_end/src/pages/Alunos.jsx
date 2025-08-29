import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext.jsx";
import { enderecoServidor } from "../utils.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import Estilos from "../styles/Estilos.jsx";
import { MdDelete, MdAdd, MdEdit, MdSearch } from "react-icons/md";

export default function Alunos() {
  const { dadosUsuario, carregando } = useContext(UsuarioContext);
  const [dadosLista, setDadosLista] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState("todos"); // estado do filtro
  const [pesquisa, setPesquisa] = useState(""); // para barra de pesqui
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  if (location.state?.turmaSelecionada) {
    setTurmaSelecionada(location.state.turmaSelecionada);
  }
}, [location.state]);

  const buscarDadosAPI = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/alunos`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
      });
      const dados = await resposta.json();
      setDadosLista(dados);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const botaoExcluir = async (id) => {
    try {
      if (!confirm("Tem certeza que deseja excluir esse aluno?")) return;

      const resposta = await fetch(`${enderecoServidor}/alunos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
      });

      if (resposta.ok) {
        buscarDadosAPI();
      }
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  useEffect(() => {
    if (dadosUsuario || !carregando) {
      buscarDadosAPI();
    }
  }, [dadosUsuario]);

  const exibirItemLista = (item) => (
    <div
      key={item.id_aluno}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 border border-gray-200 p-6 mb-4"
    >
      <div className="flex items-start justify-between">
        {/* Avatar e informações */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-cyan-100 text-cyan-600 font-bold text-lg shadow-inner">
            {item.nome[0]}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-lg">{item.nome}</p>
            <p className="text-gray-500 text-sm">
              Nascimento:{" "}
              {item.idade
                ? new Date(item.idade).toLocaleDateString("pt-BR")
                : ""}
            </p>
            <p className="text-gray-500 text-sm">Gênero: {item.sexo}</p>
            <p className="text-gray-500 text-sm">RM: {item.rm}</p>
            <p className="text-gray-500 text-sm">Turma: {item.nome_turma}</p>
            <p className="text-gray-500 text-sm">Cartão: {item.cartao}</p>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col space-y-2 justify-center">
          <button
            className="p-2 bg-indigo-300 border-2 border-indigo-500 hover:bg-indigo-400 rounded-lg transition"
            onClick={() =>
              navigate("/cadalunos", { state: { itemAlterar: item } })
            }
          >
            <MdEdit className="h-6 w-6" />
          </button>
          <button
            className="p-2 bg-red-400 border-2 border-red-500 hover:bg-red-500 rounded-lg transition"
            onClick={() => botaoExcluir(item.id_aluno)}
          >
            <MdDelete className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );

  const turmasUnicas = [
    ...new Set(dadosLista.map((aluno) => aluno.nome_turma).filter(Boolean)),
  ];

  // Filtrar os alunos pela turma selecionada e pela pesquisa
  const alunosFiltrados = dadosLista.filter((aluno) => {
    const filtroTurma =
      turmaSelecionada === "todos" || aluno.nome_turma === turmaSelecionada;
    const filtroPesquisa =
      aluno.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
      aluno.rm?.toString().includes(pesquisa);
    return filtroTurma && filtroPesquisa;
  });

  return (
    <div className="p-6 bg-gray-100 h-auto rounded-3xl">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        {/* Título à esquerda */}
        <h3 className="text-2xl font-bold text-indigo-800">Gerenciar Alunos</h3>

        {/* Centro: pesquisa + select */}
        <div className="flex flex-1 justify-center items-center gap-2">
          {/* Barra de pesquisa */}
          <div className="flex items-center bg-white border-2 border-indigo-400 rounded-lg px-3 shadow-sm w-full md:w-72">
            <MdSearch className="text-indigo-500 w-5 h-5 mr-2" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou RM..."
              className="w-full p-2 focus:outline-none text-gray-700"
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
          </div>

          {/* Select de turmas */}
          <select
            className="bg-indigo-400 text-white px-4 py-2 rounded-lg border-2 border-indigo-500 hover:scale-105 duration-300 shadow-sm cursor-pointer"
            value={turmaSelecionada}
            onChange={(e) => setTurmaSelecionada(e.target.value)}
          >
            <option value="todos">Todas as turmas</option>
            {turmasUnicas.map((turma, idx) => (
              <option key={idx} value={turma}>
                {turma}
              </option>
            ))}
          </select>
        </div>

        {/* Botão à direita */}
        <button
          className={Estilos.botaoCadastro}
          onClick={() => navigate("/cadalunos")}
        >
          <span>Novo Aluno</span>
          <MdAdd className="h-6 w-6" />
        </button>
      </div>

      {/* Lista de alunos (fora do cabeçalho) */}
      <section className="max-h-[75vh] overflow-y-auto pr-2 ocultar-scroll grid grid-cols-1 md:grid-cols-2 gap-2">
        {alunosFiltrados.map((item) => exibirItemLista(item))}
      </section>
    </div>
  );
}
