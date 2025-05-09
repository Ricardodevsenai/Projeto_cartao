import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testarConexao } from "./db.js";
import rotasUsuarios, { autenticarToken } from "./routes/rotasUsuarios.js";
import rotasAlunos from "./routes/rotasAlunos.js";
import rotasTurmas from "./routes/rotasTurmas.js";
import rotasRegistros from "./routes/rotasRegistros.js";



const app = express();
dotenv.config();
testarConexao();
app.use(cors());
0;
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API Funcionando!");
});
//rotas usuarios
app.post("/usuarios/login", rotasUsuarios.login);
app.post("/usuarios", rotasUsuarios.novoUsuario);
app.get("/usuarios",  rotasUsuarios.listarUsuarios);
app.get("/usuarios/:id",  rotasUsuarios.listar);
app.put("/usuarios/:id",  rotasUsuarios.editarUsuarios);
app.delete("/usuarios/:id",  rotasUsuarios.deletarUsuarios);
app.patch("/usuarios/:id",  rotasUsuarios.editar);

//Rotas Alunos
app.post('/alunos', rotasAlunos.novoAluno)
app.delete('/alunos/:id', rotasAlunos.deletar)
app.get('/alunos/:id', rotasAlunos.consultaPorId)
app.get('/alunos',  rotasAlunos.listarTodos)
app.put('/alunos/:id', rotasAlunos.editarTodos)
app.patch('/alunos/:id', rotasAlunos.editar)

//Rotas Turmas
app.post("/turmas", rotasTurmas.novaTurma);
app.get("/turmas", rotasTurmas.listarTurmas);
app.get("/turmas/:id", rotasTurmas.listarTurmaPorId);
app.put("/turmas/:id", rotasTurmas.atualizarTurma);
app.delete("/turmas/:id", rotasTurmas.deletarTurma);
app.patch("/turmas/:id", rotasTurmas.atualizar);

// Rotas Registros
app.get('/registros', rotasRegistros.listarRegistros)
app.get('/registros/:id', rotasRegistros.consultaPorId)
app.post('/registros', rotasRegistros.novoRegistro)
app.delete('/registros/:id', rotasRegistros.deletarRegistro)
app.patch('registros/:id', rotasRegistros.editar)
app.put('/registros/:id', rotasRegistros.editarRegistros)


const porta = 3000;
app.listen(porta, () => {
  console.log(`api http://localhost:${porta}`);
});
