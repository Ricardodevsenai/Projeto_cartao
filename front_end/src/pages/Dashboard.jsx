import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaHome, FaDoorOpen } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";

import { enderecoServidor } from "../utils.jsx";

// import "bootstrap/dist/css/bootstrap.min.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "../styles/Principal.css";
import { UsuarioContext } from "../UsuarioContext.jsx";

export default function Dashboard() {
  const [totalAlunos, setTotalAlunos] = useState(0);
  const [presentes, setPresentes] = useState(0);
  const [ausentes, setAusentes] = useState(0);
  const [usuariosPorCurso, setUsuariosPorCurso] = useState([]);
  const { dadosUsuario } = useContext(UsuarioContext);

  useEffect(() => {
    async function carregarDados() {
      try {
        console.log("Token enviado:", dadosUsuario?.token);
        const res = await fetch(`${enderecoServidor}/alunos`, {
          headers: {
            Authorization: `Bearer ${dadosUsuario?.token}`,
          },
        });

        const dados = await res.json();
        console.log("Resposta da API:", dados);

        if (Array.isArray(dados) && dados.length > 0) {
          setTotalAlunos(dados[0].total_alunos);
        }
        // Se precisar, pode salvar também os alunos
        // setUsuariosPorCurso(dados[0].alunos);
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      }
    }
    carregarDados();
  }, [dadosUsuario]);

  useEffect(() => {
    async function carregarDados2() {
      try {
        console.log("Token enviado:", dadosUsuario?.token);
        const res = await fetch(`${enderecoServidor}/registros`, {
          headers: {
            Authorization: `Bearer ${dadosUsuario?.token}`,
          },
        });

        const dados = await res.json();
        console.log("Resposta da API:", dados);

        // Aqui a resposta é um objeto, não array
        setPresentes(Number(dados.total_entradas) || 0);
        setAusentes(Number(dados.total_saidas) || 0);

        // Se quiser, pode guardar os registros também
        // setUsuariosPorCurso(dados.registros);
      } catch (err) {
        console.error("Erro ao carregar dashboard", err);
      }
    }
    carregarDados2();
  }, [dadosUsuario]);

  const alertasPorTipo = [
    { name: "Ausentes", value: ausentes },
    { name: "Presentes", value: presentes },
  ];

  const COLORS = ["#4b0082", "#8e2de2", "#a074f8"];

  return (
    // Layout geral
    <div className="w-full bg-[#4b0082] justify-center items-center overflow-hidden">
      {/* Conteúdo principal */}
      <div className="flex-1 bg-[#8e2de2] p-4 md:p-8">
        <div className="ocultar-scroll h-[84vh] overflow-y-auto bg-white rounded-3xl border-2 border-[#a074f8] p-6 md:p-10">
          <h2 className="text-[#4b0082] mb-8 text-2xl md:text-3xl font-semibold">
            Principal
          </h2>

          {/* Cards - responsivos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#f4ebfa] p-4 rounded-xl">
              <h4 className="text-[#4b0082]">Total de Alunos</h4>
              <p className="text-[#4b0082]">{totalAlunos} Alunos</p>
            </div>
            <div className="bg-[#f4ebfa] p-4 rounded-xl">
              <h4 className="text-[#4b0082]">Total de Alunos Presentes</h4>
              <p className="text-[#4b0082]">{presentes} presentes</p>
            </div>
            <div className="bg-[#f4ebfa] p-4 rounded-xl">
              <h4 className="text-[#4b0082]">Total de Alunos Ausentes</h4>
              <p className="text-[#4b0082]">{ausentes} ausentes</p>
            </div>
          </div>

          {/* Tabela + Gráfico lado a lado (ou em coluna no mobile) */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Tabela */}
            <div className="flex-1">
              <h5 className="text-[#4b0082] mb-2">Alunos atrasados</h5>
              <div className="overflow-x-auto">
                <table className="table-auto w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[#4b0082] border-b">
                      <th className="px-2 py-1">Nome</th>
                      <th className="px-2 py-1">Turma</th>
                      <th className="px-2 py-1">Horário</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    <tr>
                      <td className="px-2 py-1">João Silva</td>
                      <td className="px-2 py-1">3ºA</td>
                      <td className="px-2 py-1">07:20</td>
                    </tr>
                    <tr>
                      <td className="px-2 py-1">Maria Souza</td>
                      <td className="px-2 py-1">2ºB</td>
                      <td className="px-2 py-1">07:02</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Gráfico Pizza */}
            <div className="bg-[#f4ebfa] p-4 rounded-xl flex-1 flex flex-col items-center">
              <h5 className="text-[#4b0082] mb-2">Presentes X Ausentes</h5>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={alertasPorTipo}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {alertasPorTipo.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gráfico de Barras */}
          <div className="bg-[#f4ebfa] p-4 rounded-xl">
            <h5 className="text-[#4b0082] mb-2 text-center">
              Alunos presentes por Turmas (dia)
            </h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={usuariosPorCurso}>
                <CartesianGrid stroke="#ccc" strokeDasharray="2 4" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#4b0082", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#4b0082", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f5f5f5",
                    border: "none",
                  }}
                  cursor={{ fill: "rgba(75, 0, 130, 0.1)" }}
                />
                <Bar
                  dataKey="alunos"
                  fill="rgba(75, 0, 130, 0.6)"
                  radius={[10, 10, 0, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
