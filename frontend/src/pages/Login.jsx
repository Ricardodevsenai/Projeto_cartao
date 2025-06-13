import { useNavigate, Link } from "react-router-dom";
import Estilos, { corTextos, corFundo2 } from "../styles/Estilos";
import "../styles/Login.css";
import { enderecoServidor } from "../utils";
import { useState } from "react";
// import { IoPerson } from "react-icons/io5";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function botaoEntrar(e) {
    e.preventDefault();

    try {
      if (email == "" || senha == "") {
        throw new Error("Preencha todos os campos!");
      }
      // Autenticando utilizando a API de backend com o fetch
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          senha: senha,
        }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        navigate("/principal");
        localStorage.setItem("UsuarioLogado", JSON.stringify(dados));
      } else {
        // setMensagem('Usuário ou senha inválidos! 😢')
        throw new Error("Usuário ou senha inválidos 😢");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert(error.message);
    }
  }

  return (
    <div className="body">
      <div className="login-container">
        <div className="welcome-section">
          <div>
            <h1 style={{ color: "white" }}>Bem-Vindo!</h1>
            <p style={{ color: "white" }}>
              Bem vindo ao site de gerenciamento escolar.
            </p>
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
          <h2 style={{ color: "black", fontWeight: "bold" }}>Login</h2>
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
            <button
              className="submit-btn"
              style={{ marginTop: 30 }}
              onClick={botaoEntrar}
            >
              Entrar
            </button>
          </form>
          <div className="social-icons">
            <FaFacebookF color={"white"} />
            <FaInstagram color={"white"} />
            <FaPinterestP color={"white"} />
          </div>
        </div>
      </div>
    </div>
  );
}
