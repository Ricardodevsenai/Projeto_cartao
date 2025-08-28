import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.4",
  info: {
    title: "API - Projeto",
    version: "1.0.0",
    description: "API para gerenciar alunos, registros, turmas e usuários.",
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Servidor Local",
    },
    {
      url: "http://192.168.0.129:3000",
      description: "Servidor de Produção",
    },
  ],
  tags: [
    {
      name: "Alunos",
      description: "Rotas para gerenciar alunos",
    },
    {
      name: "Registros",
      description: "Rotas para gerenciar registros",
    },
    {
      name: "Turmas",
      description: "Rotas para gerenciar turmas",
    },
    {
      name: "Usuários",
      description: "Rotas para gerenciar usuários",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  paths: {
    "/alunos": {
      get: {
        tags: ["Alunos"],
        summary: "Listar alunos",
        description: "Método utilizado para listar todos os alunos.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Lista de alunos.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer", example: 1 },
                      nome: { type: "string", example: "João Silva" },
                      idade: { type: "integer", example: 20 },
                      turma: { type: "string", example: "Turma A" },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
      post: {
        tags: ["Alunos"],
        summary: "Adicionar aluno",
        description: "Método utilizado para adicionar um novo aluno.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome", "idade", "turma"],
                properties: {
                  nome: { type: "string", example: "João Silva" },
                  idade: { type: "integer", example: 20 },
                  turma: { type: "string", example: "Turma A" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Aluno adicionado com sucesso.",
          },
          400: {
            description: "Erro ao adicionar aluno.",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/alunos/{id}": {
      get: {
        tags: ["Alunos"],
        summary: "Buscar aluno por ID",
        description: "Retorna um aluno específico pelo ID.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Aluno encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id_aluno: { type: "integer", example: 1 },
                    nome: { type: "string", example: "João Silva" },
                    idade: { type: "integer", example: 20 },
                    turma: { type: "string", example: "Turma A" },
                  },
                },
              },
            },
          },
          404: { description: "Aluno não encontrado." },
          500: { description: "Erro interno do servidor." },
        },
      },
      patch: {
        tags: ["Alunos"],
        summary: "Atualizar parcialmente um aluno",
        description: "Atualiza parcialmente os dados de um aluno.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string", example: "João Silva" },
                  email: { type: "string", example: "joao@senai" },
                  cpf: { type: "string", example: "123.456.789-00" },
                  sexo: { type: "string", example: "Masculino" },
                  cartao: { type: "string", example: "12fd6" },
                  id_turma: { type: "integer", example: 1 },
                  idade: { type: "date", example: "2000-01-01" }
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Aluno atualizado parcialmente com sucesso." },
          404: { description: "Aluno não encontrado." },
          500: { description: "Erro interno do servidor." },
        },
      },
      put: {
        tags: ["Alunos"],
        summary: "Atualizar aluno",
        description: "Atualiza os dados de um aluno existente.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome", "idade", "turma"],
                properties: {
                  nome: { type: "string", example: "João Silva" },
                  email: { type: "string", example: "joao@senai" },
                  cpf: { type: "string", example: "123.456.789-00" },
                  sexo: { type: "string", example: "Masculino" },
                  cartao: { type: "string", example: "12fd6" },
                  id_turma: { type: "integer", example: 1 },
                  idade: { type: "date", example: "2000-01-01" }
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Aluno atualizado com sucesso.",
          },
          404: {
            description: "Aluno não encontrado.",
          },
          500: {
            description: "Erro interno do servidor.",
          },
        },
      },
      delete: {
        tags: ["Alunos"],
        summary: "Excluir aluno",
        description: "Exclui um aluno existente.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
          },
        ],
        responses: {
          200: {
            description: "Aluno excluído com sucesso.",
          },
          404: {
            description: "Aluno não encontrado.",
          },
          500: {
            description: "Erro interno do servidor.",
          },
        },
      },
    },
      "/registros": {
        get: {
          tags: ["Registros"],
          summary: "Listar registros",
          description: "Método utilizado para listar todos os registros.",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Lista de registros.",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id_registro: { type: "integer", example: 1 },
                        id_aluno: { type: "integer", example: 1 },
                        hora: {
                          type: "data",
                          format: "time",
                          example: "20:30",
                        },
                        tipo: { type: "string", example: "--" },
                        cartao: { type: "integer", example: 1243 },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Erro interno do servidor",
            },
          },
        },
        post: {
          tags: ["Registros"],
          summary: "Adicionar registro",
          description: "Método utilizado para adicionar um novo registro.",
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["id_aluno", "tipo", "cartao"],
                  properties: {
                    id_aluno: { type: "integer", example: 1 },
                    tipo: { type: "string", example: "--" },
                    cartao: { type: "integer", example: 1243 },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Registro adicionado com sucesso.",
            },
            400: {
              description: "Erro ao adicionar registro.",
            },
            500: {
              description: "Erro interno do servidor.",
            },
          },
        },
      },
      "/registros/{id}": {
        get: {
          tags: ["Registros"],
          summary: "Buscar registro por ID",
          description: "Retorna um registro específico pelo ID.",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: {
              description: "Registro encontrado.",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      id_registro: { type: "integer", example: 1 },
                      id_aluno: { type: "integer", example: 1 },
                      hora: {
                        type: "string",
                        format: "time",
                        example: "20:30",
                      },
                      tipo: { type: "string", example: "--" },
                      cartao: { type: "integer", example: 1243 },
                    },
                  },
                },
              },
            },
            404: { description: "Registro não encontrado." },
            500: { description: "Erro interno do servidor." },
          },
        },
        // patch: {
        //   tags: ["Registros"],
        //   summary: "Atualizar parcialmente um registro",
        //   description: "Atualiza parcialmente os dados de um registro.",
        //   parameters: [
        //     {
        //       name: "id",
        //       in: "path",
        //       required: true,
        //       schema: { type: "integer" },
        //     },
        //   ],
        //   requestBody: {
        //     required: true,
        //     content: {
        //       "application/json": {
        //         schema: {
        //           type: "object",
        //           properties: {
        //             hora: { type: "string", format: "time", example: "21:00" },
        //             tipo: { type: "string", example: "Entrada" },
        //             cartao: { type: "integer", example: 4321 },
        //           },
        //         },
        //       },
        //     },
        //   },
        //   responses: {
        //     200: {
        //       description: "Registro atualizado parcialmente com sucesso.",
        //     },
        //     404: { description: "Registro não encontrado." },
        //     500: { description: "Erro interno do servidor." },
        //   },
        // },
        patch: {
        tags: ["Registros"],
        summary: "Atualizar parcialmente um registro",
        description: "Atualiza parcialmente os dados de um registro.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  hora: { type: "date", example: "06-GMT" },
                  id_aluno: { type: "integer", example: 1 },
                  tipo: { type: "string", example: "--" },
                  cartao: { type: "integer", example: 123 },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Registro atualizado parcialmente com sucesso." },
          404: { description: "Registro não encontrado." },
          500: { description: "Erro interno do servidor." },
        },
        },
        put: {
          tags: ["Registros"],
          summary: "Atualizar registro",
          description: "Atualiza os dados de um registro existente.",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    hora: { type: "date", example: "2025-06-12" },
                    id_aluno: { type: "integer", example: 1 },
                    tipo: { type: "string", example: "--" },
                    cartao: { type: "integer", example: 123 },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Registro atualizado com sucesso." },
            404: { description: "Registro não encontrado." },
            500: { description: "Erro interno do servidor." },
          },
        },
        delete: {
          tags: ["Registros"],
          summary: "Excluir registro",
          description: "Exclui um registro existente.",
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "integer" },
            },
          ],
          responses: {
            200: { description: "Registro excluído com sucesso." },
            404: { description: "Registro não encontrado." },
            500: { description: "Erro interno do servidor." },
          },
        },
      },
    "/turmas": {
      get: {
        tags: ["Turmas"],
        summary: "Listar turmas",
        description: "Método utilizado para listar todas as turmas.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Lista de turmas.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id_turma: { type: "integer", example: 1 },
                      nome_turma: { type: "string", example: "Turma A" },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
      post: {
        tags: ["Turmas"],
        summary: "Adicionar turma",
        description: "Método utilizado para adicionar uma nova turma.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome_turma"],
                properties: {
                  nome_turma: { type: "string", example: "Turma B" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Turma adicionada com sucesso.",
          },
          400: {
            description: "Erro ao adicionar turma.",
          },
          500: {
            description: "Erro interno do servidor.",
          },
        },
      },
    },
    "/turmas/{id}": {
      get: {
        tags: ["Turmas"],
        summary: "Buscar turma por ID",
        description: "Retorna uma turma específica pelo ID.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Turma encontrada.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                    properties: {
                    id_turma: { type: "integer", example: 1 },
                    nome_turma: { type: "string", example: "Turma A" },
                  },
                },
              },
            },
          },
          404: { description: "Turma não encontrada." },
          500: { description: "Erro interno do servidor." },
        },
      },
      patch: {
        tags: ["Turmas"],
        summary: "Atualizar parcialmente uma turma",
        description: "Atualiza parcialmente os dados de uma turma.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome_turma: { type: "string", example: "Turma Atualizada" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Turma atualizada parcialmente com sucesso." },
          404: { description: "Turma não encontrada." },
          500: { description: "Erro interno do servidor." },
        },
      },
      put: {
        tags: ["Turmas"],
        summary: "Atualizar turma",
        description: "Atualiza os dados de uma turma existente.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome_turma"],
                properties: {
                  nome_turma: { type: "string", example: "Turma B" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Turma atualizada com sucesso." },
          404: { description: "Turma não encontrada." },
          500: { description: "Erro interno do servidor." },
        },
      },
      delete: {
        tags: ["Turmas"],
        summary: "Excluir turma",
        description: "Exclui uma turma existente.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Turma excluída com sucesso." },
          404: { description: "Turma não encontrada." },
          500: { description: "Erro interno do servidor." },
        },
      },
    },
    "/usuarios": {
      get: {
        tags: ["Usuários"],
        summary: "Listar usuários",
        description: "Método utilizado para listar todos os usuários.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Lista de usuários.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id_usuario: { type: "integer", example: 1 },
                      nome: { type: "string", example: "Maria Oliveira" },
                      email: { type: "string", example: "maria@example.com" },
                      senha: { type: "string", example: "admin" },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
      post: {
        tags: ["Usuários"],
        summary: "Adicionar usuário",
        description: "Método utilizado para adicionar um novo usuário.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome", "email", "tipo"],
                properties: {
                  nome: { type: "string", example: "Maria Oliveira" },
                  email: { type: "string", example: "maria@example.com" },
                  senha: { type: "string", example: "admin" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuário adicionado com sucesso.",
          },
          400: {
            description: "Erro ao adicionar usuário.",
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
    },
    "/usuarios/login": {
      post: {
        tags: ["Usuarios"],
        summary: "Login do usuário",
        description:
          "Método utilizado para efetuar o login do usuário e gerar o token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "senha"],
                properties: {
                  // nome: { type: "string", example: "Ricardo" },
                  email: { type: "string", example: "teste@teste" },
                  senha: { type: "string", example: "123" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário autenticado com sucesso",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string", example: "token_exemplo" },
                    id_usuario: { type: "integer", example: 1 },
                    nome: { type: "string", example: "João Silva" },
                    email: { type: "string", example: "joao@example.com" },
                  },
                },
              },
            },
          },
          400: { description: "Erro ao encontrar usuário" },
          500: { description: "Erro interno do servidor" },
        },
      },
    },
    "/usuarios/{id}": {
      get: {
        tags: ["Usuários"],
        summary: "Buscar usuário por ID",
        description: "Retorna um usuário específico pelo ID.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: {
            description: "Usuário encontrado.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    id_usuario: { type: "integer", example: 1 },
                    nome: { type: "string", example: "Maria Oliveira" },
                    email: { type: "string", example: "maria@example.com" },
                    senha: { type: "string", example: "admin" },
                  },
                },
              },
            },
          },
          404: { description: "Usuário não encontrado." },
          500: { description: "Erro interno do servidor." },
        },
      },
      patch: {
        tags: ["Usuários"],
        summary: "Atualizar parcialmente um usuário",
        description: "Atualiza parcialmente os dados de um usuário.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string", example: "Maria Atualizada" },
                  email: { type: "string", example: "maria@atualizado.com" },
                  senha: { type: "string", example: "novaSenha123" },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário atualizado parcialmente com sucesso.",
          },
          404: { description: "Usuário não encontrado." },
          500: { description: "Erro interno do servidor." },
        },
      },
      put: {
        tags: ["Usuários"],
        summary: "Atualizar usuário",
        description: "Atualiza os dados de um usuário existente.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome", "email", "tipo"],
                properties: {
                  nome: { type: "string", example: "Joana Pereira" },
                  email: { type: "string", example: "joana@example.com" },
                  senha: { type: "string", example: "user" },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Usuário atualizado com sucesso." },
          404: { description: "Usuário não encontrado." },
          500: { description: "Erro interno do servidor." },
        },
      },
      delete: {
        tags: ["Usuários"],
        summary: "Excluir usuário",
        description: "Exclui um usuário existente.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          200: { description: "Usuário excluído com sucesso." },
          404: { description: "Usuário não encontrado." },
          500: { description: "Erro interno do servidor." },
        },
      },
    },
    }
};

const options = {
  swaggerDefinition,
  apis: [], //
};


const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;