import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext.jsx";
import { enderecoServidor } from "../utils.jsx";
import { useNavigate } from "react-router-dom";
import Estilos from "../styles/Estilos.jsx";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdCreditCard,
  MdAccountBalance,
  MdEmail,
  MdFeaturedPlayList,

  MdAutoGraph,
} from "react-icons/md";

export default function Turmas() {
  const { dadosUsuario, setDadosUsuario, carregando } =
    useContext(UsuarioContext);
  const [dadosLista, setDadosLista] = useState([]);
  const navigate = useNavigate();


  const buscarDadosAPI = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/turmas`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
      });
      const dados = await resposta.json();
      setDadosLista(dados);
      console.log("dados", dados);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const botaoExcluir = async (id) => {
    try {
      if (!confirm("Tem certeza que deseja excluir esta conta?")) return;

      const resposta = await fetch(`${enderecoServidor}/turmas/${id}`, {
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

  const exibirItemLista = (item) => {
    return (
      <div key={item.id} className={Estilos.linhaListagem}>
        <div className="p-2 bg-cyan-100 text-cyan-600 rounded-full"></div>
        <div className="flex-1 ml-4 ">
          <p className="font-bold text-gray-800">{item.nome_turma}</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className={Estilos.botaoAlterar}
            onClick={() =>
              navigate("/cadturmas", { state: { itemAlterar: item } })
            }
          >
            <MdEdit className="h-6 w-6 " />
          </button>
          <button
            className={Estilos.botaoExcluir}
            onClick={() => botaoExcluir(item.id_turma)}
          >
            <MdDelete className="h-6 w-6 " />
          </button>
        </div>
      </div>
    );
  };
  return (
    <div>
      <section className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800"> Gerenciar Turma</h3>
          <button
            className={Estilos.botaoCadastro}
            onClick={() =>
              navigate("/cadturmas")
            }
          >
            {" "}
            Nova Turma
            <MdAdd className="h-8 w-8" />
          </button>
        </div>
        {/* lista das Turmas cadastradas */}
        <section className="max-h-[75vh] overflow-y-auto pr-2">
          {dadosLista.map((item) => exibirItemLista(item))}
        </section>
      </section>
    </div>
  );
}
