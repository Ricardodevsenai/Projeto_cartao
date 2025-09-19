import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext.jsx";
import { enderecoServidor } from "../utils.jsx";

export default function Cozinha() {
  const [dadosRegistros, setDadosRegistros] = useState([]);
  const [dadosTurmas, setDadosTurmas] = useState([]);
  const [presentesTurmas, setPresentesTurmas] = useState([]);
  const [alunosRestricao, setAlunosRestricao] = useState([]);
  const { dadosUsuario } = useContext(UsuarioContext);

  const buscarAlunosRestricaoAPI = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/alunos/alimento`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
      });
      const dados = await resposta.json();
      setAlunosRestricao(Array.isArray(dados) ? dados : []);
    } catch (error) {
      setAlunosRestricao([]);
      console.error("Erro ao buscar alunos com restrição:", error);
    }
  };
  // Buscar registros dos alunos
  const buscarRegistrosAPI = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/registros`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
      });
      const dados = await resposta.json();
      setDadosRegistros(Array.isArray(dados) ? dados : []);
    } catch (error) {
      setDadosRegistros([]);
      console.error("Erro ao buscar registros:", error);
    }
  };

  // Buscar presentes por turma
  const buscarPresentesTurmasAPI = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/turmas/presentes`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
      });
      const dados = await resposta.json();
      setPresentesTurmas(Array.isArray(dados) ? dados : []);
    } catch (error) {
      setPresentesTurmas([]);
      console.error("Erro ao buscar presentes por turma:", error);
    }
  };

  // Buscar turmas e quantidade de alunos
  const buscarTurmasAPI = async () => {
    try {
      const resposta = await fetch(`${enderecoServidor}/turmas`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
      });
      const dados = await resposta.json();
      setDadosTurmas(Array.isArray(dados) ? dados : []);
    } catch (error) {
      setDadosTurmas([]);
      console.error("Erro ao buscar turmas:", error);
    }
  };

  // Buscar alunos com restrição alimentar

  // Função para verificar se o registro é do dia atual
  const ehDoDiaAtual = (dataRegistro) => {
    if (!dataRegistro) return false;
    const hoje = new Date();
    const data = new Date(dataRegistro);
    return (
      data.getDate() === hoje.getDate() &&
      data.getMonth() === hoje.getMonth() &&
      data.getFullYear() === hoje.getFullYear()
    );
  };

  // Filtrar registros pela data do dia atual
  const registrosDoDia = dadosRegistros.filter((item) =>
    ehDoDiaAtual(item.hora)
  );

  // Filtrar registros do dia por tipo
  const registrosEntrada = registrosDoDia.filter(
    (item) => item.tipo === "ENTRADA"
  );
  const registrosSaida = registrosDoDia.filter((item) => item.tipo === "SAIDA");

  // Determinar quem está presente: entrou mas não saiu depois
  const alunosPresentes = registrosEntrada.filter(
    (entrada) =>
      !registrosSaida.some(
        (saida) =>
          saida.id_aluno == entrada.id_aluno &&
          new Date(saida.hora) > new Date(entrada.hora)
      )
  );

  // Filtrar alunos com restrição alimentar que estão presentes
  const alunosRestricaoPresentes = alunosRestricao.filter((aluno) =>
    alunosPresentes.some((presente) => presente.id_aluno == aluno.id_aluno)
  );
  useEffect(() => {
    if (dadosUsuario) {
      const buscarTudo = () => {
        buscarRegistrosAPI();
        buscarTurmasAPI();
        buscarPresentesTurmasAPI();
        buscarAlunosRestricaoAPI();
      };
      buscarTudo();
      const intervalo = setInterval(buscarTudo, 5000);
      return () => clearInterval(intervalo);
    }
  }, [dadosUsuario]);
  // Exibir resumo das turmas
  const exibirResumoTurmas = () => (
    <div className="mb-6">
      <h4 className="text-lg font-bold text-indigo-700 mb-2">
        Quantidade de alunos por turma:
      </h4>
      <ul>
        {dadosTurmas.map((turma) => {
          const presentes = presentesTurmas.find(
            (p) => p.id_turma === turma.id_turma
          );
          return (
            <li key={turma.id_turma} className="text-gray-700 mb-1">
              <span className="font-semibold">{turma.nome_turma}:</span>{" "}
              {turma.quantidade_alunos} aluno(s)
              <span className="ml-4 text-green-600 font-semibold">
                Presentes: {presentes ? presentes.presentes_hoje : 0}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  // Exibir alunos com restrição alimentar presentes
  const exibirAlunosRestricaoPresentes = () => (
    <div>
      <h4 className="text-lg font-bold text-indigo-700 mb-2">
        Alunos presentes com restrição alimentar:
      </h4>
      {alunosRestricaoPresentes.length > 0 ? (
        <ul>
          {alunosRestricaoPresentes.map((aluno) => (
            <li
              key={aluno.id_aluno}
              className="bg-yellow-100 rounded-xl p-3 mb-2 shadow"
            >
              <p className="font-bold text-gray-800">{aluno.nome}</p>
              <p className="text-gray-500 text-sm">Turma: {aluno.nome_turma}</p>
              <p className="text-red-700 text-sm font-semibold">
                Restrição: {aluno.restricao}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          Nenhum aluno presente com restrição alimentar.
        </p>
      )}
    </div>
  );

  return (
    <div>
      <section className="bg-white rounded-3xl p-4 shadow-md">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Cozinha</h3>
        {exibirResumoTurmas()}
        {exibirAlunosRestricaoPresentes()}
      </section>
    </div>
  );
}
