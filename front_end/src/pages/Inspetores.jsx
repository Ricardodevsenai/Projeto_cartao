import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Inspetores() {
  const [dadosLista, setDadosLista] = useState([]);
  const navigate = useNavigate();

  // Função para exibir cada item da lista QUE NÃO ESTÁ TESTADA AINDA
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
      <section className="bg-white rounded-3xl p-4 shadow-md">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Inspetores</h3>
      </section>
      
    </div>
  );
}