# Projeto de CRUD de Salas de Aula com Node.js, Express e SQLite

Este repositório contém a implementação de um conjunto de APIs para realizar o CRUD em um módulo de sistema acadêmico referente à **manutenção de salas de aula**.

## Descrição

O projeto foi desenvolvido em Node.js usando **Express** para a criação de rotas e **SQLite** como banco de dados. A tabela `salasdeaula` é utilizada para armazenar informações sobre as salas, e as APIs permitem criar, visualizar, atualizar e deletar (soft delete) esses registros.

### Funcionalidades:

1. **GetAllSalasDeAula**: Retorna todas as salas de aula que **não foram removidas**.
2. **GetSalasDeAulaByID**: Retorna uma sala específica com base no seu ID, se **não foi removida**.
3. **InsertSalasDeAula**: Insere uma nova sala de aula.
4. **UpdateSalasDeAula**: Atualiza os detalhes de uma sala com base no seu ID.
5. **DeleteSalasDeAula** (Soft Delete): Marca uma sala como removida, sem apagá-la fisicamente.

## Regras de Negócio

As operações seguem as seguintes regras:
- Somente salas de aula com `removido = false` são retornadas nas consultas.
- O soft delete altera o campo `removido` para `true` em vez de excluir permanentemente o registro.
  
Modelo relacional da tabela `salasdeaula`:
```
salasdeaula = {salasdeaulaid(pk), descricao (TEXT), localizacao (TEXT), capacidade (INTEGER), removido (BOOLEAN)}
```

## Tecnologias Utilizadas
- Node.js
- Express
- SQLite
- Body-parser

## Instalação e Execução

### 1. Inicialize um novo projeto Node.js:
```bash
npm init -y
```

### 2. Instale as dependências necessárias:
```bash
npm install express body-parser sqlite3
```

### 3. Salve o código em um arquivo chamado `app.js`.

### 4. Execute o servidor:
```bash
node app.js
```

O servidor será iniciado na porta **3000**.

## Endpoints

### 1. Listar todas as salas de aula (GET)
```
GET /salasdeaula
```
Retorna todas as salas de aula com `removido = false`.

### 2. Listar uma sala específica por ID (GET)
```
GET /salasdeaula/:id
```
Retorna os detalhes de uma sala de aula com base no ID fornecido.

### 3. Inserir uma nova sala de aula (POST)
```
POST /salasdeaula
```
Corpo da requisição (JSON):
```json
{
  "descricao": "Descrição da sala",
  "localizacao": "Localização",
  "capacidade": 30
}
```

### 4. Atualizar uma sala de aula (PUT)
```
PUT /salasdeaula/:id
```
Atualiza as informações de uma sala de aula pelo ID.

### 5. Deletar uma sala de aula (Soft Delete) (DELETE)
```
DELETE /salasdeaula/:id
```
Realiza o soft delete da sala de aula, alterando o campo `removido` para `true`.

## Considerações Finais

Este projeto foi desenvolvido como parte da disciplina **Desenvolvimento Web III** no curso de **Bacharelado em Sistemas de Informação** no **Instituto Federal de São Paulo (IFSP)**, Campus Votuporanga.
