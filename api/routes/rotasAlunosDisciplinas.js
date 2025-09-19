import { BD } from "../db.js";

class rotasAlunosDisciplinas {
  // Criar novo registro de aluno em disciplina
  static async novoAlunoDisciplina(req, res) {
    const { id_aluno, id_disciplina, falta, nota } = req.body;

    try {
      const alunoDisciplina = await BD.query(
        "INSERT INTO alunos_disciplinas (id_aluno, id_disciplina, falta, nota) VALUES ($1, $2, $3, $4) RETURNING *",
        [id_aluno, id_disciplina, falta, nota]
      );
      res.status(201).json(alunoDisciplina.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar aluno na disciplina", error: error.message });
    }
  }

  // Atualizar falta e nota do aluno na disciplina
  static async atualizarAlunoDisciplina(req, res) {
    const { id } = req.params;
    const { falta, nota } = req.body;

    try {
      const alunoDisciplina = await BD.query(
        "UPDATE alunos_disciplinas SET falta = $1, nota = $2 WHERE id_aluno_disciplina = $3 RETURNING *",
        [falta, nota, id]
      );
      res.status(200).json(alunoDisciplina.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar aluno na disciplina", error: error.message });
    }
  }

  // Listar todos os alunos em disciplinas
  static async listarAlunosDisciplinas(req, res) {
    try {
      const alunosDisciplinas = await BD.query(
        `SELECT ad.*, a.nome_aluno, d.nome_disciplina
         FROM alunos_disciplinas ad
         INNER JOIN alunos a ON ad.id_aluno = a.id_aluno
         INNER JOIN disciplinas d ON ad.id_disciplina = d.id_disciplina`
      );
      res.status(200).json(alunosDisciplinas.rows);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar alunos em disciplinas", error: error.message });
    }
  }

  static async listarAlunoDisciplinaPorId(req, res) {
    const { id } = req.params;
    try {
      const alunoDisciplina = await BD.query(
        `SELECT ad.*, a.nome_aluno, d.nome_disciplina
         FROM alunos_disciplinas ad
         INNER JOIN alunos a ON ad.id_aluno = a.id_aluno
         INNER JOIN disciplinas d ON ad.id_disciplina = d.id_disciplina
         WHERE ad.id_aluno_disciplina = $1`,
        [id]
      );
      if (alunoDisciplina.rows.length === 0) {
        return res.status(404).json({ message: "Registro não encontrado" });
      }
      res.status(200).json(alunoDisciplina.rows[0]);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar registro", error: error.message });
    }
  }

  // Deletar (remover) aluno de disciplina
  static async deletarAlunoDisciplina(req, res) {
    const { id } = req.params;

    try {
      const alunoDisciplina = await BD.query(
        "DELETE FROM alunos_disciplinas WHERE id_aluno_disciplina = $1 RETURNING *",
        [id]
      );
      res.status(200).json({ message: "Aluno removido da disciplina com sucesso", alunoDisciplina: alunoDisciplina.rows[0] });
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover aluno da disciplina", error: error.message });
    }
  }
}

export default rotasAlunosDisciplinas;