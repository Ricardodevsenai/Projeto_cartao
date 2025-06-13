import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testarConexao } from "./db.js";

import rotasUsuarios, { autenticarToken } from "./routes/rotasUsuarios.js";
import rotasAlunos from "./routes/rotasAlunos.js";
import rotasTurmas from "./routes/rotasTurmas.js";
import rotasRegistros from "./routes/rotasRegistros.js";

import swaggerSpec from "./swagger.js";
import swaggerUi from "swagger-ui-express";

const app = express()
// app.use(express.json());
// dotenv.config();
// testarConexao();
// app.use(cors());

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/",(req, res) => {
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
app.get("/usuarios/:id",  autenticarToken, rotasUsuarios.listar);
app.put("/usuarios/:id",  autenticarToken, rotasUsuarios.editarUsuarios);
app.delete("/usuarios/:id",  autenticarToken, rotasUsuarios.deletarUsuarios);
app.patch("/usuarios/:id",  autenticarToken, rotasUsuarios.editar);

//Rotas Alunos
app.post('/alunos', autenticarToken, rotasAlunos.novoAluno)
app.delete('/alunos/:id', autenticarToken, rotasAlunos.deletar)
app.get('/alunos/:id', autenticarToken, rotasAlunos.consultaPorId)
app.get('/alunos', autenticarToken, rotasAlunos.listarTodos)
app.put('/alunos/:id', autenticarToken, rotasAlunos.editarTodos)
app.patch('/alunos/:id', autenticarToken, rotasAlunos.editar)

//Rotas Turmas
app.post("/turmas", autenticarToken, rotasTurmas.novaTurma);
app.get("/turmas", autenticarToken, rotasTurmas.listarTurmas);
app.get("/turmas/:id", autenticarToken, rotasTurmas.listarTurmaPorId);
app.put("/turmas/:id", autenticarToken, rotasTurmas.atualizarTurma);
app.delete("/turmas/:id", autenticarToken, rotasTurmas.deletarTurma);
app.patch("/turmas/:id", autenticarToken, rotasTurmas.atualizar);

// Rotas Registros
app.get('/registros', autenticarToken, rotasRegistros.listarRegistros)
app.get('/registros/:id', autenticarToken, rotasRegistros.consultaPorId)
app.post('/registros', autenticarToken, rotasRegistros.novoRegistro)
app.delete('/registros/:id', autenticarToken, rotasRegistros.deletarRegistro)
app.patch('/registros/:id', autenticarToken, rotasRegistros.editar)
app.put('/registros/:id', autenticarToken, rotasRegistros.editarRegistros)


const porta = 3000;
app.listen(porta, () => {
  console.log(`api http://localhost:${porta}`);
});
