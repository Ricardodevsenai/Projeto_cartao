import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext.jsx";
import { enderecoServidor } from "../utils.jsx";
import { useNavigate } from "react-router-dom";
import Estilos from "../styles/Estilos.jsx";
import {
  MdDelete,
  MdAdd,
  MdEdit,
  MdEmail,
  MdFeaturedPlayList,
  MdAttachMoney,
  MdAutoGraph,
} from "react-icons/md";

export default function registros() {
  const { dadosUsuario, setDadosUsuario, carregando } =
    useContext(UsuarioContext);
  const [dadosLista, setDadosLista] = useState([]);
  const navigate = useNavigate();
  const [turmaSelecionada, setTurmaSelecionada] = useState("todas");
  // const [turmasDisponiveis, setTurmasDisponiveis] = useState([]);

  const buscarDadosAPI = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/registros`, {
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

  //   const botaoExcluir = async (id) => {
  //     try {
  //       if (!confirm("Tem certeza que deseja excluir esse registro?")) return;

  //       const resposta = await fetch(`${enderecoServidor}/alunos/${id}`, {
  //         method: "DELETE",
  //         headers: {
  //           Authorization: `Bearer ${dadosUsuario.token}`,
  //         },
  //       });

  //       if (resposta.ok) {
  //         buscarDadosAPI();
  //       }
  //     } catch (error) {
  //       console.error("Erro ao excluir:", error);
  //     }
  //   };

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
          <p className="font-bold text-gray-800">{item.nome}</p>
          <p className="text-gray-500 text-sm">
            Horario:
            {item.hora
              ? new Date(item.hora).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </p>
          <p className="text-gray-500 text-sm">Tipo: {item.tipo}</p>
          <p className="text-gray-500 text-sm">Cartão: {item.cartao}</p>
        </div>
        {/* <div className="flex items-center space-x-2">
          <button
            className={Estilos.botaoAlterar}
            onClick={() =>
              navigate("/cadalunos", { state: { itemAlterar: item } })
            }
          >
            <MdEdit className="h-6 w-6 " />
          </button>
          <button
            className={Estilos.botaoExcluir}
            onClick={() => botaoExcluir(item.id_aluno)}
          >
            <MdDelete className="h-6 w-6 " />
          </button>
        </div> */}
      </div>
    );
  };
  return (
    <div>
 
      <section className="bg-white  rounded-3xl p-4 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-indigo-800">
            {" "}
            Gerenciar Registros
          </h3>
        </div>
        {/* lista das Alunos cadastradas */}
        <section className="max-h-[75vh] ocultar-scroll overflow-y-auto pr-2">
          {dadosLista.map((item) => exibirItemLista(item))}
        </section>
      </section>
    </div>
  );
}
