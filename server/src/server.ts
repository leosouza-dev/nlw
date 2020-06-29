import express, { json, request } from 'express';

const app = express();

const users = [
    'Leonardo',
    'Lari',
    'Chicó',
    'Loki',
    'teste 1'
];

// retorna todos users
// app.get('/users', (request, response) => {
//     console.log('listagem de usuários');
//     return response.json(users);
// });

// retorna um user (request param - id)
app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    const user = users[id];

    return response.json(user);
});

// http://localhost:3333/users?search=ardo
// query param - fazendo filtro
app.get('/users', (request, response) => {
    const search = String(request.query.search); // recupera o 'ardo'

    // encontra os users que contenham o 'ardo'
    // usamos o=um ternario - se tiver algo filta, se nao devolve tudo
    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
    return response.json(filteredUsers);
});

app.post('/users', (request, response) => {
    const user = {
        name: 'Leonardo',
        email: `leonardo.rodrigues@caelum.com.br`
    };

    return response.json(user);
});

app.listen(3333);

// npx ts-node src/server.ts   
// npm run dev