const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =========================
// CONEXÃO COM O MYSQL
// =========================

const banco = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodumb"
});

banco.connect((erro) => {

    if (erro) {
        console.error("Erro ao conectar ao banco:", erro);
        return;
    }

    console.log("Banco conectado com sucesso!");

});

// =========================
// ROTA TESTE
// =========================

app.get("/", (req, res) => {

    res.send("API funcionando!");

});

// =========================
// LISTAR TODAS AS TAREFAS
// =========================

app.get("/tarefas", (req, res) => {

    const sql = "SELECT * FROM tarefas ORDER BY id DESC";

    banco.query(sql, (erro, resultado) => {

        if (erro) {
            return res.status(500).json({
                erro: erro.message
            });
        }

        res.json(resultado);

    });

});

// =========================
// CRIAR TAREFA
// =========================

app.post("/tarefas", (req, res) => {

    const {
        titulo,
        descricao,
        prioridade,
        concluida
    } = req.body;

    const sql = `
        INSERT INTO tarefas
        (titulo, descricao, prioridade, concluida)
        VALUES (?, ?, ?, ?)
    `;

    banco.query(
        sql,
        [
            titulo,
            descricao,
            prioridade,
            concluida
        ],
        (erro, resultado) => {

            if (erro) {

                return res.status(500).json({
                    erro: erro.message
                });

            }

            res.status(201).json({
                mensagem: "Tarefa criada com sucesso!",
                id: resultado.insertId
            });

        }
    );

});

// =========================
// ATUALIZAR TAREFA
// =========================

app.put("/tarefas/:id", (req, res) => {

    const { id } = req.params;

    const {
        titulo,
        descricao,
        prioridade,
        concluida
    } = req.body;

    const sql = `
        UPDATE tarefas
        SET
            titulo = ?,
            descricao = ?,
            prioridade = ?,
            concluida = ?
        WHERE id = ?
    `;

    banco.query(
        sql,
        [
            titulo,
            descricao,
            prioridade,
            concluida,
            id
        ],
        (erro, resultado) => {

            if (erro) {
                return res.status(500).json({
                    erro: erro.message
                });
            }

            res.json({
                mensagem: "Tarefa atualizada!"
            });

        }
    );

});

// =========================
// EXCLUIR TAREFA
// =========================

app.delete("/tarefas/:id", (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM tarefas WHERE id = ?";

    banco.query(sql, [id], (erro, resultado) => {

        if (erro) {

            return res.status(500).json({
                erro: erro.message
            });

        }

        res.json({
            mensagem: "Tarefa removida!"
        });

    });

});

// =========================
// SERVIDOR
// =========================

app.listen(3000, () => {

    console.log("Servidor rodando na porta 3000");

});