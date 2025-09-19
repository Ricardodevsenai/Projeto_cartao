import React, { useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext.jsx";
import { enderecoServidor } from "../utils.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import Estilos from "../styles/Estilos.jsx";
import { MdClose, MdSave } from "react-icons/md";

export default function CadUsuarios() {
  const { dadosUsuario } = useContext(UsuarioContext);
  const navigate = useNavigate();
  const location = useLocation();
  const itemAlterar = location?.state?.itemAlterar || null;

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoAcesso, setTipoAcesso] = useState("");

  useEffect(() => {
    if (itemAlterar) {
      setNome(itemAlterar.nome);
      setEmail(itemAlterar.email);
      setTipoAcesso(itemAlterar.tipo_acesso);
      // não preenche senha para edição
    }
  }, [itemAlterar]);

  const botaoSalvar = async () => {
    if (!nome.trim() || !email.trim() || (!itemAlterar && !senha.trim())) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const dados = {
      nome,
      email,
      tipo_acesso: tipoAcesso,
      ...(senha.trim() && { senha }), // 
    };

    try {
      let endpoint = `${enderecoServidor}/usuarios`;
      let metodo = "POST";
      if (itemAlterar) {
        endpoint += `/${itemAlterar.id_usuario}`;
        metodo = "PUT";
      }

      const resposta = await fetch(endpoint, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dadosUsuario.token}`,
        },
        body: JSON.stringify(dados),
      });

      if (resposta.ok) {
        navigate("/usuarios");
      } else {
        alert("Erro ao salvar usuário");
      }
    } catch (error) {
      alert("Erro ao salvar usuário " + error.message);
      console.log("Erro ao salvar usuário: ", error.message);
    }
  };

  return (
    <div className="flex justify-center py-6 px-4">
      <section className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg text-gray-800">
        <header className="flex items-center gap-2 mb-6 border-b border-grat-200 pb-4">
          <h2 className="text-2x1 font-bold">
            {itemAlterar ? "Editar Usuário" : "Novo Usuário"}
          </h2>
        </header>
        <div className="space-y-5">
          <label className={Estilos.labelCadastro}>Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do usuário"
            className={Estilos.inputCadastro}
          />

          <label className={Estilos.labelCadastro}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@email.com"
            className={Estilos.inputCadastro}
          />

          {!itemAlterar && (
            <>
              <label className={Estilos.labelCadastro}>Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="******"
                className={Estilos.inputCadastro}
              />
            </>
          )}

          <label className={Estilos.labelCadastro}>Tipo de Acesso</label>
          <select
            value={tipo_acesso}
            onChange={(e) => setSexo(e.target.value)}
            className={Estilos.inputCadastro}
          >
            <option value="INSPETOR">Inspetor</option>
            <option value="ADMINISTRADOR">Administrador</option>
            <option value="COZINHA">Cozinha</option>
          </select>

          <div className="flex justify-end gap-3 mt-8">
            <button
              className={Estilos.botaoOutline}
              onClick={() => navigate("/usuarios")}
            >
              <MdClose /> Cancelar
            </button>
            <button className={Estilos.botao} onClick={botaoSalvar}>
              <MdSave /> Salvar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
