import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGraduationCap, FaHome, FaDoorOpen, FaPlus, FaSearch } from "react-icons/fa";
import { MdPeopleAlt } from "react-icons/md";
import Estilos from "../styles/Estilos";

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
      {/* Sidebar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "20px 0",
          alignItems: "center",
          width: "100px",
          backgroundColor: "#4b0082",
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
          <h2 style={{ marginBottom: "30px", color: "#4b0082" }}>Alunos</h2>

          {/* Div de pesquisa */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", justifyContent: "center" }}>
            {/* Botão adicionar com Link */}
            <div style={{ marginRight: 100 }}>
              <Link to="/alunos/CadAlunos">
                <button
                  style={{
                    backgroundColor: "#934FA5",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    borderRadius: 15,
                    height: 48,
                    width: 48,
                  }}
                >
                  <FaPlus size={20} color="white" />
                </button>
              </Link>
            </div>

            <div
              style={{
                backgroundColor: "#934FA5",
                width: "70%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 8,
                borderRadius: 20,
                justifyContent: "space-around",
              }}
            >
              <input
                type="text"
                placeholder="Busque um aluno"
                style={{
                  width: "50%",
                  padding: "10px 15px",
                  borderRadius: 10,
                  border: "none",
                  outline: "none",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              />
              <button
                style={{
                  backgroundColor: "white",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  borderRadius: 10,
                  height: 40,
                  width: 40,
                }}
              >
                <FaSearch size={18} />
              </button>
              <select style={Estilos.dropdown}>
                <option value="">Turma 1 </option>
                <option value="">Turma 2 </option>
                <option value="">Turma 3 </option>
                <option value="">Turma 4 </option>
              </select>
              <select style={Estilos.dropdown}>
                <option value="">Ativo</option>
                <option value="">Inativo</option>
              </select>
            </div>
          </div>

          {/* Tabela */}
          <h5 style={{ color: "#4b0082" }}>Tabelas de Alunos</h5>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Nome</th>
                <th scope="col">CPF</th>
                <th scope="col">Email</th>
                <th scope="col">Idade</th>
                <th scope="col">Cartão</th>
                <th scope="col">Turma</th>
                <th scope="col">Ações</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              <tr>
                <td>08/05/2025</td>
                <td>Pedro Santos</td>
                <td>382872647</td>
                <td>PS@gmail.com</td>
                <td>17</td>
                <td>1ju65</td>
                <td>3º EM A</td>
                <td className="d-flex">
                  <a
                    href=""
                    style={{
                      marginRight: 10,
                      backgroundColor: "#00CD66",
                      borderRadius: 10,
                      padding: 10,
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    Editar
                  </a>
                  <form action="">
                    <button
                      type="submit"
                      style={{
                        marginRight: 10,
                        backgroundColor: "#EE3B3B",
                        borderRadius: 10,
                        padding: 10,
                        color: "white",
                        border: "none",
                      }}
                    >
                      Inativar
                    </button>
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
