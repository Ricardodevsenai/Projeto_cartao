import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGraduationCap, FaHome, FaDoorOpen } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";

export default function Alunos() {
  return (
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
          <Link to="/principal">
            <FaHome size={24} color="white" />
          </Link>
          <Link to="">
            <MdPeopleAlt size={24} color="white" />
          </Link>
          <Link to="">
            <FaGraduationCap size={24} color="white" />
          </Link>
        </div>
        <Link to="" style={{ marginTop: "auto", marginBottom: "20px" }}>
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
          style={{
            backgroundColor: "#ffffff",
            width: "1390px",
            height: "700px",
            borderRadius: "35px",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #a074f8",
          }}
        >
          <h2 style={{ marginBottom: "30px", color: "#4b0082" }}>
            Alunos
          </h2>

          {/* Cards
          <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "#f4ebfa",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h4 style={{ color: "#4b0082" }}>Usuários</h4>
              <p style={{ color: "#4b0082" }}>128 cadastrados</p>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "#f4ebfa",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h4 style={{ color: "#4b0082" }}>Cursos</h4>
              <p style={{ color: "#4b0082" }}>24 disponíveis</p>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: "#f4ebfa",
                padding: "20px",
                borderRadius: "15px",
              }}
            >
              <h4 style={{ color: "#4b0082" }}>Alertas</h4>
              <p style={{ color: "#4b0082" }}>5 pendentes</p>
            </div>
          </div> */}

          {/* Tabela */}
          <h5 style={{ color: "#4b0082" }}>Últimas Atividades</h5>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Usuário</th>
                <th scope="col">Presença</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>10/05/2025</td>
                <td>João Silva</td>
                <td>Faltou</td>
              </tr>
              <tr>
                <td>09/05/2025</td>
                <td>Maria Lima</td>
                <td>Presente</td>
              </tr>
              <tr>
                <td>08/05/2025</td>
                <td>Pedro Santos</td>
                <td>Presente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
