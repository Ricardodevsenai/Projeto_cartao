import { BD } from "../db.js";

class rotasTurmas {
  static async novaTurma(req, res) {
    const { nome_turma } = req.body;

    try {
      const turma = await BD.query(
        "INSERT INTO turmas (nome_turma) VALUES ($1) RETURNING *",
        [nome_turma]
      );
      res.status(201).json(turma.rows[0]);
    } catch (error) {
      console.error("Erro ao criar turma", error);
      res
        .status(500)
        .json({ message: "Erro ao criar turma", error: error.message });
    }
  }
  static async atualizarTurma(req, res) {
    const { id } = req.params;
    const { nome_turma } = req.body;

    try {
      const turma = await BD.query(
        "UPDATE turmas SET nome_turma = $1 WHERE id_turma = $2 RETURNING *",
        [nome_turma, id]
      );
      res.status(200).json(turma.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao atualizar turma", error: error.message });
    }
  }
  static async atualizar(req, res) {
    const { id } = req.params;
    const { nome_turma, ativo } = req.body;

    try {
      const campos = [];
      const valores = [];

      if (nome_turma !== undefined) {
        campos.push(`nome_turma = $${valores.length + 1}`);
        valores.push(nome_turma);
      }

      if (ativo !== undefined) {
        campos.push(`ativo = $${valores.length + 1}`);
        valores.push(ativo);
      }

      if (campos.length === 0) {
        return res
          .status(400)
          .json({ message: "Nenhum campo fornecido para atualização" });
      }
      const query = `UPDATE turmas
                            SET ${campos.join(",")} 
                            WHERE id_turma = ${id}
                            RETURNING *`;
      const turma = await BD.query(query, valores);
      if (turma.rows.length === 0) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }
      return res.status(200).json(turma.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar turma", error: error.message });
    }
  }
  static async listarTurmas(req, res) {
    try {
      const turmas = await BD.query(
        `SELECT 
        turmas.id_turma, 
        turmas.nome_turma,  
        COALESCE(COUNT(alunos.id_aluno), 0) AS quantidade_alunos 
      FROM turmas 
      LEFT JOIN alunos ON alunos.id_turma = turmas.id_turma AND alunos.ativo = true 
      WHERE turmas.ativo IS NULL OR turmas.ativo = true
      GROUP BY turmas.id_turma, turmas.nome_turma 
      ORDER BY turmas.id_turma;`
      );
      res.status(200).json(turmas.rows);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar turmas", error: error.message });
    }
  }
  static async deletarTurma(req, res) {
    const { id } = req.params;

    try {
      const turma = await BD.query(
        "update turmas set ativo = false where id_turma=$1 ",
        [id]
      );
      return res
        .status(200)
        .json({ message: "Turma deletada com sucesso", turma: turma.rows[0] });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao deletar turma", error: error.message });
    }
  }
  static async listarTurmaPorId(req, res) {
    const { id } = req.params;

    try {
      const turma = await BD.query("SELECT * FROM turmas WHERE id_turma = $1", [
        id,
      ]);
      if (turma.rows.length === 0) {
        return res.status(404).json({ message: "Turma não encontrada" });
      }
      res.status(200).json(turma.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar turma", error: error.message });
    }
  }
  static async quantidadePresentesPorTurma(req, res) {
    try {
      const resultado = await BD.query(`
   SELECT 
    turmas.id_turma,
    turmas.nome_turma,
    COUNT(DISTINCT alunos.id_aluno) AS presentes_hoje
FROM turmas
LEFT JOIN alunos ON alunos.id_turma = turmas.id_turma
LEFT JOIN registros AS r_entrada 
  ON r_entrada.id_aluno = alunos.id_aluno
  AND r_entrada.tipo = 'ENTRADA'
  AND DATE(r_entrada.hora) = CURRENT_DATE
LEFT JOIN registros AS r_saida
  ON r_saida.id_aluno = alunos.id_aluno
  AND r_saida.tipo = 'SAIDA'
  AND DATE(r_saida.hora) = CURRENT_DATE
  AND r_saida.hora > r_entrada.hora
WHERE (turmas.ativo IS NULL OR turmas.ativo = true)
  AND r_entrada.id_registro IS NOT NULL
  AND r_saida.id_registro IS NULL
GROUP BY turmas.id_turma, turmas.nome_turma
ORDER BY turmas.id_turma;
    `);
      res.status(200).json(resultado.rows);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao buscar presentes", error: error.message });
    }
  }
}
export default rotasTurmas;
