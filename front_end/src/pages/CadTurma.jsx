import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext.jsx";
import { enderecoServidor } from "../utils.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import Estilos from "../styles/Estilos.jsx";
import {

  MdEdit,
  MdDelete,
  MdCreditCard,
  MdAccountBalance,
  MdEmail,
  MdFeaturedPlayList,
  MdAttachMoney,
  MdAutoGraph,
  MdClose,
  MdSave,
} from "react-icons/md";

export default function CadTurmas() {
  const { dadosUsuario, setDadosUsuario, carregando } =
    useContext(UsuarioContext);
  const [nome, setNome] = useState("");
  const [dadosLista, setDadosLista] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const itemAlterar = location?.state?.itemAlterar || null;

useEffect(() => {
  if (itemAlterar) {
    setNome(itemAlterar.nome_turma);

  }
},[itemAlterar])
  const botaoSalvar = async () => {
    if (nome.trim() == "") {
      alert("informe o nome da turma");
      return;
    }
    const dados = {
      nome_turma: nome,
      ativo: true,
    };
    try {
      let endpoint = `${enderecoServidor}/turmas`;
      let metodo = "POST";
      if (itemAlterar) {
        endpoint += `/${itemAlterar.id_turma}`;
        metodo = "PUT";
      }

      const resposta = await fetch(endpoint, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
        body: JSON.stringify(dados),
      });
      if (resposta.ok) {
          navigate("/turmas");
      }
    } catch (error) {
      alert("erro ao salvar turma " + error.message);
      console.log("erro ao salvar turma: ", error.message);
    }
  };
  return (
    <div className="flex justify-center py-6 px-4">
      <section className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-gray-800">
        {/* cabeçalho */}
        <header className="flex itens-center gap-2 mb-6 border-b border-grat-200 pb-4">
          <MdCreditCard className="text-cyan-600 h-8 w-8" />
          <h2 className="text-2x1 font-bold">{itemAlterar ? "Editar Turma" : "Nova Turma"} </h2>
        </header>
        {/* Formulario de cadastro */}
        <div className="space-y-5 ">
          <label className={Estilos.labelCadastro}>Nome da Turma</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="EX: 1EM"
            className={Estilos.inputCadastro}
          />
         
          <div className="flex justify-end gap-3 mt-8">
            {/* Botões de controle */}
            <button
              className={Estilos.botaoOutline}
              onClick={() => navigate("/turmas")}
            >
              <MdClose /> Cancelar
            </button>
            <button className={Estilos.botao} onClick={botaoSalvar}>
              <MdSave /> Salvar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}