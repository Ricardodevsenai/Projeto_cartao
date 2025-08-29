import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext.jsx";
import { enderecoServidor } from "../utils.jsx";
import { useNavigate, useLocation } from "react-router-dom";
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
  MdClose,
  MdSave,
} from "react-icons/md";

export default function CadAlunos() {
  const { dadosUsuario, setDadosUsuario, carregando } =
    useContext(UsuarioContext);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  // const [email, setEmail] = useState("");
  // const [cpf, setCpf] = useState("");
  const [rm, setRm] = useState("");
  const [sexo, setSexo] = useState("MASCULINO");
  const [id_turma, setID_TURMA] = useState("");
  const [cartao, setCartao] = useState("");
  const [dadosLista, setDadosLista] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const itemAlterar = location?.state?.itemAlterar || null;

  useEffect(() => {
    // Buscar turmas cadastradas
    const buscarTurmas = async () => {
      try {
        const resposta = await fetch(`${enderecoServidor}/turmas`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${dadosUsuario.token}`,
          },
        });
        const dados = await resposta.json();
        setDadosLista(dados); // Salva as turmas no estado
      } catch (error) {
        console.error("Erro ao buscar turmas:", error);
      }
    };
    if (dadosUsuario && !carregando) {
      buscarTurmas();
    }
  }, [dadosUsuario, carregando]);

  useEffect(() => {
    if (itemAlterar) {
      setNome(itemAlterar.nome);
      setIdade(itemAlterar.idade);
      // setEmail(itemAlterar.email);
      setRm(itemAlterar.rm);
      setSexo(itemAlterar.sexo);
      setID_TURMA(itemAlterar.id_turma);
      setCartao(itemAlterar.cartao);
    }
  }, [itemAlterar]);
  const botaoSalvar = async () => {
    if (nome.trim() == "") {
      alert("informe o nome do aluno");
      return;
    }
    const dados = {
      nome: nome,
      idade: idade,
      // email: email,
      // cpf: cpf,
      rm: rm,
      sexo: sexo,
      id_turma: parseInt(id_turma),
      cartao: cartao,
      ativo: true,
    };
    try {
      let endpoint = `${enderecoServidor}/alunos`;
      let metodo = "POST";
      if (itemAlterar) {
        endpoint += `/${itemAlterar.id_aluno}`;
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
        navigate("/alunos");
      }
    } catch (error) {
      alert("erro ao salvar aluno " + error.message);
      console.log("erro ao salvar aluno: ", error.message);
    }
  };
  return (
    <div className="flex justify-center py-6 px-4">
      <section className="w-full  max-w-lg bg-white p-8 rounded-lg shadow-lg text-gray-800">
        {/* cabeçalho */}
        <header className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-4">
          <MdCreditCard className="text-cyan-600 h-8 w-8" />
          <h2 className="text-2x1 font-bold">
            {itemAlterar ? "Editar Aluno" : "Novo Aluno"}{" "}
          </h2>
        </header>
        {/* Formulario de cadastro */}
        <div className="space-y-5 ">
          <label className={Estilos.labelCadastro}>Nome do aluno</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="EX: Carlos Silva"
            className={Estilos.inputCadastro}
          />
          {/* <label className={Estilos.labelCadastro}>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EX: Carlossilva@gmail.com"
            className={Estilos.inputCadastro}
          /> */}
          {/* <label className={Estilos.labelCadastro}>CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="EX: 000000000-00"
            className={Estilos.inputCadastro}
          /> */}
          <label className={Estilos.labelCadastro}>RM</label>
          <input
            type="text"
            value={rm}
            onChange={(e) => setRm(e.target.value)}
            placeholder="EX: 2332"
            className={Estilos.inputCadastro}
          />
          <label className={Estilos.labelCadastro}>Cartão</label>
          <input
            type="text"
            value={cartao}
            onChange={(e) => setCartao(e.target.value)}
            placeholder="EX: eh68h"
            className={Estilos.inputCadastro}
          />
          <label className={Estilos.labelCadastro}>Data de nascimento</label>
          <input
            type="date"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            className={Estilos.inputCadastro}
          />

          <label className={Estilos.labelCadastro}>Gênero</label>
          <select
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className={Estilos.inputCadastro}
          >
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>

          <label className={Estilos.labelCadastro}>Turma</label>
          <select
            value={String(id_turma)}
            onChange={(e) => setID_TURMA(e.target.value)}
            className={Estilos.inputCadastro}
          >
            <option value="">Selecione</option>
            {dadosLista.map((turma) => (
              <option key={turma.id_turma} value={turma.id_turma}>
                {turma.nome_turma}
              </option>
            ))}
          </select>
          <div className="flex justify-end gap-3 mt-8">
            {/* Botões de controle */}
            <button
              className={Estilos.botaoOutline}
              onClick={() => navigate("/alunos")}
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
