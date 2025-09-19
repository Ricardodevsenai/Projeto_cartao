import { BD } from "../db.js";

class rotasRegistros {
  static async novoRegistro(req, res) {
    const { id_aluno, tipo, cartao } = req.body;

    try {
      const registro = await BD.query(
        `
                INSERT INTO registros(id_aluno, tipo,cartao)
                VALUES( $1, $2,$3)
                `,
        [id_aluno, tipo, cartao]
      );
      res.status(201).json({ message: "Registrado" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao criar registro" });
    }
  }

  static async listarRegistros(req, res) {
    try {
      const registros = await BD.query(
        `SELECT r.*, a.nome AS nome 
       FROM registros AS r 
       LEFT JOIN alunos a ON r.id_aluno = a.id_aluno
       ORDER BY a.nome`
      );

      const totalEntradas = await BD.query(
        `SELECT COUNT(*) AS total_entradas 
       FROM registros 
       WHERE tipo = 'ENTRADA'`
      );

      const totalSaidas = await BD.query(
        `SELECT COUNT(*) AS total_entradas 
       FROM registros 
       WHERE tipo = 'SAIDA'`
      );

      return res.status(200).json({
        registros: registros.rows,
        total_entradas: totalEntradas.rows[0].total_entradas,
        total_saidas: totalSaidas.rows[0].total_entradas,
      });
    } catch (error) {
      console.log("erro ao listar registros ", error);
      res
        .status(500)
        .json({ message: "Erro ao listar registros", error: error.message });
    }
  }

  static async consultaPorId(req, res) {
    const { id } = req.params;
    try {
      const aluno = await BD.query(
        `
              SELECT r. *, a.nome AS nome_aluno FROM registros AS r 
                    LEFT JOIN alunos a ON r.id_aluno = a.id_aluno WHERE r.id_registro = $1
              ORDER BY r.id_registro`,
        [id]
      );
      res.status(200).json(aluno.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao consultar o aluno", error: error });
    }
  }

  static async deletarRegistro(req, res) {
    const { id } = req.params;
    try {
      const resposta = await BD.query(
        "DELETE FROM registros WHERE id_registro = $1",
        [id]
      );
      res.status(200).json("Registro deletado com sucesso");
    } catch (error) {
      console.log("erro ao deletar registro ", error);
      res
        .status(500)
        .json({ message: "Erro ao deletar registro", error: error.message });
    }
  }

  static async editarRegistros(req, res) {
    const { id } = req.params;
    const { hora, id_aluno, tipo, cartao } = req.body;

    try {
      const resposta = await BD.query(
        "update registros set hora = $1, id_aluno = $2, tipo = $3,cartao = $4 where id_registro = $5",
        [hora, id_aluno, tipo, cartao, id]
      );
      res.status(200).json("registro editado com sucesso");
    } catch (error) {
      console.log("erro ao editar registro ", error);
      res
        .status(500)
        .json({ message: "Erro ao editar registro", error: error.message });
    }
  }

  static async editar(req, res) {
    const { id } = req.params;

    const { hora, id_aluno, tipo, cartao } = req.body;

    try {
      //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
      const campos = [];
      const valores = [];

      if (hora !== undefined) {
        campos.push(`hora = $${valores.length + 1}`);
        valores.push(hora);
      }
      if (id_aluno !== undefined) {
        campos.push(`id_aluno = $${valores.length + 1}`);
        valores.push(id_aluno);
      }
      if (tipo !== undefined) {
        campos.push(`tipo = $${valores.length + 1}`);
        valores.push(tipo);
      }
      if (cartao !== undefined) {
        campos.push(`cartao = $${valores.length + 1}`);
        valores.push(cartao);
      }
      if (campos.length === 0) {
        return res
          .status(400)
          .json({ message: "nenhum campo fornecido para atualização" });
      }

      const query = `update registros set  ${campos.join(", ")} 
          where id_registro = ${id} RETURNING *`;

      const usuarios = await BD.query(query, valores);
      //verifica se o usuario foi atualizado

      if (usuarios.rows.length === 0) {
        return res.status(404).json({ message: `registro não encontrado` });
      }

      return res.status(200).json(usuarios.rows[0]);
    } catch (error) {
      res
        .status(500)
        .json({ message: "erro ao atualizar registro", error: error.message });
    }
  }
}

export default rotasRegistros;
