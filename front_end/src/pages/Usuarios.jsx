import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext.jsx";
import { enderecoServidor } from "../utils.jsx";
import { useNavigate } from "react-router-dom";
import Estilos from "../styles/Estilos.jsx";
import { MdAdd, MdEdit, MdDelete } from "react-icons/md";

export default function Usuarios() {
  const { dadosUsuario, carregando } = useContext(UsuarioContext);
  const [dadosLista, setDadosLista] = useState([]);
  const navigate = useNavigate();

  const buscarDadosAPI = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/usuarios`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
      });
      const dados = await resposta.json();
      setDadosLista(dados);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const botaoExcluir = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const resposta = await fetch(`${enderecoServidor}/usuarios/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
      });

      if (resposta.ok) buscarDadosAPI();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  useEffect(() => {
    if (dadosUsuario || !carregando) buscarDadosAPI();
  }, [dadosUsuario]);

  const exibirItemLista = (item) => (
    <div
      key={item.id_usuario}
      className={`${Estilos.linhaListagem} cursor-pointer`}
      onClick={() =>
        navigate("/cadusuarios", { state: { itemAlterar: item } })
      }
    >
      <div className="flex-1 ml-4">
        <p className="font-bold text-gray-800">
          Nome: {item.nome}
        </p>
        <p className="text-gray-600">Email: {item.email}</p>
        <p className="text-gray-600">Acesso: {item.tipo_acesso}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="p-2 bg-indigo-300 border-2 border-indigo-500 hover:bg-indigo-400 rounded-lg transition"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/cadusuarios", { state: { itemAlterar: item } });
          }}
        >
          <MdEdit className="h-6 w-6 " />
        </button>
        <button
          className="p-2 bg-red-400 border-2 border-red-500 hover:bg-red-500 rounded-lg transition"
          onClick={(e) => {
            e.stopPropagation();
            botaoExcluir(item.id_usuario);
          }}
        >
          <MdDelete className="h-6 w-6 " />
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <section className="bg-white p-4 rounded-2xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-indigo-800">Gerenciar Usuários</h3>
          <button
            className={Estilos.botaoCadastro}
            onClick={() => navigate("/cadusuarios")}
          >
            Novo Usuário <MdAdd className="h-8 w-8" />
          </button>
        </div>
        <section className="max-h-[75vh] overflow-y-auto pr-2 ocultar-scroll grid grid-cols-1 md:grid-cols-2 gap-2">
          {dadosLista.map((item) => exibirItemLista(item))}
        </section>
      </section>
    </div>
  );
}
