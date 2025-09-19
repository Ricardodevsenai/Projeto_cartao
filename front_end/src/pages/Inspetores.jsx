import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext.jsx";
import { enderecoServidor } from "../utils.jsx";

export default function Inspetores() {
  const [dadosRegistros, setDadosRegistros] = useState([]);
  const [dadosTurmas, setDadosTurmas] = useState([]);
  const [presentesTurmas, setPresentesTurmas] = useState([]);
  const { dadosUsuario } = useContext(UsuarioContext);

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

  useEffect(() => {
    if (dadosUsuario) {
      const buscarTudo = () => {
        buscarRegistrosAPI();
        buscarTurmasAPI();
        buscarPresentesTurmasAPI();
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

  // Exibir cada registro
  const exibirItemRegistro = (item) => (
    <div
      key={item.id_registro}
      className="bg-gray-100 rounded-xl p-3 mb-2 shadow"
    >
      <p className="font-bold text-gray-800">{item.nome}</p>
      <p className="text-gray-500 text-sm">
        Horário: {item.hora ? new Date(item.hora).toLocaleString("pt-BR") : ""}
      </p>
      <p className="text-gray-500 text-sm">Tipo: {item.tipo}</p>
      <p className="text-gray-500 text-sm">Cartão: {item.cartao}</p>
    </div>
  );

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
  const alunosPresentes = registrosEntrada.filter((entrada) => {
    const saidaDoMesmoAluno = registrosSaida.find(
      (saida) =>
        saida.id_aluno === entrada.id_aluno &&
        new Date(saida.hora) > new Date(entrada.hora)
    );
    return !saidaDoMesmoAluno;
  });

  return (
    <div>
      <section className="bg-white rounded-3xl p-4 shadow-md">
        <h3 className="text-2xl font-bold text-indigo-800 mb-4">Inspetores</h3>
        {exibirResumoTurmas()}
        <h4 className="text-lg font-bold text-indigo-700 mb-2">
          Registros dos alunos:
        </h4>
        <div className="flex gap-8">
          <section className="flex-1">
            <h5 className="text-md font-bold text-green-700 mb-2">Entradas</h5>
            <div className="max-h-[75vh] ocultar-scroll overflow-y-auto pr-2">
              {registrosEntrada.length > 0 ? (
                registrosEntrada.map((item) => exibirItemRegistro(item))
              ) : (
                <p className="text-gray-500">Nenhuma entrada encontrada.</p>
              )}
            </div>
          </section>
          <section className="flex-1">
            <h5 className="text-md font-bold text-red-700 mb-2">Saídas</h5>
            <div className="max-h-[75vh] ocultar-scroll overflow-y-auto pr-2">
              {registrosSaida.length > 0 ? (
                registrosSaida.map((item) => exibirItemRegistro(item))
              ) : (
                <p className="text-gray-500">Nenhuma saída encontrada.</p>
              )}
            </div>
          </section>
          <section className="flex-1">
            <h5 className="text-md font-bold text-blue-700 mb-2">
              Presentes agora
            </h5>
            <div className="max-h-[75vh] ocultar-scroll overflow-y-auto pr-2">
              {alunosPresentes.length > 0 ? (
                alunosPresentes.map((item) => exibirItemRegistro(item))
              ) : (
                <p className="text-gray-500">
                  Nenhum aluno presente no momento.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
