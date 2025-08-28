import React, { useState,useContext } from 'react';
import {UsuarioContext} from "../UsuarioContext"
import "../styles/Login.css";
import logo from '../assets/logo2.png';
import { enderecoServidor } from '../utils'
import { useNavigate } from 'react-router-dom';

// Import icons (using react-icons as an example)
// You might need to install it: npm install react-icons
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff, MdBarChart, MdNotifications, MdTrendingUp } from 'react-icons/md';
import { useEffect } from 'react';


export default function Login() {
	const { setDadosUsuario,dadosUsuarios  } = useContext(UsuarioContext);
	const [email, setEmail] = useState('');
	const [senha, setSenha] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [lembrar, setLembrar] = useState(false);

	const navigate = useNavigate();

	const botaoLogin = async (e) => {
		e.preventDefault();
		try {
			if (email === '' || senha === '') {
				throw new Error('Preencha todos os campos');
			}
			//autenticando utilizando a API de backend com o fetch e recebendo o token
			const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
					senha: senha,
				}),
			});

			const dados = await resposta.json();
			if (resposta.ok) {
				localStorage.setItem('UsuarioLogado', JSON.stringify({ ...dados, lembrar }));
				setDadosUsuario(dados);
				navigate("/principal")
			} else {
				throw new Error(dados.message || 'Erro ao fazer login');
			}
		} catch (error) {
			console.error('Erro ao realizar login:', error);
			alert(error.message);
			return;
		}
	};



	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await localStorage.getItem('UsuarioLogado');
            if (usuarioLogado){
                const usuario = JSON.parse(usuarioLogado);
                if (usuario.lembrar == true){
                    navigate('/principal')
                }
            }    
        }
        buscarUsuarioLogado()
    }, [])
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
					<div className="flex justify-between items-center w-full mt-4">
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<input type="checkbox" style={{ marginRight: '5px' }} 
								checked={lembrar} onChange={(e) => setLembrar(e.target.checked)}/>
							<label > Lembrar-me</label>
						</div>
						<a href="#" className={'font-size: 0.9em; color: #2a6f97; text-decoration: none'}>Esqueceu a senha?</a>

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