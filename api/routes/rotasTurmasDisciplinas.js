import { BD } from "../db.js";

class rotasTurmasDisciplinas {
    //Adicionar disciplina numa turma num dia da semana e hora
    static async novaTurmaDisciplina(req, res) {
    const { id_turma, id_disciplina, dia_semana, hora } = req.body;

    try {
      const turmaDisciplina = await BD.query(
        "INSERT INTO turmas_disciplinas (id_turma, id_disciplina, dia_semana, hora) VALUES ($1, $2, $3, $4) RETURNING *",
        [id_turma, id_disciplina, dia_semana, hora]
      );
      res.status(201).json(turmaDisciplina.rows[0]);
    } catch (error) {
      console.error("Erro ao criar disciplina dentro da turma", error);
      res
        .status(500)
        .json({ message: "Erro ao criar disciplina dentro da turma", error: error.message });
    }
  }

  //Atualizar o dia da semana e hora da disciplina
  static async atualizarTurmaDisciplina(req, res) {
    const { id } = req.params;
    const { dia_semana, hora } = req.body;

    try {
      const turmaDisciplina = await BD.query(
        "UPDATE turmas_disciplinas SET dia_semana = $1, hora = $2 WHERE id_turma_disciplina = $3 RETURNING *",
        [dia_semana, hora, id]
      );
      res.status(200).json(turmaDisciplina.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao atualizar turma", error: error.message });
    }
  }
//   static async atualizar(req, res) {
//     const { id } = req.params;
//     const { nome_turma, ativo } = req.body;

//     try {
//       const campos = [];
//       const valores = [];

//       if (nome_turma !== undefined) {
//         campos.push(`nome_turma = $${valores.length + 1}`);
//         valores.push(nome_turma);
//       }

//       if (ativo !== undefined) {
//         campos.push(`ativo = $${valores.length + 1}`);
//         valores.push(ativo);
//       }

//       if (campos.length === 0) {
//         return res
//           .status(400)
//           .json({ message: "Nenhum campo fornecido para atualização" });
//       }
//       const query = `UPDATE turmas
//                             SET ${campos.join(",")} 
//                             WHERE id_turma = ${id}
//                             RETURNING *`;
//       const turma = await BD.query(query, valores);
//       if (turma.rows.length === 0) {
//         return res.status(404).json({ message: "Turma não encontrada" });
//       }
//       return res.status(200).json(turma.rows[0]);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ message: "Erro ao atualizar turma", error: error.message });
//     }
//   }

  //Listar todas as disciplinas de uma turma
  static async listarTurmasDisciplinas(req, res) {
    try {
      const turmaDisciplina = await BD.query(
        `SELECT td.*, t.nome_turma, d.nome_disciplina
       FROM turmas_disciplinas td
       INNER JOIN turmas t ON td.id_turma = t.id_turma
       INNER JOIN disciplinas d ON td.id_disciplina = d.id_disciplina
       WHERE td.ativo IS NULL OR td.ativo = true`
      );
      res.status(200).json(turmaDisciplina.rows);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar turmas", error: error.message });
    }
  }

  //Deletar a disciplina de uma turma
  static async deletarTurmaDisciplina(req, res) {
    const { id } = req.params;

    try {
      const turmaDisciplina = await BD.query(
        "UPDATE turmas_disciplinas SET ativo = false WHERE id_turma_disciplina = $1 RETURNING *",
        [id]
      );
      return res
        .status(200)
        .json({ message: "Turma deletada com sucesso", turmaDisciplina: turmaDisciplina.rows[0] });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao deletar turma", error: error.message });
    }
  }
//   static async listarTurmaPorId(req, res) {
//     const { id } = req.params;

//     try {
//       const turma = await BD.query("SELECT * FROM turmas WHERE id_turma = $1", [
//         id,
//       ]);
//       if (turma.rows.length === 0) {
//         return res.status(404).json({ message: "Turma não encontrada" });
//       }
//       res.status(200).json(turma.rows[0]);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ error: "Erro ao listar turma", error: error.message });
//     }
//   }
//   static async quantidadePresentesPorTurma(req, res) {
//     try {
//       const resultado = await BD.query(`
//    SELECT 
//     turmas.id_turma,
//     turmas.nome_turma,
//     COUNT(DISTINCT alunos.id_aluno) AS presentes_hoje
// FROM turmas
// LEFT JOIN alunos ON alunos.id_turma = turmas.id_turma
// LEFT JOIN registros AS r_entrada 
//   ON r_entrada.id_aluno = alunos.id_aluno
//   AND r_entrada.tipo = 'ENTRADA'
//   AND DATE(r_entrada.hora) = CURRENT_DATE
// LEFT JOIN registros AS r_saida
//   ON r_saida.id_aluno = alunos.id_aluno
//   AND r_saida.tipo = 'SAIDA'
//   AND DATE(r_saida.hora) = CURRENT_DATE
//   AND r_saida.hora > r_entrada.hora
// WHERE (turmas.ativo IS NULL OR turmas.ativo = true)
//   AND r_entrada.id_registro IS NOT NULL
//   AND r_saida.id_registro IS NULL
// GROUP BY turmas.id_turma, turmas.nome_turma
// ORDER BY turmas.id_turma;
//     `);
//       res.status(200).json(resultado.rows);
//     } catch (error) {
//       res
//         .status(500)
//         .json({ error: "Erro ao buscar presentes", error: error.message });
//     }
//   }
}
export default rotasTurmasDisciplinas;
