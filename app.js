// Dependências necessárias
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./salasdeaula.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS salasdeaula (
      salasdeaulaid INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT,
      localizacao TEXT,
      capacidade INTEGER,
      removido BOOLEAN DEFAULT 0
    )`);
  }
});

// 1. GetAllSalasDeAula
app.get('/salasdeaula', (req, res) => {
  db.all("SELECT * FROM salasdeaula WHERE removido = 0", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 2. GetSalasDeAulaByID
app.get('/salasdeaula/:id', (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM salasdeaula WHERE salasdeaulaid = ? AND removido = 0", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ message: "Sala de aula não encontrada" });
      return;
    }
    res.json(row);
  });
});

// 3. InsertSalasDeAula
app.post('/salasdeaula', (req, res) => {
  const { descricao, localizacao, capacidade } = req.body;
  db.run("INSERT INTO salasdeaula (descricao, localizacao, capacidade) VALUES (?, ?, ?)",
    [descricao, localizacao, capacidade],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "Sala de aula inserida com sucesso",
        id: this.lastID
      });
    }
  );
});

// 4. UpdateSalasDeAula
app.put('/salasdeaula/:id', (req, res) => {
  const id = req.params.id;
  const { descricao, localizacao, capacidade } = req.body;
  db.run("UPDATE salasdeaula SET descricao = ?, localizacao = ?, capacidade = ? WHERE salasdeaulaid = ?",
    [descricao, localizacao, capacidade, id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      if (this.changes === 0) {
        res.status(404).json({ message: "Sala de aula não encontrada" });
        return;
      }
      res.json({ message: "Sala de aula atualizada com sucesso" });
    }
  );
});

// 5. DeleteSalasDeAula (Soft Delete)
app.delete('/salasdeaula/:id', (req, res) => {
  const id = req.params.id;
  db.run("UPDATE salasdeaula SET removido = 1 WHERE salasdeaulaid = ?", [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (this.changes === 0) {
      res.status(404).json({ message: "Sala de aula não encontrada" });
      return;
    }
    res.json({ message: "Sala de aula removida com sucesso (soft delete)" });
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});