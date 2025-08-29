import React, { useState, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext";
import "../styles/Login.css";
import logo from "../assets/logo2.png";
import { enderecoServidor } from "../utils";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

// Import icons (using react-icons as an example)
// You might need to install it: npm install react-icons
import {
  MdLock,
  MdVisibility,
  MdVisibilityOff,
  MdBarChart,
  MdNotifications,
  MdTrendingUp,
} from "react-icons/md";
import { useEffect } from "react";

export default function Login() {
  const { setDadosUsuario, dadosUsuarios } = useContext(UsuarioContext);
  const [email, setEmail] = useState("teste@teste2");
  const [senha, setSenha] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [lembrar, setLembrar] = useState(false);

  const navigate = useNavigate();

  const botaoLogin = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || senha === "") {
        throw new Error("Preencha todos os campos");
      }
      //autenticando utilizando a API de backend com o fetch e recebendo o token
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      const dados = await resposta.json();
      if (resposta.ok) {
        localStorage.setItem(
          "UsuarioLogado",
          JSON.stringify({ ...dados, lembrar })
        );
        setDadosUsuario(dados);
        navigate("/");
      } else {
        throw new Error(dados.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert(error.message);
      return;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const buscarUsuarioLogado = async () => {
      const usuarioLogado = await localStorage.getItem("UsuarioLogado");
      if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);
        if (usuario.lembrar === true) {
          setDadosUsuario(usuario); // gravando os dados do usuario no contexto
          navigate("/");
        }
      }
    };
    buscarUsuarioLogado();
  }, []);

  return (
    <div className=" min-h-screen flex items-center justify-center body">
      <div className="flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden max-w-4xl w-full">
        <div className="flex flex-col justify-center items-center text-white p-6 sm:p-8 md:w-1/2">
          <div>
            <h1 className="text-4xl font-semibold mb-5">Bem-Vindo!</h1>
            <p>Bem vindo ao site de gerenciamento escolar.</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              padding: "20px",
              gap: "10px",
            }}
          >
            <img
              src="https://sesirs.iev.com.br/uploads/companies/8572/VDxChWKBicbkEnsc4FvVaPtiPRUIFY0WP7HR09Lg.png"
              alt=""
              style={{
                width: 150,
                height: "auto",
                borderRadius: "10px",
              }}
            />
            <img
              src="https://www.ielrs.org.br/sites/default/files/logos/logos_senai_branco.png"
              alt=""
              style={{
                width: 190,
                height: "auto",
                borderRadius: "10px",
              }}
            />
          </div>
          {/* <button className="learn-more-btn">Learn More</button> */}
        </div>

        <div className="login-box">
          <h2
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: "27px",
              fontFamily: "Segoe UI, Arial, sans-serif",
              letterSpacing: "1px",
              marginBottom: "20px",
            }}
          >
            Login
          </h2>
          <form>
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: "black" }}
              placeholder="Digite seu Email"
            />
            <label>Senha</label>
            <input
              type="password"
              onChange={(e) => setSenha(e.target.value)}
              placeholder="●●●●●●●●"
              style={{ color: "black" }}
            />
            {/* Lembrar-me + link */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm gap-2">
              <label className="flex items-center text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={lembrar}
                  onChange={(e) => setLembrar(e.target.checked)}
                />
                Lembrar-me
              </label>
            </div>
            <button
              className="submit-btn"
              style={{ marginTop: 30 }}
              onClick={botaoLogin}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
