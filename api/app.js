import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testarConexao, BD } from "./db.js";

import rotasUsuarios, { autenticarToken } from "./routes/rotasUsuarios.js";
import rotasAlunos from "./routes/rotasAlunos.js";
import rotasTurmas from "./routes/rotasTurmas.js";
import rotasRegistros from "./routes/rotasRegistros.js";

import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express();
// app.use(express.json());
// dotenv.config();
// testarConexao();
// app.use(cors());

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

dotenv.config();
testarConexao();
app.use(cors());

app.use(express.json());

// app.get('/swagger.json', (req, res) => {
//     res.json(swaggerSpec);
// });

app.get("/", (req, res) => {
  res.send("API Funcionando!");
});
//rotas usuarios
app.post("/usuarios/login", rotasUsuarios.login);
app.post("/usuarios", rotasUsuarios.novoUsuario);
app.get("/usuarios", autenticarToken, rotasUsuarios.listarUsuarios);
app.get("/usuarios/:id", autenticarToken, rotasUsuarios.listar);
app.put("/usuarios/:id", autenticarToken, rotasUsuarios.editarUsuarios);
app.delete("/usuarios/:id", autenticarToken, rotasUsuarios.deletarUsuarios);
app.patch("/usuarios/:id", autenticarToken, rotasUsuarios.editar);

//Rotas Alunos
app.post("/alunos", autenticarToken, rotasAlunos.novoAluno);
app.delete("/alunos/:id", autenticarToken, rotasAlunos.deletar);
app.get("/alunos/:id", autenticarToken, rotasAlunos.consultaPorId);
app.get("/alunos", autenticarToken, rotasAlunos.listarTodos);
app.get("/alunos/quantidade", rotasAlunos.quantidade);
app.put("/alunos/:id", autenticarToken, rotasAlunos.editarTodos);
app.patch("/alunos/:id", autenticarToken, rotasAlunos.editar);
app.get('/alunos/restricoes', autenticarToken,rotasAlunos.listarRestricao);

//Rotas Turmas
app.post("/turmas", autenticarToken, rotasTurmas.novaTurma);
app.get( "/turmas/presentes", autenticarToken, rotasTurmas.quantidadePresentesPorTurma);
app.get("/turmas", autenticarToken, rotasTurmas.listarTurmas);
app.get("/turmas/:id", autenticarToken, rotasTurmas.listarTurmaPorId);
app.put("/turmas/:id", autenticarToken, rotasTurmas.atualizarTurma);
app.delete("/turmas/:id", autenticarToken, rotasTurmas.deletarTurma);
app.patch("/turmas/:id", autenticarToken, rotasTurmas.atualizar);

// Rotas Registros
app.get("/registros", autenticarToken, rotasRegistros.listarRegistros);
app.get("/registros/:id", autenticarToken, rotasRegistros.consultaPorId);
app.post("/registros", autenticarToken, rotasRegistros.novoRegistro);
app.delete("/registros/:id", autenticarToken, rotasRegistros.deletarRegistro);
app.patch("/registros/:id", autenticarToken, rotasRegistros.editar);
app.put("/registros/:id", autenticarToken, rotasRegistros.editarRegistros);

// Rotas Presença
app.post("/presenca", async (req, res) => {
  const uid = req.body.uid;
  console.log("Leitura UID recebido:", uid);

  const aluno = await BD.query(
    "select id_aluno from alunos where cartao = $1",
    [uid]
  );
  if (aluno.rows.length > 0) {
    const presenca = await BD.query(
      "select tipo from registros where id_aluno = $1 and hora::date = (current_timestamp - INTERVAL '3 hours')::date order by id_registro desc limit 1",
      [aluno.rows[0].id_aluno]
    );
    let tipo = "ENTRADA";
    if (presenca.rows.length > 0) {
      if (presenca.rows[0].tipo == "ENTRADA") tipo = "SAIDA";
    }
    await BD.query(
      // "insert into registros (id_aluno, hora, cartao, tipo) values ($1, (current_timestamp - INTERVAL '3 hours'), $2, $3)",
      "INSERT INTO registros (id_aluno, hora, cartao, tipo) VALUES ($1, now(), $2, $3)",
      [aluno.rows[0].id_aluno, uid, tipo]
    );
    res.status(200).send({ message: "Presença registrada com sucesso!" });
  } else {
    res.status(200).send({ message: "Aluno não encontrado!" });
  }
});

const porta = 3000;
app.listen(porta, () => {
  console.log(`api http://localhost:${porta}`);
});
