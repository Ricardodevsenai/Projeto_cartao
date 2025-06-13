import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaGraduationCap,
  FaHome,
  FaDoorOpen,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
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
          <div>
            <h2 style={{ color: "#4b0082", marginBottom: "30px" }}>
              Cadastro de Aluno
            </h2>

            <form style={{ maxWidth: "600px" }}>
              <div className="mb-3">
                <label className="form-label" style={{ color: "#4b0082" }}>
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite o nome"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: "#4b0082" }}>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Digite o email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: "#4b0082" }}>
                  CPF
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Digite a idade"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: "#4b0082" }}>
                  Cartão
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Digite o cartao"
                />
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: "#4b0082" }}>
                  Turma
                </label>
                <select className="form-select">
                  <option>Selecione a turma</option>
                  <option>1º EM A</option>
                  <option>1º EM B</option>
                  <option>2º EM A</option>
                  <option>2º EM B</option>
                  <option>3º EM A</option>
                </select>
              </div>

              <div
                style={{ flexDirection: "row", alignItems: "space-between" }}
              >
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "#4b0082",
                    border: "none",
                    marginRight: 10,
                  }}
                >
                  Cadastrar
                </button>

                <Link to="/alunos">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ backgroundColor: "#4b0082", border: "none" }}
                  >
                    Cancelar
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
