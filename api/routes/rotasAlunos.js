import { BD } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class rotasAlunos {
  static async novoAluno(req, res) {
    const { nome, idade, email, cpf, sexo, cartao, rm, restricao, id_turma } =
      req.body;

    try {
      const aluno = await BD.query(
        `
                INSERT INTO alunos(nome, idade, email, cpf, sexo, cartao, rm,restricao, id_turma)
                VALUES($1, $2, $3, $4, $5, $6, $7,$8,$9)
                `,
        [nome, idade, email, cpf, sexo, cartao, rm, restricao, id_turma]
      );

      res.status(201).json({ message: "Aluno Cadastrado" });
    } catch (error) {
      console.error("Erro ao Criar", error);
      res
        .status(500)
        .json({ message: "Erro ao Criar Aluno", error: error.message });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  static async listarRestricao(req, res) {
    try {
      const resultado = await BD.query(`
 SELECT 
    turmas.id_turma,
    turmas.nome_turma,
    alunos.id_aluno,
    alunos.nome,
    alunos.restricao
FROM alunos
INNER JOIN turmas ON alunos.id_turma = turmas.id_turma
WHERE alunos.ativo = true
  AND alunos.restricao != ''
ORDER BY alunos.nome;
`);

      res.status(200).json(resultado.rows);
    } catch (error) {
      console.error("Erro ao listar alunos com restrição", error);
      res
        .status(500)
        .json({ message: "Erro ao listar restrições", error: error.message });
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  static async listarTodos(req, res) {
    try {
      const alunos = await BD.query(
        "SELECT alunos.id_aluno, alunos.nome, alunos.idade, alunos.email, alunos.sexo, alunos.cartao, alunos.rm, alunos.ativo, alunos.id_turma, turmas.nome_turma, alunos.restricao FROM alunos INNER JOIN turmas ON alunos.id_turma = turmas.id_turma WHERE alunos.ativo = true ORDER BY alunos.nome"
      );
      return res.status(200).json(alunos.rows);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar alunos", error: error });
    }
  }
  static async quantidade(req, res) {
    try {
      const alunos = await BD.query("SELECT count(*) from alunos");
      return res.status(200).json(alunos.rows);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar alunos", error: error });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  static async deletar(req, res) {
    const { id } = req.params;

    try {
      const aluno = await BD.query(
        "UPDATE alunos set ativo = false WHERE id_aluno = $1",
        [id]
      );
      return res.status(200).json({ message: "Aluno desativado com sucesso" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao desativar aluno", error: error });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  static async consultaPorId(req, res) {
    const { id } = req.params;
    try {
      const aluno = await BD.query(
        "SELECT alunos.nome, alunos.idade, alunos.email, alunos.cpf, alunos.sexo, alunos.cartao,alunos.rm,alunos.ativo,turmas.nome_turma FROM alunos INNER JOIN turmas ON alunos.id_turma = turmas.id_turma WHERE alunos.ativo = true and id_aluno = $1 ",
        [id]
      );
      res.status(200).json(aluno.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao consultar o aluno", error: error });
    }
  }

  static async editarTodos(req, res) {
    const { id } = req.params;
    const { nome, idade, email, cpf, sexo, cartao, rm,restricao, id_turma } = req.body;

    try {
      const aluno = await BD.query(
        "UPDATE alunos SET nome = $1, idade = $2, email = $3, cpf = $4, sexo = $5, cartao = $6, rm =$7,restricao = $8 ,id_turma = $9 WHERE id_aluno = $10 RETURNING *",
        [nome, idade, email, cpf, sexo, cartao, rm,restricao, id_turma, id]
      );

      return res.status(200).json({
        message: "Aluno atualizado com sucesso",
        aluno: aluno.rows[0],
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar Aluno", error: error.message });
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  static async editar(req, res) {
    const { id } = req.params;
    const { nome, idade, email, cpf, sexo, cartao, ativo, rm, id_turma } =
      req.body;
    try {
      //Inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
      const campos = [];
      const valores = [];

      //Verificar quais campos foram fornecidos
      if (nome !== undefined) {
        campos.push(`nome = $${valores.length + 1}`); //Usa o tamanho do array para determinar o campo
        valores.push(nome);
      }
      if (idade !== undefined) {
        campos.push(`idade = $${valores.length + 1}`); //Usa o tamanho do array para determinar o campo
        valores.push(idade);
      }
      if (email !== undefined) {
        campos.push(`email = $${valores.length + 1}`); //Usa o tamanho do array para determinar o campo
        valores.push(email);
      }
      if (cpf !== undefined) {
        campos.push(`cpf = $${valores.length + 1}`); //Usa o tamanho do array para determinar o campo
        valores.push(cpf);
      }
      if (sexo !== undefined) {
        campos.push(`sexo = $${valores.length + 1}`); //Usa o tamanho do array para determinar o campo
        valores.push(sexo);
      }
      if (cartao !== undefined) {
        campos.push(`cartao = $${valores.length + 1}`); //Usa o tamanho do array para determinar o campo
        valores.push(cartao);
      }
      if (rm !== undefined) {
        campos.push(`rm = $${valores.length + 1}`); //Usa o tamanho do array para determinar o campo
        valores.push(rm);
      }
      if (ativo !== undefined) {
        campos.push(`ativo = $${valores.length + 1}`); //Usa o tamanho do array para determinar o campo
        valores.push(ativo);
      }
      if (id_turma !== undefined) {
        campos.push(`id_turma = $${valores.length + 1}`); //Usa o tamanho do array para determinar o campo
        valores.push(id_turma);
      }
      if (campos.length === 0) {
        return res
          .status(400)
          .json({ message: "Nenhum campo fornecido para atualização" });
      }

      //adicionar o id ao final de valores
      // valores.push(id);

      //montamos a query dinamicamente
      const query = `UPDATE alunos SET ${campos.join(
        ", "
      )} WHERE id_aluno = ${id} RETURNING *`;
      //executar a query
      const aluno = await BD.query(query, valores);

      //Verifica se o usuário foi atualizado
      if (aluno.rows.length === 0) {
        return res.status(404).json({ message: "Aluno não encontrado" });
      }
      return res.status(200).json(aluno.rows[0]);
    } catch (error) {
      console.log(error.message);
      res
        .status(500)
        .json({ message: "Erro ao atualizar Aluno", error: error });
    }
  }
}

export default rotasAlunos;
