import pkg from "pg";
import dotenv from "dotenv";

const {Pool} = pkg
dotenv.config()

// const BD = new Pool({
//     connectionString:"postgres://postgres.xshkofyrngjsltztgpax:wrpdEQd6jMzzQxF0@aws-0-us-east-1.pooler.supabase.com:5432/postgres",
//     ssl: {
//         rejectUnauthorized:false
//     }
// })

const BD = new Pool({
user:'postgres',
host:'localhost',
database:'cartao',
password:'admin',
port:5432,
})





const testarConexao = async () => {
    try {
        const cliente = await BD.connect();//tenta estabelece a conexão com o banco de dados
        cliente.release();//libera o cliente
    } catch (error) {
        console.error("erro ao conectar ao banco de dados",error.message)
    }
}

export { BD, testarConexao};