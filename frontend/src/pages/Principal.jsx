import React from "react";
import { Link } from "react-router-dom";
import { FaGraduationCap, FaHome, FaDoorOpen } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
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

export default function Dashboard() {
  const usuariosPorCurso = [
    { name: "7º Ano A", alunos: 15 },
    { name: "7º Ano B", alunos: 30 },
    { name: "8º Ano A", alunos: 28 },
    { name: "8º Ano B", alunos: 24 },
    { name: "9º Ano A", alunos: 20 },
    { name: "9º Ano B", alunos: 32 },
    { name: "1º EM A", alunos: 17 },
    { name: "1º EM B", alunos: 10 },
    { name: "2º EM A", alunos: 17 },
    { name: "2º EM B", alunos: 10 },
    { name: "3º EM A", alunos: 17 },
    { name: "3º EM B", alunos: 10 },
  ];

  const alertasPorTipo = [
    { name: "Ausentes", value: 27 },
    { name: "Presentes", value: 389 },
  ];

  const COLORS = ["#4b0082", "#8e2de2", "#a074f8"];

  return (
    // Layout geral
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#4b0082",
      }}
    >
      {/* Sidebar FORA da div principal */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 0",
          alignItems: "center",
          width: "100px",
          backgroundColor: "#4b0082", // roxo escuro sólido
        }}
      >
        <img
          src="https://marciookabe.com.br/wp-content/uploads/2016/06/todo-mundo-qualquer-um-ninguem-alguem.jpg"
          alt="Logo"
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            marginBottom: "20px",
            border: "2px solid white",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "100px",
            margin: "auto",
          }}
        >
          <Link to="">
            <FaHome size={24} color="white" />
          </Link>
          <Link to="/alunos">
            <MdPeopleAlt size={24} color="white" />
          </Link>
          <Link to="/turmas">
            <FaGraduationCap size={24} color="white" />
          </Link>
        </div>
        <Link to="/" style={{ marginTop: "auto", marginBottom: "20px" }}>
          <FaDoorOpen size={24} color="white" />
        </Link>
      </div>

      {/* Conteúdo principal */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#8e2de2",
          borderBottomLeftRadius: "50px",
          borderTopLeftRadius: "50px",
        }}
      >
        <div
          className="ocultar-scroll"
          style={{
            backgroundColor: "#ffffff",
            minWidth: "1390px", // permite o scroll se faltar espaço
            height: "700px",
            borderRadius: "35px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #a074f8",
            overflowX: "auto",
            scrollBehavior: "smooth",
          }}
        >
          <h2 style={{ marginBottom: "30px", color: "#4b0082" }}>Principal</h2>

          {/* Cards */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "#f4ebfa",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h4 style={{ color: "#4b0082" }}>Total de Alunos</h4>
              <p style={{ color: "#4b0082" }}>416 Alunos</p>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "#f4ebfa",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h4 style={{ color: "#4b0082" }}>Total de Alunos Presentes</h4>
              <p style={{ color: "#4b0082" }}>389 Alunos</p>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "#f4ebfa",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h4 style={{ color: "#4b0082" }}>Total de Alunos Ausentes</h4>
              <p style={{ color: "#4b0082" }}>27 Alunos</p>
            </div>
          </div>











      <div style={{flexDirection:"row",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{flexDirection:"column",display:"flex",width:"600px"}}>
            {/* Tabela */}
            <h5 style={{ color: "#4b0082" }}>Alunos atrasados</h5>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Nome:</th>
                  <th scope="col">Turma:</th>
                  <th scope="col">Horario:</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <tr>
                  <td>João Silva</td>
                  <td>3ºA</td>
                  <td>07:20</td>
                </tr>
                <tr>
                  <td>João Silva</td>
                  <td>3ºA</td>
                  <td>07:02</td>
                </tr>
                <tr>
                  <td>João Silva</td>
                  <td>3ºA</td>
                  <td>07:10</td>
                </tr>
                <tr>
                  <td>João Silva</td>
                  <td>3ºA</td>
                  <td>07:15</td>
                </tr>
              </tbody>
            </table>
          </div>


          
          
  <div
              style={{
                
                backgroundColor: "#f4ebfa",
                padding: "20px",
                borderRadius: "15px",
                justifyContent: "center",
                display: "flex",
                width: "700px",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: '15px'
              }}
            >
              <h5 style={{ color: "#4b0082" }}>Presentes X Ausentes</h5>
              <ResponsiveContainer width="100%" height={200}>
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










          {/* Gráficos */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "#f4ebfa",
                padding: "20px",
                borderRadius: "15px",
                justifyContent: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h5 style={{ color: "#4b0082" }}>Alunos presente por Turmas</h5>
              <ResponsiveContainer width="100%" height={200}>
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
    </div>
  );
}
