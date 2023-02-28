# Todo List App - Front-end

Este é o front-end do aplicativo de lista de tarefas (todo list) que utiliza ReactJS como framework e TypeScript. Ele foi inicializado a partir do template do Vite.

## Bibliotecas utilizadas

Esse projeto utiliza a biblioteca React Query para fazer a camada de interface entre o backend e o frontend e gerenciar as buscas e mutações de dados no backend.

Além disso, para a estilização do aplicativo, foi utilizada a biblioteca Chakra UI pela sua simplicidade e estética, e foram utilizados ícones da biblioteca React Icons.

Para testes, foram utilizadas as bibliotecas Jest em combinação com Testing Library.

## Como executar o aplicativo individualmente

Certifique-se de que o back-end já está ativo para que o front-end funcione corretmente.

A URL base do back-end é exposta pela variável de ambiente `VITE_BACKEND_BASE_URL`. Para configurar a URL que a aplicação deve utilizar basta colocá-la num arquivo `.env` semelhante ao arquivo `.env.example`

1. Execute o seguinte comando para instalar as dependências do projeto:

```
yarn install
```

2. Execute o seguinte comando para buildar o projeto:

```
yarn build
```

3. Execute o seguinte comando para iniciar o servidor:

```
yarn serve
```

O aplicativo estará acessível no navegador em http://localhost:8080.

## Como executar os testes

Execute o seguinte comando para executar os testes do projeto:

```
yarn test
```
