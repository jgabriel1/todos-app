# Todo List App - Back-end

Este é o back-end do aplicativo de lista de tarefas (todo list) que utiliza NestJS como framework e MongoDB para persistência dos dados.

## Tecnologias utilizadas

Foram utilizadas as seguintes tecnologias:

- NestJS: pela praticidade de criar um CRUD simples utilizando-o.
- MongoDB: pela baixa complexidade dos dados a serem persistidos (apenas uma collection básica).

## Como executar o servidor individualmente

Certifique-se de que o banco de dados MongoDB já está ativo para que o back-end funcione corretamente. Para executar isoladamente este projeto, recomeda-se utilizar um container simples utilizando a imagem padrão do MongoDB. Para subir um container basta executar o comando:

```
docker run --name todos-mongo -p 27017:27017 -d mongo
```

A URL de conexão com o banco de dados é exposta pela aplicação através da variável de ambiente `MONGODB_CONNECTION_URL`.

1. Execute o seguinte comando para instalar as dependências do projeto:

```
yarn install
```

2. Execute o seguinte comando para iniciar o servidor:

```
yarn start
```

O servidor estará disponível em http://localhost:3000.

## Como executar os testes

Execute o seguinte comando para executar os testes do projeto:

```
yarn test
```
